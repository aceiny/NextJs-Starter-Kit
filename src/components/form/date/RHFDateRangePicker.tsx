"use client";

import * as React from "react";
import { Controller, FieldValues, useFormContext } from "react-hook-form";
import { DateRangePicker } from "@heroui/react";
import {
  RHF_BASE_DEFAULTS,
  RHF_DATE_LIKE_DEFAULTS,
} from "../../../config/rhf/rhf-date-defaults.config";
import { RHFDateLikeFieldProps } from "@/types/shared/interface/rhf-date-base.interface";

interface RHFDateRangePickerProps<
  T extends FieldValues,
> extends RHFDateLikeFieldProps<T> {
  showMonthAndYearPickers?: boolean;
  visibleMonths?: number;
  firstDayOfWeek?: "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat";
  selectorIcon?: React.ReactNode;
  selectorButtonPlacement?: "start" | "end";
  granularity?: "day" | "hour" | "minute" | "second";
  CalendarTopContent?: React.ReactNode;
  CalendarBottomContent?: React.ReactNode;
  popoverProps?: any;
  selectorButtonProps?: any;
  calendarProps?: any;
  timeInputProps?: any;
  isDateUnavailable?: (date: any) => boolean;
  pageBehavior?: "visible" | "single";
  calendarWidth?: number;
  allowsNonContiguousRanges?: boolean;
  isOpen?: boolean;
  defaultOpen?: boolean;
  startName?: string;
  endName?: string;
}

export default function RHFDateRangePicker<T extends FieldValues>({
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
  showMonthAndYearPickers,
  visibleMonths,
  firstDayOfWeek,
  selectorIcon,
  selectorButtonPlacement,
  autoFocus = RHF_BASE_DEFAULTS.autoFocus,
  hourCycle = RHF_DATE_LIKE_DEFAULTS.hourCycle,
  granularity,
  hideTimeZone = RHF_DATE_LIKE_DEFAULTS.hideTimeZone,
  shouldForceLeadingZeros = RHF_DATE_LIKE_DEFAULTS.shouldForceLeadingZeros,
  validate,
  validationBehavior = RHF_DATE_LIKE_DEFAULTS.validationBehavior,
  CalendarTopContent,
  CalendarBottomContent,
  popoverProps,
  selectorButtonProps,
  calendarProps,
  timeInputProps,
  disableAnimation = RHF_BASE_DEFAULTS.disableAnimation,
  classNames,
  isDateUnavailable,
  pageBehavior,
  calendarWidth,
  allowsNonContiguousRanges,
  isOpen,
  defaultOpen,
  startName,
  endName,
  onChangeSideEffect,
}: RHFDateRangePickerProps<T>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <DateRangePicker
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
          showMonthAndYearPickers={showMonthAndYearPickers}
          visibleMonths={visibleMonths}
          firstDayOfWeek={firstDayOfWeek}
          selectorIcon={selectorIcon}
          selectorButtonPlacement={selectorButtonPlacement}
          autoFocus={autoFocus}
          hourCycle={hourCycle}
          granularity={granularity}
          hideTimeZone={hideTimeZone}
          shouldForceLeadingZeros={shouldForceLeadingZeros}
          {...(validate && { validate })}
          {...(validationBehavior && { validationBehavior })}
          CalendarTopContent={CalendarTopContent}
          CalendarBottomContent={CalendarBottomContent}
          popoverProps={popoverProps}
          selectorButtonProps={selectorButtonProps}
          calendarProps={calendarProps}
          timeInputProps={timeInputProps}
          disableAnimation={disableAnimation}
          classNames={classNames}
          isDateUnavailable={isDateUnavailable}
          pageBehavior={pageBehavior}
          calendarWidth={calendarWidth}
          allowsNonContiguousRanges={allowsNonContiguousRanges}
          isOpen={isOpen}
          defaultOpen={defaultOpen}
          startName={startName}
          endName={endName}
        />
      )}
    />
  );
}
