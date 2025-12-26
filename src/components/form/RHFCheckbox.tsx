"use client";

import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { FormItem } from "./FormItem";
import { FormDescription } from "./FormDescription";
import { FormMessage } from "./FormMessage";
import { useThemeMode, getThemeClasses } from "./useThemeMode";

/**
 * RHFCheckbox Component
 * A single checkbox component integrated with React Hook Form
 * Uses Controller internally - no need to pass onChange
 *
 * @example
 * ```tsx
 * <Field.Checkbox
 *   name="acceptTerms"
 *   label="I accept the terms and conditions"
 *   required
 * />
 * ```
 */
interface RHFCheckboxProps<T extends FieldValues> {
  /** Field name matching your form schema */
  name: Path<T>;
  /** Label text displayed next to the checkbox */
  label?: string;
  /** Helper text displayed below the checkbox */
  helperText?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Whether the field is disabled */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Force a specific theme ('light' | 'dark'). If not provided, uses Next.js theme */
  theme?: "light" | "dark";
  /** Optional side effect callback when value changes (field.onChange is handled internally) */
  onChangeSideEffect?: (checked: boolean) => void;
}

export function RHFCheckbox<T extends FieldValues>({
  name,
  label,
  helperText,
  required = false,
  disabled = false,
  className,
  theme,
  onChangeSideEffect,
}: RHFCheckboxProps<T>) {
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
          : getThemeClasses("border-gray-300", "border-gray-700", currentTheme);
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
        const hoverBorderClass = getThemeClasses(
          "hover:border-gray-400",
          "hover:border-gray-600",
          currentTheme,
        );
        const checkIconClass = getThemeClasses(
          "text-white",
          "text-gray-900",
          currentTheme,
        );

        return (
          <FormItem name={name} className={className}>
            <div className="flex items-start space-x-3">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  id={`checkbox-${name}`}
                  checked={!!field.value}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    field.onChange(checked);
                    onChangeSideEffect?.(checked);
                  }}
                  onBlur={field.onBlur}
                  ref={field.ref}
                  disabled={disabled}
                  className={`peer mt-0.5 w-4 h-4 cursor-pointer appearance-none border rounded ${bgClass} ${borderClass} ${checkedBgClass} ${checkedBorderClass} focus:outline-none focus:ring-2 ${ringClass} focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed transition-all ${
                    disabled ? "" : hoverBorderClass
                  }`}
                />
                {/* Check icon */}
                <svg
                  className={`absolute w-3 h-3 pointer-events-none ${
                    disabled
                      ? getThemeClasses(
                          "text-gray-400",
                          "text-gray-600",
                          currentTheme,
                        )
                      : checkIconClass
                  } opacity-0 peer-checked:opacity-100 transition-opacity`}
                  style={{ left: "2px", top: "4px" }}
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
              <div className="flex-1">
                {label && (
                  <label
                    htmlFor={`checkbox-${name}`}
                    className={`text-sm font-medium leading-none cursor-pointer select-none ${getThemeClasses("text-gray-900", "text-gray-100", currentTheme)} ${
                      disabled ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {label}
                    {required && (
                      <span
                        className={`${getThemeClasses("text-red-500", "text-red-400", currentTheme)} ml-1`}
                      >
                        *
                      </span>
                    )}
                  </label>
                )}
                {helperText && !error && (
                  <FormDescription>{helperText}</FormDescription>
                )}
                <FormMessage />
              </div>
            </div>
          </FormItem>
        );
      }}
    />
  );
}
