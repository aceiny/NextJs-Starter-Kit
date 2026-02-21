"use client";

import { ReactNode } from "react";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { Checkbox } from "@heroui/react";
import { FormItem } from "./FormItem";
import { FormDescription } from "./FormDescription";
import { FormMessage } from "./FormMessage";

/**
 * RHFCheckbox Component
 * A single checkbox component integrated with React Hook Form using HeroUI Checkbox
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
  /** Label text or JSX element displayed next to the checkbox */
  label?: ReactNode;
  /** Helper text displayed below the checkbox */
  helperText?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Whether the field is disabled */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Checkbox size */
  size?: "sm" | "md" | "lg";
  /** Checkbox color theme */
  color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
  /** Checkbox radius */
  radius?: "none" | "sm" | "md" | "lg" | "full";
  /** Show line through when checked */
  lineThrough?: boolean;
  /** Optional side effect callback when value changes (field.onChange is handled internally) */
  onChangeSideEffect?: (checked: boolean) => void;
}

export default function RHFCheckbox<T extends FieldValues>({
  name,
  label,
  helperText,
  required = false,
  disabled = false,
  className,
  size = "md",
  color = "primary",
  radius,
  lineThrough = false,
  onChangeSideEffect,
}: RHFCheckboxProps<T>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const hasError = !!error;

        return (
          <FormItem name={name} className={className}>
            <Checkbox
              isSelected={!!field.value}
              onValueChange={(checked) => {
                field.onChange(checked);
                onChangeSideEffect?.(checked);
              }}
              isDisabled={disabled}
              isRequired={required}
              isInvalid={hasError}
              size={size}
              color={color}
              radius={radius}
              lineThrough={lineThrough}
              name={field.name}
              onBlur={field.onBlur}
            >
              {label}
            </Checkbox>
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
