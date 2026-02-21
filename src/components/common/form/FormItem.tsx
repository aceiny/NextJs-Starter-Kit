"use client";

import * as React from "react";

/**
 * FormFieldContext provides field state information to child components
 * Used internally by FormItem to pass down field name and ID
 */
type FormFieldContextValue = {
  name: string;
  id: string;
};

const FormFieldContext = React.createContext<FormFieldContextValue | null>(
  null,
);

/**
 * Hook to access form field context
 * Throws error if used outside FormItem
 */
export const useFormField = () => {
  const context = React.useContext(FormFieldContext);
  if (!context) {
    throw new Error("useFormField must be used within FormItem");
  }
  return context;
};

/**
 * FormItem component that provides context for a single form field
 * Automatically generates unique IDs for ARIA attributes
 *
 * @example
 * ```tsx
 * <FormItem name="email">
 *   <FormLabel>Email</FormLabel>
 *   <FormControl>
 *     <input type="email" />
 *   </FormControl>
 *   <FormDescription>Enter your email address</FormDescription>
 *   <FormMessage />
 * </FormItem>
 * ```
 */
interface FormItemProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  children: React.ReactNode;
}

export function FormItem({
  name,
  children,
  className,
  ...props
}: FormItemProps) {
  const id = React.useId();

  return (
    <FormFieldContext.Provider value={{ name, id }}>
      <div className={`space-y-2 ${className || ""}`} {...props}>
        {children}
      </div>
    </FormFieldContext.Provider>
  );
}
