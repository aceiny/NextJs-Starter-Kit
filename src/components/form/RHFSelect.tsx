"use client";

import * as React from "react";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { FormItem } from "./FormItem";
import { FormLabel } from "./FormLabel";
import { FormDescription } from "./FormDescription";
import { FormMessage } from "./FormMessage";
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
  onChangeSideEffect,
}: RHFSelectProps<T>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        // If multi-select mode, use custom dropdown with checkboxes
        if (isMulti) {
          return <MultiSelectDropdown 
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
          />;
        }

        // Single select mode using shadcn Select
        return (
          <FormItem name={name} className={className}>
            {label && <FormLabel required={required}>{label}</FormLabel>}
            
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
              <SelectTrigger className={cn(error && "border-destructive focus-visible:ring-destructive/20")}>
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
}: MultiSelectDropdownProps<T>) {
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

  return (
    <FormItem name={name} className={className}>
      {label && <FormLabel required={required}>{label}</FormLabel>}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            disabled={disabled}
            className={cn(
              "border-input data-[placeholder]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 dark:bg-input/30 dark:hover:bg-input/50 flex h-9 w-full items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
              error && "border-destructive focus-visible:ring-destructive/20",
              !field.value || (Array.isArray(field.value) && field.value.length === 0)
                ? "text-muted-foreground"
                : ""
            )}
          >
            <span className="text-sm truncate">{getDisplayLabel()}</span>
            <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] max-h-60" align="start">
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

      {helperText && !error && (
        <FormDescription>{helperText}</FormDescription>
      )}
      <FormMessage />
    </FormItem>
  );
}
