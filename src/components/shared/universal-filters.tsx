"use client";
import { useForm } from "react-hook-form";
import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import { cn } from "@/lib/utils";
import { Form, Field } from "@/components/form";
import {
  FilterConfig,
  FiltersConfig,
} from "@/types/shared/interface/filter-config.interface";
import {
  useAllSearchParams,
  useSetQueryParams,
} from "@/hooks/shared/use-query-params";
import { RotateCcw, Filter, ChevronDown, ChevronUp } from "lucide-react";
import { useClickOutside } from "@/hooks/shared/useClickOutside";

export type FilterMode = "tabs" | "dropdown";

type ButtonSize = "sm" | "md" | "lg";

export interface UniversalFiltersProps {
  /** Filter configuration */
  config: FiltersConfig;

  /** Display mode: tabs (horizontal) or dropdown */
  mode?: FilterMode;

  /** Custom className for the container */
  className?: string;

  /** Button text for dropdown mode */
  dropdownButtonText?: string;

  /** Custom icon for dropdown button */
  dropdownIcon?: React.ReactNode;

  /** Button size for dropdown mode */
  dropdownButtonSize?: ButtonSize;
}

/**
 * UniversalFilters Component
 *
 * A centralized filter component that can render in two modes:
 * 1. Tabs mode - filters displayed horizontally as tabs
 * 2. Dropdown mode - filters in a dropdown menu
 *
 * All filter values are stored in URL params for easy sharing and navigation
 */
export default function UniversalFilters({
  config,
  mode = "tabs",
  className,
  dropdownButtonText = "Filters",
  dropdownIcon = <Filter />,
  dropdownButtonSize = "md",
}: UniversalFiltersProps) {
  const allParams = useAllSearchParams();
  const { setMultipleParams } = useSetQueryParams();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Debounce timers for input fields
  const debounceTimers = useRef<Record<string, NodeJS.Timeout>>({});

  // Memoize params to prevent infinite loops
  const memoizedParams = useMemo(() => allParams, [JSON.stringify(allParams)]);

  // Close dropdown when clicking outside
  const dropdownRef = useClickOutside(() => {
    if (mode === "dropdown") {
      setIsDropdownOpen(false);
    }
  });

  // Build default values from URL params
  const getDefaultValues = () => {
    const defaults: Record<string, any> = {};

    config.filters.forEach((filter) => {
      const paramValue = allParams[filter.param];

      if (
        paramValue !== undefined &&
        paramValue !== null &&
        paramValue !== ""
      ) {
        // Handle different types
        if (filter.type === "number") {
          defaults[filter.param] = Number(paramValue);
        } else if (filter.type === "checkbox") {
          defaults[filter.param] = paramValue === "true";
        } else if (
          filter.type === "multiselect" ||
          filter.type === "checkbox-group"
        ) {
          // Handle array values (comma-separated in URL)
          defaults[filter.param] = paramValue.split(",");
        } else {
          defaults[filter.param] = paramValue;
        }
      } else {
        // Explicitly set empty values for cleared params
        if (filter.type === "checkbox") {
          defaults[filter.param] = filter.defaultValue ?? false;
        } else if (
          filter.type === "multiselect" ||
          filter.type === "checkbox-group"
        ) {
          defaults[filter.param] = filter.defaultValue ?? [];
        } else if (filter.type === "number") {
          defaults[filter.param] = filter.defaultValue ?? "";
        } else {
          defaults[filter.param] = filter.defaultValue ?? "";
        }
      }
    });

    return defaults;
  };

  const form = useForm({
    defaultValues: getDefaultValues(),
  });

  // Update form when URL params change
  useEffect(() => {
    const newDefaults = getDefaultValues();
    form.reset(newDefaults);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memoizedParams]);

  // Cleanup debounce timers on unmount
  useEffect(() => {
    return () => {
      Object.values(debounceTimers.current).forEach(clearTimeout);
    };
  }, []);

  // Handle filter changes - update URL params with debounce for text inputs
  const handleFilterChange = useCallback(
    (param: string, value: any, filterType?: string) => {
      // Clear existing timer for this param
      if (debounceTimers.current[param]) {
        clearTimeout(debounceTimers.current[param]);
      }

      const applyFilter = () => {
        const params: Record<string, string | null> = {};

        // Handle array values
        if (Array.isArray(value)) {
          params[param] = value.length > 0 ? value.join(",") : null;
        }
        // Handle empty/null values - DON'T set to "all"
        else if (value === "" || value === null || value === undefined) {
          params[param] = null;
        }
        // Handle "all" explicitly - clear the filter
        else if (value === "all") {
          params[param] = null;
        }
        // Handle boolean values
        else if (typeof value === "boolean") {
          params[param] = String(value);
        }
        // Handle other values
        else {
          params[param] = String(value);
        }

        setMultipleParams({ params, replace: true });
      };

      // Debounce text inputs (text, email, phone, number, search, etc.)
      const isTextInput =
        filterType === "text" ||
        filterType === "email" ||
        filterType === "phone" ||
        filterType === "number" ||
        filterType === "search" ||
        filterType === "url";

      if (isTextInput) {
        // Debounce for 500ms
        debounceTimers.current[param] = setTimeout(applyFilter, 500);
      } else {
        // Apply immediately for selects, checkboxes, etc.
        applyFilter();
      }
    },
    [setMultipleParams],
  );

  // Reset all filters
  const handleReset = () => {
    const resetParams: Record<string, null> = {};

    config.filters.forEach((filter) => {
      resetParams[filter.param] = null;
    });

    setMultipleParams({ params: resetParams, replace: true });
    form.reset({});

    if (config.onReset) {
      config.onReset();
    }

    // Close dropdown after reset
    if (mode === "dropdown") {
      setIsDropdownOpen(false);
    }
  };

  // Apply filters (mainly for dropdown mode)
  const handleApply = () => {
    if (config.onApply) {
      config.onApply(form.getValues());
    }

    if (mode === "dropdown") {
      setIsDropdownOpen(false);
    }
  };

  // Render a single filter field
  const renderFilterField = (filter: FilterConfig) => {
    const commonProps = {
      name: filter.param,
      label: filter.name,
      placeholder: filter.placeholder,
      helperText: filter.helperText,
      required: filter.required,
      disabled: filter.disabled,
      className: "w-full",
    };

    // Props specifically for input fields (with static label)
    const inputProps = {
      ...commonProps,
      labelMode: "static" as const,
    };

    switch (filter.type) {
      case "select":
        return (
          <Field.Select
            {...commonProps}
            options={filter.options || []}
            onChangeSideEffect={(value: any) =>
              handleFilterChange(filter.param, value)
            }
          />
        );

      case "multiselect":
        return (
          <Field.Select
            {...commonProps}
            options={filter.options || []}
            isMulti
            onChangeSideEffect={(value: any) =>
              handleFilterChange(filter.param, value)
            }
          />
        );

      case "checkbox":
        return (
          <Field.Checkbox
            {...commonProps}
            onChangeSideEffect={(value: any) =>
              handleFilterChange(filter.param, value)
            }
          />
        );

      case "checkbox-group":
        return (
          <Field.CheckboxGroup
            {...commonProps}
            options={filter.options || []}
            onChangeSideEffect={(value: any) =>
              handleFilterChange(filter.param, value)
            }
          />
        );

      case "radio":
      case "radio-group":
        return (
          <Field.RadioGroup
            {...commonProps}
            options={filter.options || []}
            onChangeSideEffect={(value: any) =>
              handleFilterChange(filter.param, value)
            }
          />
        );

      case "number":
        return (
          <Field.Input
            {...inputProps}
            labelMode="static"
            type="number"
            min={filter.min as number}
            max={filter.max as number}
            step={filter.step}
            onChangeSideEffect={(value: any) =>
              handleFilterChange(filter.param, value, "number")
            }
          />
        );

      case "date":
      case "datetime-local":
        return (
          <Field.Input
            {...inputProps}
            labelMode="static"
            type={filter.type}
            onChangeSideEffect={(value: any) =>
              handleFilterChange(filter.param, value, filter.type)
            }
          />
        );

      case "textarea":
        return (
          <Field.Input
            {...inputProps}
            type="textarea"
            labelMode="static"
            rows={3}
            onChangeSideEffect={(value: any) =>
              handleFilterChange(filter.param, value, "textarea")
            }
          />
        );

      default:
        // text, email, phone, etc.
        return (
          <Field.Input
            {...inputProps}
            type={filter.type}
            labelMode="static"
            onChangeSideEffect={(value: any) =>
              handleFilterChange(filter.param, value, filter.type)
            }
          />
        );
    }
  };

  // Check if any filters are active
  const hasActiveFilters = Object.values(allParams).some(
    (value) => value !== undefined && value !== null && value !== "",
  );

  // Count active filters
  const activeFiltersCount = config.filters.filter((filter) => {
    const value = allParams[filter.param];
    return value !== undefined && value !== null && value !== "";
  }).length;

  // Button size classes for dropdown mode
  const buttonSizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2.5 text-base",
    lg: "px-5 py-3 text-lg",
  };

  const iconSizeClasses = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  // Tabs mode rendering
  if (mode === "tabs") {
    return (
      <div className={cn("w-full space-y-4", className)}>
        <div className="bg-card rounded-lg border border-border shadow-sm p-4">
          {/* Header */}
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-main-orange" />
            <h2 className="text-sm font-semibold text-card-foreground">
              Filters
            </h2>
            {hasActiveFilters && (
              <span className="text-xs text-muted-foreground">
                ({activeFiltersCount} active)
              </span>
            )}
          </div>

          {/* Filter Fields */}
          <Form form={form} onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {config.filters.map((filter) => (
                <div key={filter.param}>{renderFilterField(filter)}</div>
              ))}
            </div>

            {/* Reset Button */}
            {config.showReset && (
              <div className="mt-4 pt-4 border-t border-border flex justify-end">
                <button
                  type="button"
                  onClick={handleReset}
                  disabled={!hasActiveFilters}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                    hasActiveFilters
                      ? "text-destructive hover:bg-destructive/10"
                      : "text-muted-foreground cursor-not-allowed",
                  )}
                >
                  <RotateCcw className="w-4 h-4" />
                  {config.resetButtonText || "Reset"}
                </button>
              </div>
            )}
          </Form>
        </div>
      </div>
    );
  }

  // Dropdown mode rendering
  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      {/* Dropdown Button */}
      <button
        type="button"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className={cn(
          "flex items-center justify-center gap-2 rounded-lg border transition-colors",
          "bg-card border-border",
          "hover:bg-accent hover:text-accent-foreground",
          "text-card-foreground font-medium",
          buttonSizeClasses[dropdownButtonSize],
          isDropdownOpen && "ring-2 ring-ring/20",
        )}
      >
        {React.isValidElement(dropdownIcon)
          ? React.cloneElement(dropdownIcon, {
              className: cn(
                iconSizeClasses[dropdownButtonSize],
                (dropdownIcon.props as any)?.className,
              ),
            } as any)
          : dropdownIcon}
        <span>{dropdownButtonText}</span>
        {activeFiltersCount > 0 && (
          <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-main-orange text-white">
            {activeFiltersCount}
          </span>
        )}
        {isDropdownOpen ? (
          <ChevronUp className={iconSizeClasses[dropdownButtonSize]} />
        ) : (
          <ChevronDown className={iconSizeClasses[dropdownButtonSize]} />
        )}
      </button>

      {/* Dropdown Panel */}
      {isDropdownOpen && (
        <div
          className={cn(
            "absolute top-full left-0 mt-2 w-96 max-w-[calc(100vw-2rem)]",
            "bg-popover rounded-lg shadow-lg border border-border",
            "z-[100]",
          )}
          style={{
            maxHeight: "80vh",
            display: "flex",
            flexDirection: "column",
          }}
          onClick={(e) => {
            // Stop propagation to prevent closing when clicking inside
            e.stopPropagation();
          }}
          onMouseDown={(e) => {
            // Also stop mousedown events
            e.stopPropagation();
          }}
        >
          <Form
            form={form}
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col min-h-0"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 pb-3 border-b border-border flex-shrink-0">
              <h3 className="text-sm font-semibold text-popover-foreground">
                Filters
                {activeFiltersCount > 0 && (
                  <span className="ml-2 text-xs text-muted-foreground">
                    ({activeFiltersCount} active)
                  </span>
                )}
              </h3>
              {config.showReset && hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs text-destructive hover:text-destructive/80 font-medium"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Filter Fields - Scrollable */}
            <div className="overflow-y-auto overflow-x-visible p-4 space-y-4 flex-1">
              {config.filters.map((filter) => (
                <div key={filter.param}>{renderFilterField(filter)}</div>
              ))}
            </div>

            {/* Footer Actions */}
            {config.showApplyButton && (
              <div className="p-4 pt-3 border-t border-border flex-shrink-0">
                <button
                  type="button"
                  onClick={handleApply}
                  className="w-full px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 font-medium rounded-lg transition-colors"
                >
                  {config.applyButtonText || "Apply Filters"}
                </button>
              </div>
            )}
          </Form>
        </div>
      )}
    </div>
  );
}
