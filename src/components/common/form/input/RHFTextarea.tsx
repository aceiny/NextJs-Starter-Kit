"use client";
import { Controller, FieldValues } from "react-hook-form";
import { Textarea } from "@heroui/react";
import { RHF_BASE_DEFAULTS } from "@/config/rhf/rhf-date-defaults.config";
import { RHFBaseFieldProps } from "@/types/shared/interface/rhf-date-base.interface";

interface RHFTextareaProps<T extends FieldValues> extends RHFBaseFieldProps<T> {
  placeholder?: string;
  isClearable?: boolean;
  fullWidth?: boolean;
  minRows?: number;
  maxRows?: number;
  disableAutosize?: boolean;
  minLength?: number;
  maxLength?: number;
  onClear?: () => void;
  onValueChange?: (value: string) => void;
  onHeightChange?: (height: number, meta: { rowHeight: number }) => void;
}

export default function RHFTextarea<T extends FieldValues>({
  name,
  disabled = RHF_BASE_DEFAULTS.disabled,
  className = RHF_BASE_DEFAULTS.className,
  label,
  description,
  errorMessage,
  isInvalid,
  isRequired = RHF_BASE_DEFAULTS.isRequired,
  isReadOnly = RHF_BASE_DEFAULTS.isReadOnly,
  variant = RHF_BASE_DEFAULTS.variant,
  color = RHF_BASE_DEFAULTS.color,
  size = RHF_BASE_DEFAULTS.size,
  radius = RHF_BASE_DEFAULTS.radius,
  labelPlacement = RHF_BASE_DEFAULTS.labelPlacement,
  startContent,
  endContent,
  autoFocus = RHF_BASE_DEFAULTS.autoFocus,
  disableAnimation = RHF_BASE_DEFAULTS.disableAnimation,
  classNames,
  onChangeSideEffect,
  placeholder,
  isClearable = false,
  fullWidth = true,
  minRows,
  maxRows,
  disableAutosize,
  minLength,
  maxLength,
  onClear,
  onValueChange,
  onHeightChange,
}: RHFTextareaProps<T>) {
  return (
    <Controller
      name={name}
      render={({ field, fieldState }) => (
        <Textarea
          {...field}
          value={field.value || ""}
          label={label}
          placeholder={placeholder}
          description={description}
          errorMessage={errorMessage || fieldState.error?.message}
          isInvalid={isInvalid ?? !!fieldState.error}
          isRequired={isRequired}
          isReadOnly={isReadOnly}
          isDisabled={disabled}
          variant={variant}
          color={color}
          size={size}
          radius={radius}
          labelPlacement={labelPlacement}
          startContent={startContent}
          endContent={endContent}
          autoFocus={autoFocus}
          disableAnimation={disableAnimation}
          classNames={classNames}
          className={className}
          isClearable={isClearable}
          fullWidth={fullWidth}
          {...(minRows !== undefined && { minRows })}
          {...(maxRows !== undefined && { maxRows })}
          {...(disableAutosize !== undefined && { disableAutosize })}
          {...(minLength && { minLength })}
          {...(maxLength && { maxLength })}
          {...(isClearable && {
            onClear: () => {
              field.onChange("");
              onClear?.();
            },
          })}
          onValueChange={(value) => {
            field.onChange(value);
            onValueChange?.(value);
            onChangeSideEffect?.(value);
          }}
          onHeightChange={onHeightChange}
        />
      )}
    />
  );
}
