"use client";

import * as React from "react";
import { FormProvider, UseFormReturn, FieldValues } from "react-hook-form";

/**
 * Form component that wraps React Hook Form's FormProvider
 * Provides form context to all child components
 *
 * @example
 * ```tsx
 * const form = useForm<FormData>({...})
 *
 * <Form form={form} onSubmit={(data) => console.log(data)}>
 *   <Field.Input name="email" type="email" label="Email" />
 *   <button type="submit">Submit</button>
 * </Form>
 * ```
 */
interface FormProps<T extends FieldValues> extends Omit<
  React.FormHTMLAttributes<HTMLFormElement>,
  "onSubmit"
> {
  form: UseFormReturn<T>;
  onSubmit: (data: T) => void | Promise<void>;
  children: React.ReactNode;
}

export function Form<T extends FieldValues>({
  form,
  onSubmit,
  children,
  ...props
}: FormProps<T>) {
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} {...props}>
        {children}
      </form>
    </FormProvider>
  );
}
