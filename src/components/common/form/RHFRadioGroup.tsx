"use client";

import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { FormItem } from "./FormItem";
import { FormLabel } from "./FormLabel";
import { FormDescription } from "./FormDescription";
import { FormMessage } from "./FormMessage";
import { useThemeMode, getThemeClasses } from "./useThemeMode";

/**
 * Option type for radio group
 */
export interface RadioOption {
  label: string;
  value: string | number;
  disabled?: boolean;
  description?: string;
}

/**
 * RHFRadioGroup Component
 * A radio button group integrated with React Hook Form
 * Uses Controller internally - form values update automatically
 *
 * @example
 * ```tsx
 * <Field.RadioGroup
 *   name="paymentMethod"
 *   label="Select payment method"
 *   options={[
 *     {
 *       label: "Credit Card",
 *       value: "credit_card",
 *       description: "Pay with your credit or debit card"
 *     },
 *     {
 *       label: "PayPal",
 *       value: "paypal",
 *       description: "Pay with your PayPal account"
 *     },
 *     {
 *       label: "Bank Transfer",
 *       value: "bank_transfer",
 *       description: "Direct bank transfer"
 *     },
 *   ]}
 *   required
 * />
 * ```
 */
interface RHFRadioGroupProps<T extends FieldValues> {
  /** Field name matching your form schema */
  name: Path<T>;
  /** Label text displayed above the radio group */
  label?: string;
  /** Array of options to display */
  options: RadioOption[];
  /** Helper text displayed below the radio group */
  helperText?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Whether all radio buttons are disabled */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Display options horizontally instead of vertically */
  horizontal?: boolean;
  /** Optional side effect callback when value changes (field.onChange is handled internally) */
  onChangeSideEffect?: (value: string | number) => void;
  /** Force a specific theme (overrides system theme) */
  theme?: "light" | "dark";
}

export function RHFRadioGroup<T extends FieldValues>({
  name,
  label,
  options,
  helperText,
  required = false,
  disabled = false,
  className,
  horizontal = false,
  onChangeSideEffect,
  theme,
}: RHFRadioGroupProps<T>) {
  const { control } = useFormContext<T>();
  const currentTheme = useThemeMode(theme);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const hasError = !!error;

        const handleRadioChange = (optionValue: string | number) => {
          field.onChange(optionValue);
          onChangeSideEffect?.(optionValue);
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
              className={`${
                horizontal ? "flex flex-wrap gap-4" : "space-y-3"
              } p-4 ${bgClass} border ${borderClass} rounded-lg`}
            >
              {options.length === 0 ? (
                <div className={`${emptyTextClass} text-sm`}>
                  No options available
                </div>
              ) : (
                options.map((option) => {
                  const isChecked = field.value === option.value;
                  const isDisabled = disabled || option.disabled;

                  const radioBgClass = getThemeClasses(
                    "bg-white",
                    "bg-gray-950",
                    currentTheme,
                  );
                  const radioBorderClass = isDisabled
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
                  const dotBgClass = isDisabled
                    ? getThemeClasses(
                        "bg-gray-400",
                        "bg-gray-600",
                        currentTheme,
                      )
                    : getThemeClasses("bg-gray-900", "bg-white", currentTheme);
                  const labelTextClass = getThemeClasses(
                    "text-gray-900",
                    "text-gray-100",
                    currentTheme,
                  );
                  const descriptionTextClass = getThemeClasses(
                    "text-gray-500",
                    "text-gray-400",
                    currentTheme,
                  );

                  return (
                    <div
                      key={option.value}
                      className={`flex items-start ${
                        horizontal ? "" : "space-x-3"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative flex items-center">
                          <input
                            type="radio"
                            id={`${name}-${option.value}`}
                            checked={isChecked}
                            onChange={() => handleRadioChange(option.value)}
                            onBlur={field.onBlur}
                            disabled={isDisabled}
                            className={`peer w-4 h-4 cursor-pointer appearance-none rounded-full border ${radioBgClass} ${radioBorderClass} ${checkedBorderClass} focus:outline-none focus:ring-2 ${ringClass} focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed transition-all ${hoverBorderClass}`}
                          />
                          <div
                            className={`absolute w-2 h-2 rounded-full pointer-events-none ${dotBgClass} opacity-0 peer-checked:opacity-100 transition-opacity`}
                            style={{ left: "4px" }}
                          />
                        </div>
                        <div className="flex-1">
                          <label
                            htmlFor={`${name}-${option.value}`}
                            className={`text-sm font-medium leading-none cursor-pointer select-none ${labelTextClass} ${
                              isDisabled ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                          >
                            {option.label}
                          </label>
                          {option.description && (
                            <p
                              className={`text-xs ${descriptionTextClass} mt-1 ${
                                isDisabled ? "opacity-50" : ""
                              }`}
                            >
                              {option.description}
                            </p>
                          )}
                        </div>
                      </div>
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
