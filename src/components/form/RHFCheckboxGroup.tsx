"use client";

import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { FormItem } from "./FormItem";
import { FormLabel } from "./FormLabel";
import { FormDescription } from "./FormDescription";
import { FormMessage } from "./FormMessage";
import { useThemeMode, getThemeClasses } from "./useThemeMode";

/**
 * Option type for checkbox group
 */
export interface CheckboxOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

/**
 * RHFCheckboxGroup Component
 * A group of checkboxes integrated with React Hook Form
 * Uses Controller internally - form values update automatically
 *
 * @example
 * ```tsx
 * <Field.CheckboxGroup
 *   name="preferences"
 *   label="Select your preferences"
 *   options={[
 *     { label: "Email notifications", value: "email" },
 *     { label: "SMS notifications", value: "sms" },
 *     { label: "Push notifications", value: "push" },
 *   ]}
 *   required
 * />
 * ```
 */
interface RHFCheckboxGroupProps<T extends FieldValues> {
  /** Field name matching your form schema */
  name: Path<T>;
  /** Label text displayed above the checkbox group */
  label?: string;
  /** Array of options to display */
  options: CheckboxOption[];
  /** Helper text displayed below the checkbox group */
  helperText?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Whether all checkboxes are disabled */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Optional side effect callback when value changes (field.onChange is handled internally) */
  onChangeSideEffect?: (values: (string | number)[]) => void;
  /** Force a specific theme (overrides system theme) */
  theme?: "light" | "dark";
}

export function RHFCheckboxGroup<T extends FieldValues>({
  name,
  label,
  options,
  helperText,
  required = false,
  disabled = false,
  className,
  onChangeSideEffect,
  theme,
}: RHFCheckboxGroupProps<T>) {
  const { control } = useFormContext<T>();
  const currentTheme = useThemeMode(theme);
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

        const bgClass = getThemeClasses(
          "bg-white",
          "bg-gray-950",
          currentTheme,
        );
        const borderClass = hasError
          ? getThemeClasses("border-red-500", "border-red-400", currentTheme)
          : getThemeClasses("border-gray-200", "border-gray-800", currentTheme);
        const emptyTextClass = getThemeClasses(
          "text-gray-400",
          "text-gray-600",
          currentTheme,
        );

        return (
          <FormItem name={name} className={className}>
            {label && <FormLabel required={required}>{label}</FormLabel>}

            <div
              className={`space-y-3 p-4 ${bgClass} border ${borderClass} rounded-lg`}
            >
              {options.length === 0 ? (
                <div className={`${emptyTextClass} text-sm`}>
                  No options available
                </div>
              ) : (
                options.map((option) => {
                  const isChecked = selectedValues.includes(option.value);
                  const isDisabled = disabled || option.disabled;

                  const checkboxBgClass = getThemeClasses(
                    "bg-white",
                    "bg-gray-950",
                    currentTheme,
                  );
                  const checkboxBorderClass = isDisabled
                    ? getThemeClasses(
                        "border-gray-200",
                        "border-gray-800",
                        currentTheme,
                      )
                    : getThemeClasses(
                        "border-gray-300",
                        "border-gray-700",
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
                  const ringClass = getThemeClasses(
                    "focus:ring-gray-900",
                    "focus:ring-gray-100",
                    currentTheme,
                  );
                  const hoverBorderClass = !isDisabled
                    ? getThemeClasses(
                        "hover:border-gray-400",
                        "hover:border-gray-600",
                        currentTheme,
                      )
                    : "";
                  const checkIconClass = isDisabled
                    ? getThemeClasses(
                        "text-gray-400",
                        "text-gray-600",
                        currentTheme,
                      )
                    : getThemeClasses(
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
                      className="flex items-center space-x-3"
                    >
                      <div className="relative flex items-center">
                        <input
                          type="checkbox"
                          id={`${name}-${option.value}`}
                          checked={isChecked}
                          onChange={() => handleCheckboxChange(option.value)}
                          disabled={isDisabled}
                          className={`peer w-4 h-4 cursor-pointer appearance-none border rounded ${checkboxBgClass} ${checkboxBorderClass} ${checkedBgClass} ${checkedBorderClass} focus:outline-none focus:ring-2 ${ringClass} focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed transition-all ${hoverBorderClass}`}
                        />
                        <svg
                          className={`absolute w-3 h-3 pointer-events-none ${checkIconClass} opacity-0 peer-checked:opacity-100 transition-opacity`}
                          style={{ left: "2px" }}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <label
                        htmlFor={`${name}-${option.value}`}
                        className={`text-sm font-medium leading-none cursor-pointer select-none ${labelTextClass} ${
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
