"use client";
import { Controller, FieldValues } from "react-hook-form";
import { InputOtp } from "@heroui/react";
import { RHF_BASE_DEFAULTS } from "@/config/rhf/rhf-date-defaults.config";
import { RHFBaseFieldProps } from "@/types/shared/interface/rhf-date-base.interface";

interface RHFOtpProps<T extends FieldValues> extends RHFBaseFieldProps<T> {
  length?: number;
  allowedKeys?: string;
  variant?: "flat" | "bordered" | "faded" | "underlined";
  color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
  size?: "sm" | "md" | "lg";
  radius?: "none" | "sm" | "md" | "lg" | "full";
  description?: React.ReactNode;
  errorMessage?: React.ReactNode;
  fullWidth?: boolean;
  isRequired?: boolean;
  isReadOnly?: boolean;
  isDisabled?: boolean;
  isInvalid?: boolean;
  autoFocus?: boolean;
  disableAnimation?: boolean;
  classNames?: any;
  textAlign?: "left" | "center" | "right";
  pushPasswordManagerStrategy?: "none" | "increase-width" | undefined;
  pasteTransformer?: (text: string) => string;
  containerClassName?: string;
  noScriptCSSFallback?: string;
  onValueChange?: (value: string) => void;
  onComplete?: (value: string) => void;
}

export default function RHFOtp<T extends FieldValues>({
  name,
  length = 6,
  label,
  labelPlacement,
  allowedKeys = "^[0-9]*$",
  variant = RHF_BASE_DEFAULTS.variant,
  color = RHF_BASE_DEFAULTS.color,
  size = RHF_BASE_DEFAULTS.size,
  radius = RHF_BASE_DEFAULTS.radius,
  description,
  errorMessage,
  fullWidth = true,
  isRequired = RHF_BASE_DEFAULTS.isRequired,
  isReadOnly = RHF_BASE_DEFAULTS.isReadOnly,
  isDisabled = RHF_BASE_DEFAULTS.disabled,
  isInvalid,
  autoFocus = RHF_BASE_DEFAULTS.autoFocus,
  disableAnimation = RHF_BASE_DEFAULTS.disableAnimation,
  classNames,
  textAlign,
  pushPasswordManagerStrategy,
  pasteTransformer,
  containerClassName,
  noScriptCSSFallback,
  onValueChange,
  onComplete,
}: RHFOtpProps<T>) {
  return (
    <Controller
      name={name}
      render={({ field, fieldState }) => (
        <InputOtp
          {...field}
          label={label}
          value={field.value || ""}
          length={length}
          allowedKeys={allowedKeys}
          variant={variant}
          color={color}
          size={size}
          radius={radius}
          description={description}
          errorMessage={errorMessage || fieldState.error?.message}
          fullWidth={fullWidth}
          isRequired={isRequired}
          isReadOnly={isReadOnly}
          isDisabled={isDisabled}
          isInvalid={isInvalid ?? !!fieldState.error}
          autoFocus={autoFocus}
          disableAnimation={disableAnimation}
          classNames={classNames}
          textAlign={textAlign}
          pushPasswordManagerStrategy={pushPasswordManagerStrategy}
          pasteTransformer={pasteTransformer}
          containerClassName={containerClassName}
          noScriptCSSFallback={noScriptCSSFallback}
          onValueChange={(value) => {
            field.onChange(value ?? "");
            onValueChange?.(value);
          }}
          onComplete={onComplete ? (v) => onComplete(v ?? "") : undefined}
        />
      )}
    />
  );
}
