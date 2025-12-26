"use client";

import * as React from "react";
import { useFormContext } from "react-hook-form";
import { useFormField } from "./FormItem";

/**
 * FormControl component that wraps form inputs
 * Automatically adds ARIA attributes for accessibility
 * Connects input with error messages and descriptions
 *
 * @example
 * ```tsx
 * <FormControl>
 *   <input type="text" placeholder="Enter value" />
 * </FormControl>
 * ```
 */
interface FormControlProps {
  children: React.ReactElement;
}

export function FormControl({ children }: FormControlProps) {
  const { formState } = useFormContext();
  const { id, name } = useFormField();

  const error = formState.errors[name];
  const hasError = !!error;

  // Clone the child element and add necessary props
  const childProps = {
    id: `${id}-${name}`,
    name: name,
    "aria-invalid": hasError,
    "aria-describedby": hasError
      ? `${id}-${name}-error`
      : `${id}-${name}-description`,
  };

  return React.cloneElement(children, childProps as any);
}
