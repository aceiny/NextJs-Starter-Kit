"use client";

import * as React from "react";
import { useFormField } from "./FormItem";

/**
 * FormLabel component for form field labels
 * Automatically associates with form control via htmlFor
 * Displays required indicator when needed
 * Supports dark mode
 *
 * @example
 * ```tsx
 * <FormLabel required>Email Address</FormLabel>
 * ```
 */
interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  children: React.ReactNode;
}

export function FormLabel({
  required,
  children,
  className,
  ...props
}: FormLabelProps) {
  const { id, name } = useFormField();

  return (
    <label
      htmlFor={`${id}-${name}`}
      className={`text-sm font-medium leading-none text-gray-900 dark:text-gray-100 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
        className || ""
      }`}
      {...props}
    >
      {children}
      {required && (
        <span className="text-red-500 dark:text-red-400 ml-1">*</span>
      )}
    </label>
  );
}
