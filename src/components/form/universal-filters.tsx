"use client";
import { useForm } from "react-hook-form";
import { useState, useEffect, useMemo } from "react";
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
}: UniversalFiltersProps) {
  const allParams = useAllSearchParams();
  const { setMultipleParams } = useSetQueryParams();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
      } else if (filter.defaultValue !== undefined) {
        defaults[filter.param] = filter.defaultValue;
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

  // Handle filter changes - update URL params
  const handleFilterChange = (param: string, value: any) => {
    const params: Record<string, string | null> = {};

    // Handle array values
    if (Array.isArray(value)) {
      params[param] = value.length > 0 ? value.join(",") : null;
    }
    // Handle empty/null values
    else if (
      value === "" ||
      value === null ||
      value === undefined ||
      value === "all"
    ) {
      params[param] = null;
      // Immediately update the form field to "all" to show the "All" option
      form.setValue(param, "all", { shouldValidate: false });
    }
    // Handle boolean values
    else if (typeof value === "boolean") {
      params[param] = String(value);
      form.setValue(param, value, { shouldValidate: false });
    }
    // Handle other values
    else {
      params[param] = String(value);
      form.setValue(param, value, { shouldValidate: false });
    }

    setMultipleParams({ params, replace: true });
  };

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
              handleFilterChange(filter.param, value)
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
              handleFilterChange(filter.param, value)
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
              handleFilterChange(filter.param, value)
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
              handleFilterChange(filter.param, value)
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

  // Tabs mode rendering
  if (mode === "tabs") {
    return (
      <div className={cn("w-full space-y-4", className)}>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm p-4">
          {/* Header */}
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-main-orange" />
            <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              Filters
            </h2>
            {hasActiveFilters && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                ({activeFiltersCount} active)
              </span>
            )}
          </div>

          {/* Filter Fields */}
          <Form form={form} onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-end">
              {config.filters.map((filter) => (
                <div key={filter.param}>{renderFilterField(filter)}</div>
              ))}
            </div>

            {/* Reset Button */}
            {config.showReset && (
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                <button
                  type="button"
                  onClick={handleReset}
                  disabled={!hasActiveFilters}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                    hasActiveFilters
                      ? "text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20"
                      : "text-gray-400 dark:text-gray-600 cursor-not-allowed",
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
          "flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-colors",
          "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700",
          "hover:bg-gray-50 dark:hover:bg-gray-700",
          "text-gray-900 dark:text-gray-100 font-medium",
          isDropdownOpen && "ring-2 ring-main-orange/20",
        )}
      >
        {dropdownIcon}
        <span>{dropdownButtonText}</span>
        {activeFiltersCount > 0 && (
          <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-main-orange text-white">
            {activeFiltersCount}
          </span>
        )}
        {isDropdownOpen ? (
          <ChevronUp className="w-4 h-4 ml-1" />
        ) : (
          <ChevronDown className="w-4 h-4 ml-1" />
        )}
      </button>

      {/* Dropdown Panel */}
      {isDropdownOpen && (
        <div
          className={cn(
            "absolute top-full left-0 mt-2 w-96 max-w-[calc(100vw-2rem)]",
            "bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700",
            "z-50 max-h-[80vh] overflow-y-auto",
          )}
        >
          <Form
            form={form}
            onSubmit={(e) => e.preventDefault()}
            className="p-4 space-y-4"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                Filters
                {activeFiltersCount > 0 && (
                  <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                    ({activeFiltersCount} active)
                  </span>
                )}
              </h3>
              {config.showReset && hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Filter Fields */}
            <div className="space-y-4">
              {config.filters.map((filter) => (
                <div key={filter.param}>{renderFilterField(filter)}</div>
              ))}
            </div>

            {/* Footer Actions */}
            {config.showApplyButton && (
              <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={handleApply}
                  className="w-full px-4 py-2 bg-main-orange hover:bg-main-orange/90 text-white font-medium rounded-lg transition-colors"
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
