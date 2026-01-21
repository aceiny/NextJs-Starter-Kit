"use client";

import * as React from "react";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { FormItem } from "./FormItem";
import { FormLabel } from "./FormLabel";
import { FormControl } from "./FormControl";
import { FormDescription } from "./FormDescription";
import { FormMessage } from "./FormMessage";
import { useThemeMode, getThemeClasses } from "./useThemeMode";

/**
 * Universal Input Types
 * Supports standard HTML inputs, OTP, textarea, and rich text editor
 */
type UniversalInputType =
  | "text"
  | "password"
  | "email"
  | "phone"
  | "number"
  | "date"
  | "search"
  | "url"
  | "datetime-local"
  | "otp"
  | "textarea"
  | "editor";

import { OTPInput } from "./input/OTPInput";
import { Editor } from "./input/Editor";
import { PasswordInput } from "./input/PasswordInput";
import { DateInput } from "./input/DateInput";
import { DateTimeInput } from "./input/DateTimeInput";

/**
 * RHFUniversalInput Component
 * A comprehensive input component that handles all input types through a single interface
 * Automatically integrates with React Hook Form using Controller
 *
 * @example
 * ```tsx
 * // Text input
 * <Field.Input
 *   name="email"
 *   type="email"
 *   label="Email Address"
 *   required
 *   helperText="We'll never share your email"
 * />
 *
 * // OTP input
 * <Field.Input
 *   name="otp"
 *   type="otp"
 *   label="Verification Code"
 *   maxLength={6}
 *   pattern="[0-9]*"
 * />
 *
 * // Textarea
 * <Field.Input
 *   name="description"
 *   type="textarea"
 *   label="Description"
 *   rows={4}
 * />
 *
 * // Rich text editor
 * <Field.Input
 *   name="content"
 *   type="editor"
 *   label="Article Content"
 * />
 * ```
 */
interface RHFUniversalInputProps<T extends FieldValues> {
  /** Field name matching your form schema */
  name: Path<T>;
  /** Input type - determines which input component to render */
  type?: UniversalInputType;
  /** Label text displayed above the input */
  label?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Helper text displayed below the input */
  helperText?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Whether the field is disabled */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** For textarea: number of rows */
  rows?: number;
  /** For OTP: number of characters/digits (default: 6) */
  otpLength?: number;
  /** For OTP: validation pattern */
  pattern?: string;
  /** For number inputs: min value */
  min?: number;
  /** For number inputs: max value */
  max?: number;
  /** For number inputs: step value */
  step?: number;
  /** Label mode: 'floating' (default) or 'static' */
  labelMode?: "floating" | "static";
  /** Force a specific theme ('light' | 'dark'). If not provided, uses Next.js theme */
  theme?: "light" | "dark";
  /** For password inputs: show/hide password toggle button (default: true) */
  showPasswordToggle?: boolean;
  /** Optional side effect callback when value changes (field.onChange is handled internally) */
  onChangeSideEffect?: (value: any) => void;
}

export function RHFUniversalInput<T extends FieldValues>({
  name,
  type = "text",
  label,
  placeholder,
  helperText,
  required = false,
  disabled = false,
  className,
  rows = 4,
  otpLength = 6,
  pattern,
  min,
  max,
  step,
  labelMode = "floating",
  theme,
  showPasswordToggle = true,
  onChangeSideEffect,
}: RHFUniversalInputProps<T>) {
  const { control } = useFormContext<T>();
  const currentTheme = useThemeMode(theme);
  const [showPassword, setShowPassword] = React.useState(false);

  // Determine if label should float
  // OTP and Editor always use static label mode
  // Otherwise, respect the labelMode prop
  const isFloating =
    type === "otp" || type === "editor" ? false : labelMode === "floating";

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const hasError = !!error;

        // Check if field has value for floating label
        // For date inputs with floating label, always float (even when empty) for better UX
        // If placeholder is provided with floating label, always float the label
        // For other inputs, check if value exists
        const hasValue =
          (type === "date" || type === "datetime-local") && isFloating
            ? true
            : placeholder && isFloating
              ? true
              : field.value !== undefined &&
                  field.value !== null &&
                  field.value !== "";

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
          "placeholder:text-gray-400",
          "placeholder:text-gray-600",
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

        const baseInputClasses = `w-full px-3 py-2.5 ${bgClass} border ${borderClass} ${textClass} ${
          isFloating ? `peer ${placeholderClass}` : placeholderClass
        } rounded-lg focus:outline-none focus:ring-2 ${ringClass} focus:border-transparent ${disabledBgClass} disabled:cursor-not-allowed disabled:opacity-50 transition-all`;

        // Render different input types
        const renderInput = () => {
          switch (type) {
            case "otp":
              return (
                <FormControl>
                  <OTPInput
                    value={field.value || ""}
                    onChange={(value) => {
                      field.onChange(value);
                      onChangeSideEffect?.(value);
                    }}
                    length={otpLength}
                    pattern={pattern}
                    disabled={disabled}
                    className={hasError ? "border-red-500" : ""}
                    theme={theme}
                  />
                </FormControl>
              );

            case "textarea":
              return (
                <FormControl>
                  <textarea
                    {...field}
                    value={field.value || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value);
                      onChangeSideEffect?.(value);
                    }}
                    rows={rows}
                    disabled={disabled}
                    placeholder={placeholder}
                    className={`${baseInputClasses} resize-y ${className || ""}`}
                  />
                </FormControl>
              );

            case "editor":
              return (
                <FormControl>
                  <Editor
                    value={field.value || ""}
                    onChange={(value) => {
                      field.onChange(value);
                      onChangeSideEffect?.(value);
                    }}
                    disabled={disabled}
                    placeholder={placeholder}
                    className={hasError ? "border-red-500" : ""}
                    theme={theme}
                  />
                </FormControl>
              );

            case "number":
              return (
                <FormControl>
                  <input
                    {...field}
                    type="number"
                    value={field.value ?? ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      const numValue = value === "" ? undefined : Number(value);
                      field.onChange(numValue);
                      onChangeSideEffect?.(numValue);
                    }}
                    disabled={disabled}
                    placeholder={placeholder}
                    min={min}
                    max={max}
                    step={step}
                    className={`${baseInputClasses} ${className || ""}`}
                  />
                </FormControl>
              );

            case "phone":
              return (
                <FormControl>
                  <input
                    {...field}
                    type="tel"
                    value={field.value || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value);
                      onChangeSideEffect?.(value);
                    }}
                    disabled={disabled}
                    placeholder={placeholder}
                    className={`${baseInputClasses} ${className || ""}`}
                  />
                </FormControl>
              );

            case "date":
              return (
                <FormControl>
                  <DateInput
                    value={field.value || ""}
                    onChange={(v: string) => {
                      field.onChange(v);
                      onChangeSideEffect?.(v);
                    }}
                    disabled={disabled}
                    placeholder={placeholder}
                    className={className}
                    theme={theme}
                  />
                </FormControl>
              );

            case "datetime-local":
              return (
                <FormControl>
                  <DateTimeInput
                    value={field.value || ""}
                    onChange={(v: string) => {
                      field.onChange(v);
                      onChangeSideEffect?.(v);
                    }}
                    disabled={disabled}
                    placeholder={placeholder}
                    className={className}
                    theme={theme}
                  />
                </FormControl>
              );

            default:
              // Password input handled by dedicated component
              if (type === "password") {
                return (
                  <FormControl>
                    <PasswordInput
                      value={field.value || ""}
                      onChange={(v: string) => {
                        field.onChange(v);
                        onChangeSideEffect?.(v);
                      }}
                      disabled={disabled}
                      placeholder={placeholder}
                      showToggle={showPasswordToggle}
                      className={className}
                      theme={theme}
                    />
                  </FormControl>
                );
              }

              return (
                <FormControl>
                  <input
                    {...field}
                    type={type}
                    value={field.value || ""}
                    onChange={(e) => {
                      const value = e.target.value; 
                      field.onChange(value);
                      onChangeSideEffect?.(value);
                    }}
                    disabled={disabled}
                    placeholder={placeholder}
                    className={`${baseInputClasses} ${className || ""}`}
                  />
                </FormControl>
              );
          }
        };

        // Theme-aware label background
        const labelBg = getThemeClasses(
          "bg-white",
          "bg-gray-950",
          currentTheme,
        );
        const labelFocusedColor =
          currentTheme === "dark" ? "text-gray-100" : "text-gray-900";
        const labelUnfocusedColor =
          currentTheme === "dark" ? "text-gray-300" : "text-gray-900";

        return (
          <FormItem name={name}>
            {isFloating ? (
              <div className="relative">
                {renderInput()}
                {label && (
                  <FormLabel
                    required={required}
                    className={`absolute rounded-3xl left-3 ${labelBg} px-1 font-medium transition-all duration-200 pointer-events-none ${
                      hasValue
                        ? `-top-2.5 text-xs ${labelFocusedColor}`
                        : `top-1/2 -translate-y-1/2 text-sm ${labelUnfocusedColor} peer-focus:-top-2.5 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:${labelFocusedColor}`
                    }`}
                  >
                    {label}
                  </FormLabel>
                )}
              </div>
            ) : (
              <div className="space-y-1">
                {label && <FormLabel required={required}>{label}</FormLabel>}
                {renderInput()}
              </div>
            )}
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
