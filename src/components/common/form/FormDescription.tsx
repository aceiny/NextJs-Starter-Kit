"use client";

import * as React from "react";
import { useFormField } from "./FormItem";

/**
 * FormDescription component for helper text
 * Provides additional context about the form field
 * Automatically linked via aria-describedby
 * Supports dark mode
 *
 * @example
 * ```tsx
 * <FormDescription>
 *   We'll never share your email with anyone else.
 * </FormDescription>
 * ```
 */
interface FormDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export function FormDescription({
  children,
  className,
  ...props
}: FormDescriptionProps) {
  const { id, name } = useFormField();

  return (
    <p
      id={`${id}-${name}-description`}
      className={`text-sm text-gray-500 dark:text-gray-400 ${className || ""}`}
      {...props}
    >
      {children}
    </p>
  );
}
