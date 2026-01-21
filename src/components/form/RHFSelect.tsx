"use client";

import * as React from "react";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { FormItem } from "./FormItem";
import { FormLabel } from "./FormLabel";
import { FormDescription } from "./FormDescription";
import { FormMessage } from "./FormMessage";
import { useThemeMode, getThemeClasses } from "./useThemeMode";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

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
 * // Floating label
 * <Field.Select
 *   name="countryFloating"
 *   label="Country"
 *   options={[
 *     { label: "USA", value: "us" },
 *     { label: "UK", value: "uk" },
 *   ]}
 *   placeholder="Select a country"
 *   labelMode="floating"
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
  /** Label mode: 'floating' (default) or 'static' */
  labelMode?: "floating" | "static";
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
  labelMode = "floating",
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
        const isFloating = labelMode === "floating";

        // Theme-aware classes
        const bgClass = getThemeClasses("bg-white", "bg-gray-950", currentTheme);
        const borderClass = error
          ? getThemeClasses("border-red-500", "border-red-400", currentTheme)
          : getThemeClasses("border-gray-200", "border-gray-800", currentTheme);
        const textClass = getThemeClasses("text-gray-900", "text-gray-100", currentTheme);
        const placeholderClass = getThemeClasses("placeholder:text-gray-400", "placeholder:text-gray-600", currentTheme);
        const ringClass = error
          ? getThemeClasses("focus:ring-red-500", "focus:ring-red-400", currentTheme)
          : getThemeClasses("focus:ring-gray-900", "focus:ring-gray-100", currentTheme);
        const disabledBgClass = getThemeClasses("disabled:bg-gray-50", "disabled:bg-gray-900", currentTheme);

        const baseSelectClasses = `w-full px-3 py-2.5 ${bgClass} border ${borderClass} ${textClass} ${isFloating ? `peer ${placeholderClass}` : placeholderClass} rounded-lg focus:outline-none focus:ring-2 ${ringClass} focus:border-transparent ${disabledBgClass} disabled:cursor-not-allowed disabled:opacity-50 transition-all`;

        // If multi-select mode, use custom dropdown with checkboxes
        if (isMulti) {
          return (
            <MultiSelectDropdown
              field={field}
              error={error}
              label={label}
              required={required}
              options={options}
              placeholder={placeholder}
              helperText={helperText}
              disabled={disabled}
              maxSelect={maxSelect}
              className={className}
              onChangeSideEffect={onChangeSideEffect}
              name={name}
              labelMode={labelMode}
              theme={theme}
              baseSelectClasses={baseSelectClasses}
            />
          );
        }

        // Single select mode using shadcn Select
        const hasValue = isFloating ? true : (field.value !== undefined && field.value !== null && field.value !== "");

        return (
          <FormItem name={name} className={className}>
            {isFloating ? (
              <div className="relative">
                <Select
                  value={field.value !== undefined && field.value !== null ? String(field.value) : undefined}
                  onValueChange={(value) => {
                    // Find the original option to preserve the correct type
                    const originalOption = options.find(opt => opt.value.toString() === value);
                    const selectedValue = originalOption ? originalOption.value : value;
                    field.onChange(selectedValue);
                    onChangeSideEffect?.(selectedValue);
                  }}
                  disabled={disabled}
                >
                  <SelectTrigger className={cn(baseSelectClasses, error && "border-destructive focus-visible:ring-destructive/20")}>
                    <SelectValue placeholder={placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {options.length === 0 ? (
                      <div className="px-2 py-6 text-center text-sm text-muted-foreground">
                        No options available
                      </div>
                    ) : (
                      options.map((option) => (
                        <SelectItem
                          key={option.value}
                          value={option.value.toString()}
                          disabled={option.disabled}
                        >
                          {option.label}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
                {label && (
                  <FormLabel
                    required={required}
                    className={`absolute rounded-3xl left-3 ${getThemeClasses("bg-white","bg-gray-950", currentTheme)} px-1 font-medium transition-all duration-200 pointer-events-none ${
                      hasValue
                        ? `-top-2.5 text-xs ${currentTheme === "dark" ? "text-gray-100" : "text-gray-900"}`
                        : `top-1/2 -translate-y-1/2 text-sm ${currentTheme === "dark" ? "text-gray-300" : "text-gray-900"} peer-focus:-top-2.5 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:${currentTheme === "dark" ? "text-gray-100" : "text-gray-900"}`
                    }`}
                  >
                    {label}
                  </FormLabel>
                )}
              </div>
            ) : (
              <>
                {label && <FormLabel required={required}>{label}</FormLabel>}
                <Select
                  value={field.value !== undefined && field.value !== null ? String(field.value) : undefined}
                  onValueChange={(value) => {
                    const originalOption = options.find(opt => opt.value.toString() === value);
                    const selectedValue = originalOption ? originalOption.value : value;
                    field.onChange(selectedValue);
                    onChangeSideEffect?.(selectedValue);
                  }}
                  disabled={disabled}
                >
                  <SelectTrigger className={cn(baseSelectClasses, error && "border-destructive focus-visible:ring-destructive/20")}>
                    <SelectValue placeholder={placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {options.length === 0 ? (
                      <div className="px-2 py-6 text-center text-sm text-muted-foreground">
                        No options available
                      </div>
                    ) : (
                      options.map((option) => (
                        <SelectItem
                          key={option.value}
                          value={option.value.toString()}
                          disabled={option.disabled}
                        >
                          {option.label}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </>
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

// Multi-select dropdown component using shadcn Checkbox
interface MultiSelectDropdownProps<T extends FieldValues> {
  field: any;
  error: any;
  label?: string;
  required?: boolean;
  options: SelectOption[];
  placeholder: string;
  helperText?: string;
  disabled?: boolean;
  maxSelect?: number;
  className?: string;
  onChangeSideEffect?: (value: any) => void;
  name: Path<T>;
  labelMode?: "floating" | "static";
  theme?: "light" | "dark";
  baseSelectClasses?: string;
}

function MultiSelectDropdown<T extends FieldValues>({
  field,
  error,
  label,
  required,
  options,
  placeholder,
  helperText,
  disabled,
  maxSelect,
  className,
  onChangeSideEffect,
  name,
  labelMode = "floating",
  theme,
  baseSelectClasses,
}: MultiSelectDropdownProps<T>) {
  const currentTheme = useThemeMode(theme);
  const isFloating = labelMode === "floating";

  // Theme-aware classes (fallback to baseSelectClasses when provided)
  const bgClass = getThemeClasses("bg-white", "bg-gray-950", currentTheme);
  const borderClass = error
    ? getThemeClasses("border-red-500", "border-red-400", currentTheme)
    : getThemeClasses("border-gray-200", "border-gray-800", currentTheme);
  const textClass = getThemeClasses("text-gray-900", "text-gray-100", currentTheme);
  const placeholderClass = getThemeClasses("placeholder:text-gray-400", "placeholder:text-gray-600", currentTheme);
  const ringClass = error
    ? getThemeClasses("focus:ring-red-500", "focus:ring-red-400", currentTheme)
    : getThemeClasses("focus:ring-gray-900", "focus:ring-gray-100", currentTheme);
  const disabledBgClass = getThemeClasses("disabled:bg-gray-50", "disabled:bg-gray-900", currentTheme);

  const selectButtonClasses = baseSelectClasses ?? `w-full flex items-center justify-between gap-2 text-sm h-9 px-3 py-2.5 ${bgClass} border ${borderClass} ${textClass} ${isFloating ? `peer ${placeholderClass}` : placeholderClass} rounded-lg focus:outline-none focus:ring-2 ${ringClass} focus:border-transparent ${disabledBgClass} disabled:cursor-not-allowed disabled:opacity-50 transition-all`;

  // Handle multi-select checkbox changes
  const handleMultiSelectChange = React.useCallback((optionValue: string | number, checked: boolean) => {
    const currentValues: (string | number)[] = Array.isArray(field.value)
      ? field.value
      : [];

    let newValues: (string | number)[];

    if (checked) {
      // Add the value if under maxSelect limit
      if (maxSelect && currentValues.length >= maxSelect) {
        return; // Don't add if max reached
      }
      newValues = [...currentValues, optionValue];
    } else {
      // Remove the value
      newValues = currentValues.filter((v) => v !== optionValue);
    }

    field.onChange(newValues);
    onChangeSideEffect?.(newValues);
  }, [field, maxSelect, onChangeSideEffect]);

  // Check if a value is selected
  const isSelected = React.useCallback((optionValue: string | number): boolean => {
    if (!Array.isArray(field.value)) return false;
    return field.value.includes(optionValue);
  }, [field.value]);

  // Check if max selections reached
  const isMaxReached = React.useCallback((): boolean => {
    if (!maxSelect) return false;
    const currentValues = Array.isArray(field.value) ? field.value : [];
    return currentValues.length >= maxSelect;
  }, [field.value, maxSelect]);

  // Get display label for selected values
  const getDisplayLabel = React.useCallback(() => {
    const selectedValues = Array.isArray(field.value) ? field.value : [];
    if (selectedValues.length === 0) return placeholder;
    if (selectedValues.length === 1) {
      const option = options.find((opt) => opt.value === selectedValues[0]);
      return option?.label || placeholder;
    }
    return `${selectedValues.length} selected`;
  }, [field.value, options, placeholder]);

  const hasValue = isFloating ? true : (Array.isArray(field.value) && field.value.length > 0);

  return (
    <FormItem name={name} className={className}>
      {isFloating ? (
        <div className="relative">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                disabled={disabled}
                className={cn(
                  selectButtonClasses,
                  error && "border-destructive focus-visible:ring-destructive/20",
                  !field.value || (Array.isArray(field.value) && field.value.length === 0)
                    ? "text-muted-foreground"
                    : ""
                )}
              >
                <span className="text-sm py-0.5 truncate flex-1 min-w-0 flex items-center justify-between">
                  {getDisplayLabel()}            
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width) max-h-60" align="start">
              {options.length === 0 ? (
                <div className="px-2 py-6 text-center text-sm text-muted-foreground">
                  No options available
                </div>
              ) : (
                <>
                  {options.map((option) => {
                    const selected = isSelected(option.value);
                    const itemDisabled = option.disabled || (!selected && isMaxReached());

                    return (
                      <DropdownMenuCheckboxItem
                        key={option.value}
                        checked={selected}
                        onCheckedChange={(checked) => {
                          if (!itemDisabled) {
                            handleMultiSelectChange(option.value, checked);
                          }
                        }}
                        disabled={itemDisabled}
                        onSelect={(e) => e.preventDefault()}
                      >
                        {option.label}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
                  {maxSelect && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">
                        {Array.isArray(field.value) ? field.value.length : 0} / {maxSelect} selected
                      </DropdownMenuLabel>
                    </>
                  )}
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {label && (
            <FormLabel
              required={required}
              className={`absolute rounded-3xl left-3 ${getThemeClasses("bg-white","bg-gray-950", currentTheme)} px-1 font-medium transition-all duration-200 pointer-events-none ${
                hasValue
                  ? `-top-2.5 text-xs ${currentTheme === "dark" ? "text-gray-100" : "text-gray-900"}`
                  : `top-1/2 -translate-y-1/2 text-sm ${currentTheme === "dark" ? "text-gray-300" : "text-gray-900"} peer-focus:-top-2.5 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:${currentTheme === "dark" ? "text-gray-100" : "text-gray-900"}`
              }`}
            >
              {label}
            </FormLabel>
          )}
        </div>
      ) : (
        <>
          {label && <FormLabel required={required}>{label}</FormLabel>}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                disabled={disabled}
                className={cn(
                  selectButtonClasses,
                  error && "border-destructive focus-visible:ring-destructive/20",
                  !field.value || (Array.isArray(field.value) && field.value.length === 0)
                    ? "text-muted-foreground"
                    : ""
                )}
              >
                <span className="text-sm truncate flex-1 min-w-0">{getDisplayLabel()}</span>
                <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width) max-h-60" align="start">
              {options.length === 0 ? (
                <div className="px-2 py-6 text-center text-sm text-muted-foreground">
                  No options available
                </div>
              ) : (
                <>
                  {options.map((option) => {
                    const selected = isSelected(option.value);
                    const itemDisabled = option.disabled || (!selected && isMaxReached());

                    return (
                      <DropdownMenuCheckboxItem
                        key={option.value}
                        checked={selected}
                        onCheckedChange={(checked) => {
                          if (!itemDisabled) {
                            handleMultiSelectChange(option.value, checked);
                          }
                        }}
                        disabled={itemDisabled}
                        onSelect={(e) => e.preventDefault()}
                      >
                        {option.label}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
                  {maxSelect && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">
                        {Array.isArray(field.value) ? field.value.length : 0} / {maxSelect} selected
                      </DropdownMenuLabel>
                    </>
                  )}
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )}

      {helperText && !error && (
        <FormDescription>{helperText}</FormDescription>
      )}
      <FormMessage />
    </FormItem>
  );
}
