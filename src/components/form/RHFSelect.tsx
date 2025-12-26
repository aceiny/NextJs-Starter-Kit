"use client";

import * as React from "react";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { FormItem } from "./FormItem";
import { FormLabel } from "./FormLabel";
import { FormDescription } from "./FormDescription";
import { FormMessage } from "./FormMessage";
import { useThemeMode, getThemeClasses } from "./useThemeMode";

/**
 * Option type for select dropdowns
 */
export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

/**
 * RHFSelect Component
 * A universal select component supporting both single and multi-select modes
 * Automatically integrates with React Hook Form using Controller
 *
 * @example
 * ```tsx
 * // Single select
 * <Field.Select
 *   name="country"
 *   label="Country"
 *   options={[
 *     { label: "USA", value: "us" },
 *     { label: "UK", value: "uk" },
 *   ]}
 *   placeholder="Select a country"
 *   required
 * />
 *
 * // Multi-select with max selection
 * <Field.Select
 *   name="skills"
 *   label="Skills"
 *   options={[
 *     { label: "React", value: "react" },
 *     { label: "TypeScript", value: "typescript" },
 *     { label: "Node.js", value: "nodejs" },
 *   ]}
 *   isMulti
 *   maxSelect={3}
 *   placeholder="Select up to 3 skills"
 * />
 * ```
 */
interface RHFSelectProps<T extends FieldValues> {
  /** Field name matching your form schema */
  name: Path<T>;
  /** Label text displayed above the select */
  label?: string;
  /** Array of options to display */
  options: SelectOption[];
  /** Placeholder text */
  placeholder?: string;
  /** Helper text displayed below the select */
  helperText?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Whether the field is disabled */
  disabled?: boolean;
  /** Enable multi-select mode */
  isMulti?: boolean;
  /** Maximum number of selections (only for multi-select) */
  maxSelect?: number;
  /** Additional CSS classes */
  className?: string;
  /** Force a specific theme ('light' | 'dark'). If not provided, uses Next.js theme */
  theme?: "light" | "dark";
  /** Optional side effect callback when value changes (field.onChange is handled internally) */
  onChangeSideEffect?: (value: any) => void;
}

export function RHFSelect<T extends FieldValues>({
  name,
  label,
  options,
  placeholder = "Select an option",
  helperText,
  required = false,
  disabled = false,
  isMulti = false,
  maxSelect,
  className,
  theme,
  onChangeSideEffect,
}: RHFSelectProps<T>) {
  const { control } = useFormContext<T>();
  const currentTheme = useThemeMode(theme);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const hasError = !!error;

        // Theme-aware classes
        const bgClass = getThemeClasses(
          "bg-white",
          "bg-gray-950",
          currentTheme,
        );
        const borderClass = hasError
          ? getThemeClasses("border-red-500", "border-red-400", currentTheme)
          : getThemeClasses("border-gray-200", "border-gray-800", currentTheme);
        const textClass = getThemeClasses(
          "text-gray-900",
          "text-gray-100",
          currentTheme,
        );
        const placeholderClass = getThemeClasses(
          "text-gray-400",
          "text-gray-600",
          currentTheme,
        );
        const ringClass = hasError
          ? getThemeClasses(
              "focus:ring-red-500",
              "focus:ring-red-400",
              currentTheme,
            )
          : getThemeClasses(
              "focus:ring-gray-900",
              "focus:ring-gray-100",
              currentTheme,
            );
        const disabledBgClass = getThemeClasses(
          "disabled:bg-gray-50",
          "disabled:bg-gray-900",
          currentTheme,
        );
        const hoverBgClass = getThemeClasses(
          "hover:bg-gray-100",
          "hover:bg-gray-900",
          currentTheme,
        );
        const selectedBgClass = getThemeClasses(
          "bg-gray-100",
          "bg-gray-900",
          currentTheme,
        );

        // Handle single select
        const handleSingleSelectChange = (
          e: React.ChangeEvent<HTMLSelectElement>,
        ) => {
          const value = e.target.value;
          const selectedValue = value === "" ? undefined : value;
          field.onChange(selectedValue);
          onChangeSideEffect?.(selectedValue);
        };

        // Handle multi-select checkbox changes
        const handleMultiSelectChange = (optionValue: string | number) => {
          const currentValues: (string | number)[] = Array.isArray(field.value)
            ? field.value
            : [];

          let newValues: (string | number)[];

          if (currentValues.includes(optionValue)) {
            // Remove the value
            newValues = currentValues.filter((v) => v !== optionValue);
          } else {
            // Add the value if under maxSelect limit
            if (maxSelect && currentValues.length >= maxSelect) {
              return; // Don't add if max reached
            }
            newValues = [...currentValues, optionValue];
          }

          field.onChange(newValues);
          onChangeSideEffect?.(newValues);
        };

        // Check if a value is selected (for multi-select)
        const isSelected = (optionValue: string | number): boolean => {
          if (!Array.isArray(field.value)) return false;
          return field.value.includes(optionValue);
        };

        // Check if max selections reached (for multi-select)
        const isMaxReached = (): boolean => {
          if (!isMulti || !maxSelect) return false;
          const currentValues = Array.isArray(field.value) ? field.value : [];
          return currentValues.length >= maxSelect;
        };

        const [isOpen, setIsOpen] = React.useState(false);
        const dropdownRef = React.useRef<HTMLDivElement>(null);

        // Close dropdown when clicking outside
        React.useEffect(() => {
          const handleClickOutside = (event: MouseEvent) => {
            if (
              dropdownRef.current &&
              !dropdownRef.current.contains(event.target as Node)
            ) {
              setIsOpen(false);
            }
          };

          document.addEventListener("mousedown", handleClickOutside);
          return () =>
            document.removeEventListener("mousedown", handleClickOutside);
        }, []);

        // Get display label for selected value
        const getDisplayLabel = () => {
          if (isMulti) {
            const selectedValues = Array.isArray(field.value)
              ? field.value
              : [];
            if (selectedValues.length === 0) return placeholder;
            if (selectedValues.length === 1) {
              const option = options.find(
                (opt) => opt.value === selectedValues[0],
              );
              return option?.label || placeholder;
            }
            return `${selectedValues.length} selected`;
          } else {
            if (!field.value) return placeholder;
            const option = options.find((opt) => opt.value === field.value);
            return option?.label || placeholder;
          }
        };

        return (
          <FormItem name={name} className={className}>
            {label && <FormLabel required={required}>{label}</FormLabel>}

            <div ref={dropdownRef} className="relative">
              {/* Select Button */}
              <button
                type="button"
                onClick={() => !disabled && setIsOpen(!isOpen)}
                disabled={disabled}
                className={`w-full px-3 py-2.5 ${bgClass} border ${borderClass} text-left ${textClass} rounded-lg focus:outline-none focus:ring-2 ${ringClass} focus:border-transparent ${disabledBgClass} disabled:cursor-not-allowed disabled:opacity-50 transition-all flex items-center justify-between cursor-pointer ${
                  !field.value ||
                  (Array.isArray(field.value) && field.value.length === 0)
                    ? placeholderClass
                    : ""
                }`}
              >
                <span className="text-sm">{getDisplayLabel()}</span>
                <svg
                  className={`w-4 h-4 ${textClass} transition-transform ${isOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isOpen && !disabled && (
                <div
                  className={`absolute z-50 w-full mt-2 ${bgClass} border ${borderClass} rounded-lg shadow-lg max-h-60 overflow-y-auto`}
                >
                  {options.length === 0 ? (
                    <div className={`px-3 py-2 text-sm ${placeholderClass}`}>
                      No options available
                    </div>
                  ) : isMulti ? (
                    // Multi-select options
                    <div className="p-1">
                      {options.map((option) => {
                        const selected = isSelected(option.value);
                        const itemDisabled =
                          option.disabled || (!selected && isMaxReached());

                        return (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => {
                              if (!itemDisabled) {
                                handleMultiSelectChange(option.value);
                              }
                            }}
                            disabled={itemDisabled}
                            className={`w-full flex items-center space-x-2 px-3 py-2 rounded-md text-sm ${textClass} transition-colors ${
                              itemDisabled
                                ? "opacity-50 cursor-not-allowed"
                                : `cursor-pointer ${hoverBgClass}`
                            } ${selected ? selectedBgClass : ""}`}
                          >
                            <div className="relative flex items-center">
                              <div
                                className={`w-4 h-4 border rounded ${
                                  selected
                                    ? "bg-gray-900 dark:bg-white border-gray-900 dark:border-white"
                                    : "bg-white dark:bg-gray-950 border-gray-300 dark:border-gray-700"
                                }`}
                              >
                                {selected && (
                                  <svg
                                    className={`w-3 h-3 ${getThemeClasses("text-white", "text-gray-900", currentTheme)}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    style={{
                                      position: "relative",
                                      left: "1px",
                                    }}
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={3}
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                )}
                              </div>
                            </div>
                            <span className={textClass}>{option.label}</span>
                          </button>
                        );
                      })}
                      {maxSelect && (
                        <div
                          className={`px-3 py-2 text-xs ${getThemeClasses("text-gray-500", "text-gray-400", currentTheme)} border-t ${borderClass} mt-1 pt-2`}
                        >
                          {Array.isArray(field.value) ? field.value.length : 0}{" "}
                          / {maxSelect} selected
                        </div>
                      )}
                    </div>
                  ) : (
                    // Single select options
                    <div className="p-1">
                      {options.map((option) => {
                        const isSelected = field.value === option.value;

                        return (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => {
                              if (!option.disabled) {
                                handleSingleSelectChange({
                                  target: { value: option.value },
                                } as any);
                                setIsOpen(false);
                              }
                            }}
                            disabled={option.disabled}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm ${textClass} transition-colors ${
                              option.disabled
                                ? "opacity-50 cursor-not-allowed"
                                : `cursor-pointer ${hoverBgClass}`
                            } ${isSelected ? selectedBgClass : ""}`}
                          >
                            <span className={textClass}>{option.label}</span>
                            {isSelected && (
                              <svg
                                className={`w-4 h-4 ${textClass}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
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
