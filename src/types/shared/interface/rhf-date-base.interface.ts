// Shared base props for all RHF HeroUI components
import * as React from "react";
import { FieldValues, Path } from "react-hook-form";

// Props that are common to all HeroUI form components
export interface RHFBaseFieldProps<T extends FieldValues = FieldValues> {
  name: Path<T>;
  disabled?: boolean;
  className?: string;
  label?: React.ReactNode;
  description?: React.ReactNode;
  errorMessage?: React.ReactNode | ((v: any) => React.ReactNode);
  isInvalid?: boolean;
  isRequired?: boolean;
  isReadOnly?: boolean;
  variant?: "flat" | "bordered" | "faded" | "underlined";
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  size?: "sm" | "md" | "lg";
  radius?: "none" | "sm" | "md" | "lg" | "full";
  labelPlacement?: "inside" | "outside" | "outside-left" | "outside-top";
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  autoFocus?: boolean;
  disableAnimation?: boolean;
  classNames?: any;
  onChangeSideEffect?: (value: any) => void;
}

// Props that are common to all date/time HeroUI components
export interface RHFDateLikeFieldProps<
  T extends FieldValues = FieldValues,
> extends RHFBaseFieldProps<T> {
  minValue?: any;
  maxValue?: any;
  placeholderValue?: any;
  hourCycle?: 12 | 24;
  hideTimeZone?: boolean;
  shouldForceLeadingZeros?: boolean;
  validate?: (value: any) => any;
  validationBehavior?: "native" | "aria";
}
