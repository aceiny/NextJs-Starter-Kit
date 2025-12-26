"use client";

import * as React from "react";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { FormItem } from "./FormItem";
import { FormLabel } from "./FormLabel";
import { FormDescription } from "./FormDescription";
import { FormMessage } from "./FormMessage";
import { CheckboxOption } from "./RHFCheckboxGroup";
import { useThemeMode, getThemeClasses } from "./useThemeMode";

/**
 * RHFSearchableCheckboxGroup Component
 * A searchable group of checkboxes integrated with React Hook Form
 * Uses Controller internally - form values update automatically
 *
 * @example
 * ```tsx
 * <Field.SearchableCheckboxGroup
 *   name="countries"
 *   label="Select countries"
 *   options={[
 *     { label: "United States", value: "us" },
 *     { label: "United Kingdom", value: "uk" },
 *     { label: "Canada", value: "ca" },
 *     // ... more options
 *   ]}
 *   placeholder="Search countries..."
 *   required
 * />
 * ```
 */
interface RHFSearchableCheckboxGroupProps<T extends FieldValues> {
  /** Field name matching your form schema */
  name: Path<T>;
  /** Label text displayed above the checkbox group */
  label?: string;
  /** Array of options to display */
  options: CheckboxOption[];
  /** Search input placeholder text */
  placeholder?: string;
  /** Helper text displayed below the checkbox group */
  helperText?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Whether all checkboxes are disabled */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Maximum height of the scrollable area */
  maxHeight?: string;
  /** Optional side effect callback when value changes (field.onChange is handled internally) */
  onChangeSideEffect?: (values: (string | number)[]) => void;
  /** Force a specific theme (overrides system theme) */
  theme?: "light" | "dark";
}

export function RHFSearchableCheckboxGroup<T extends FieldValues>({
  name,
  label,
  options,
  placeholder = "Search...",
  helperText,
  required = false,
  disabled = false,
  className,
  maxHeight = "300px",
  onChangeSideEffect,
  theme,
}: RHFSearchableCheckboxGroupProps<T>) {
  const { control } = useFormContext<T>();
  const currentTheme = useThemeMode(theme);
  const [searchQuery, setSearchQuery] = React.useState("");

  // Filter options based on search query
  const filteredOptions = React.useMemo(() => {
    if (!searchQuery.trim()) return options;

    const query = searchQuery.toLowerCase();
    return options.filter((option) =>
      option.label.toLowerCase().includes(query),
    );
  }, [options, searchQuery]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const hasError = !!error;
        const selectedValues: (string | number)[] = Array.isArray(field.value)
          ? field.value
          : [];

        const handleCheckboxChange = (optionValue: string | number) => {
          let newValues: (string | number)[];

          if (selectedValues.includes(optionValue)) {
            // Remove the value
            newValues = selectedValues.filter((v) => v !== optionValue);
          } else {
            // Add the value
            newValues = [...selectedValues, optionValue];
          }

          field.onChange(newValues);
          onChangeSideEffect?.(newValues);
        };

        const handleSelectAll = () => {
          const allValues = filteredOptions
            .filter((opt) => !opt.disabled)
            .map((opt) => opt.value);
          field.onChange(allValues);
          onChangeSideEffect?.(allValues);
        };

        const handleClearAll = () => {
          field.onChange([]);
          onChangeSideEffect?.([]);
        };

        const bgClass = getThemeClasses(
          "bg-white",
          "bg-gray-950",
          currentTheme,
        );
        const borderClass = hasError
          ? getThemeClasses("border-red-500", "border-red-400", currentTheme)
          : getThemeClasses("border-gray-200", "border-gray-800", currentTheme);
        const searchBorderClass = getThemeClasses(
          "border-gray-200",
          "border-gray-800",
          currentTheme,
        );
        const searchTextClass = getThemeClasses(
          "text-gray-900",
          "text-gray-100",
          currentTheme,
        );
        const searchPlaceholderClass = getThemeClasses(
          "placeholder:text-gray-400",
          "placeholder:text-gray-600",
          currentTheme,
        );
        const searchRingClass = getThemeClasses(
          "focus:ring-gray-900",
          "focus:ring-gray-100",
          currentTheme,
        );
        const searchDisabledBgClass = getThemeClasses(
          "disabled:bg-gray-50",
          "disabled:bg-gray-900",
          currentTheme,
        );
        const actionBarBgClass = getThemeClasses(
          "bg-gray-50",
          "bg-gray-900",
          currentTheme,
        );

        return (
          <FormItem name={name} className={className}>
            {label && <FormLabel required={required}>{label}</FormLabel>}

            <div className={`${bgClass} border ${borderClass} rounded-lg`}>
              {/* Search bar */}
              <div className={`p-3 border-b ${searchBorderClass}`}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={placeholder}
                  disabled={disabled}
                  className={`w-full px-3 py-2 text-sm ${bgClass} border ${searchBorderClass} ${searchTextClass} ${searchPlaceholderClass} rounded-md focus:outline-none focus:ring-2 ${searchRingClass} focus:border-transparent ${searchDisabledBgClass} disabled:cursor-not-allowed disabled:opacity-50 transition-colors`}
                />
              </div>

              {/* Action buttons */}
              <div
                className={`flex gap-2 p-2 border-b ${searchBorderClass} ${actionBarBgClass}`}
              >
                <button
                  type="button"
                  onClick={handleSelectAll}
                  disabled={disabled || filteredOptions.length === 0}
                  className={`px-3 py-1 text-xs font-medium ${getThemeClasses("text-gray-900", "text-gray-100", currentTheme)} ${getThemeClasses("hover:bg-gray-200", "hover:bg-gray-800", currentTheme)} rounded cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  Select All
                </button>
                <button
                  type="button"
                  onClick={handleClearAll}
                  disabled={disabled || selectedValues.length === 0}
                  className={`px-3 py-1 text-xs font-medium ${getThemeClasses("text-red-600", "text-red-400", currentTheme)} ${getThemeClasses("hover:bg-red-50", "hover:bg-red-950", currentTheme)} rounded cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  Clear All
                </button>
                <div className="flex-1" />
                <span
                  className={`text-xs ${getThemeClasses("text-gray-500", "text-gray-400", currentTheme)} self-center`}
                >
                  {selectedValues.length} selected
                </span>
              </div>

              {/* Checkbox list */}
              <div
                className="overflow-y-auto p-3 space-y-3"
                style={{ maxHeight }}
              >
                {filteredOptions.length === 0 ? (
                  <div
                    className={`${getThemeClasses("text-gray-400", "text-gray-600", currentTheme)} text-sm text-center py-4`}
                  >
                    {searchQuery ? "No results found" : "No options available"}
                  </div>
                ) : (
                  filteredOptions.map((option) => {
                    const isChecked = selectedValues.includes(option.value);
                    const isDisabled = disabled || option.disabled;

                    const hoverBgClass = getThemeClasses(
                      "hover:bg-gray-50",
                      "hover:bg-gray-900",
                      currentTheme,
                    );
                    const checkboxBgClass = getThemeClasses(
                      "bg-white",
                      "bg-gray-950",
                      currentTheme,
                    );
                    const checkboxBorderClass = getThemeClasses(
                      "border-gray-300",
                      "border-gray-700",
                      currentTheme,
                    );
                    const ringClass = getThemeClasses(
                      "focus:ring-gray-900",
                      "focus:ring-gray-100",
                      currentTheme,
                    );
                    const ringOffsetClass = getThemeClasses(
                      "focus:ring-offset-white",
                      "focus:ring-offset-gray-950",
                      currentTheme,
                    );
                    const checkedBgClass = getThemeClasses(
                      "checked:bg-gray-900",
                      "checked:bg-white",
                      currentTheme,
                    );
                    const checkedBorderClass = getThemeClasses(
                      "checked:border-gray-900",
                      "checked:border-white",
                      currentTheme,
                    );
                    const checkIconClass = getThemeClasses(
                      "text-white",
                      "text-gray-900",
                      currentTheme,
                    );
                    const labelTextClass = getThemeClasses(
                      "text-gray-900",
                      "text-gray-100",
                      currentTheme,
                    );

                    return (
                      <div
                        key={option.value}
                        className={`flex items-center space-x-3 p-2 ${hoverBgClass} rounded transition-colors`}
                      >
                        <div className="relative flex items-center">
                          <input
                            type="checkbox"
                            id={`${name}-${option.value}`}
                            checked={isChecked}
                            onChange={() => handleCheckboxChange(option.value)}
                            disabled={isDisabled}
                            className={`appearance-none w-4 h-4 ${checkboxBgClass} border ${checkboxBorderClass} rounded cursor-pointer focus:outline-none focus:ring-2 ${ringClass} focus:ring-offset-2 ${ringOffsetClass} disabled:opacity-50 disabled:cursor-not-allowed transition-all ${checkedBgClass} ${checkedBorderClass}`}
                          />
                          {isChecked && (
                            <svg
                              className={`absolute w-4 h-4 ${checkIconClass} pointer-events-none`}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </div>
                        <label
                          htmlFor={`${name}-${option.value}`}
                          className={`text-sm font-medium leading-none cursor-pointer select-none flex-1 ${labelTextClass} ${
                            isDisabled ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                        >
                          {option.label}
                        </label>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {helperText && !error && (
              <FormDescription>{helperText}</FormDescription>
            )}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
