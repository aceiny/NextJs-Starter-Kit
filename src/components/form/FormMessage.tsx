"use client";

import * as React from "react";
import { useFormContext } from "react-hook-form";
import { useFormField } from "./FormItem";

/**
 * FormMessage component for displaying validation errors
 * Automatically shows error messages from React Hook Form
 * Linked to form control via aria-describedby
 * Supports dark mode
 *
 * @example
 * ```tsx
 * <FormMessage />
 * ```
 */
interface FormMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children?: React.ReactNode;
}

export function FormMessage({
  children,
  className,
  ...props
}: FormMessageProps) {
  const { formState } = useFormContext();
  const { id, name } = useFormField();

  const error = formState.errors[name];
  const errorMessage = error?.message as string | undefined;

  const body = errorMessage || children;

  if (!body) {
    return null;
  }

  return (
    <p
      id={`${id}-${name}-error`}
      className={`text-sm font-medium text-red-500 dark:text-red-400 ${className || ""}`}
      {...props}
    >
      {body}
    </p>
  );
}
