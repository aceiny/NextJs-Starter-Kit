"use client";
import { Controller, FieldValues, useFormContext } from "react-hook-form";
import { TimeInput } from "@heroui/react";
import {
  RHF_BASE_DEFAULTS,
  RHF_DATE_LIKE_DEFAULTS,
} from "../../../config/rhf/rhf-date-defaults.config";
import { RHFDateLikeFieldProps } from "@/types/shared/interface/rhf-date-base.interface";

interface RHFTimeInputProps<
  T extends FieldValues,
> extends RHFDateLikeFieldProps<T> {
  granularity?: "hour" | "minute" | "second";
}

export default function RHFTimeInput<T extends FieldValues>({
  name,
  disabled = RHF_BASE_DEFAULTS.disabled,
  className,
  label,
  description,
  minValue,
  maxValue,
  placeholderValue,
  errorMessage,
  isInvalid = RHF_BASE_DEFAULTS.isInvalid,
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
  hourCycle = RHF_DATE_LIKE_DEFAULTS.hourCycle,
  granularity = "minute",
  hideTimeZone = RHF_DATE_LIKE_DEFAULTS.hideTimeZone,
  shouldForceLeadingZeros = RHF_DATE_LIKE_DEFAULTS.shouldForceLeadingZeros,
  validate,
  validationBehavior = RHF_DATE_LIKE_DEFAULTS.validationBehavior,
  disableAnimation = RHF_BASE_DEFAULTS.disableAnimation,
  classNames,
  onChangeSideEffect,
}: RHFTimeInputProps<T>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TimeInput
          value={field.value || null}
          onChange={(v: any) => {
            field.onChange(v);
            onChangeSideEffect?.(v);
          }}
          isDisabled={disabled}
          className={className}
          label={label}
          description={description}
          minValue={minValue}
          maxValue={maxValue}
          placeholderValue={placeholderValue}
          errorMessage={errorMessage}
          isInvalid={isInvalid}
          isRequired={isRequired}
          isReadOnly={isReadOnly}
          variant={variant}
          color={color}
          size={size}
          radius={radius}
          labelPlacement={labelPlacement}
          startContent={startContent}
          endContent={endContent}
          autoFocus={autoFocus}
          hourCycle={hourCycle}
          granularity={granularity}
          hideTimeZone={hideTimeZone}
          shouldForceLeadingZeros={shouldForceLeadingZeros}
          {...(validate && { validate })}
          {...(validationBehavior && { validationBehavior })}
          disableAnimation={disableAnimation}
          classNames={classNames}
        />
      )}
    />
  );
}
