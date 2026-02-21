"use client";

import { ReactNode } from "react";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { CheckboxGroup, Checkbox } from "@heroui/react";
import { FormItem } from "./FormItem";
import { FormMessage } from "./FormMessage";

/**
 * Option type for checkbox group
 */
export interface CheckboxOption {
  label: ReactNode;
  value: string | number;
  disabled?: boolean;
}

/**
 * RHFCheckboxGroup Component
 * A group of checkboxes integrated with React Hook Form using HeroUI CheckboxGroup
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
  /** Label text or JSX element displayed above the checkbox group */
  label?: ReactNode;
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
  /** Orientation of the checkbox group */
  orientation?: "vertical" | "horizontal";
  /** Checkbox group color theme */
  color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
  /** Checkbox group size */
  size?: "sm" | "md" | "lg";
  /** Checkbox radius */
  radius?: "none" | "sm" | "md" | "lg" | "full";
  /** Show line through when checked */
  lineThrough?: boolean;
  /** Optional side effect callback when value changes (field.onChange is handled internally) */
  onChangeSideEffect?: (values: string[]) => void;
}

export default function RHFCheckboxGroup<T extends FieldValues>({
  name,
  label,
  options,
  helperText,
  required = false,
  disabled = false,
  className,
  orientation = "vertical",
  color = "primary",
  size = "md",
  radius,
  lineThrough = false,
  onChangeSideEffect,
}: RHFCheckboxGroupProps<T>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const hasError = !!error;
        const selectedValues: string[] = Array.isArray(field.value)
          ? field.value.map(String)
          : [];

        return (
          <FormItem name={name} className={className}>
            <CheckboxGroup
              label={label}
              value={selectedValues}
              onValueChange={(values) => {
                field.onChange(values);
                onChangeSideEffect?.(values);
              }}
              orientation={orientation}
              color={color}
              size={size}
              radius={radius}
              lineThrough={lineThrough}
              isDisabled={disabled}
              isRequired={required}
              isInvalid={hasError}
              description={helperText && !error ? helperText : undefined}
              errorMessage={error?.message}
              name={field.name}
              onBlur={field.onBlur}
            >
              {options.map((option) => (
                <Checkbox
                  key={option.value}
                  value={String(option.value)}
                  isDisabled={option.disabled}
                >
                  {option.label}
                </Checkbox>
              ))}
            </CheckboxGroup>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
