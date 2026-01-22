"use client";
import { Controller, FieldValues } from "react-hook-form";
import { Input, NumberInput } from "@heroui/react";
import { RHF_BASE_DEFAULTS } from "@/config/rhf/rhf-date-defaults.config";
import { RHFBaseFieldProps } from "@/types/shared/interface/rhf-date-base.interface";

interface RHFInputProps<T extends FieldValues> extends RHFBaseFieldProps<T> {
  /** Input type */
  type?: "text" | "email" | "password" | "search" | "tel" | "url" | "number";
  /** Placeholder text when input is empty */
  placeholder?: string;
  /** Whether the input should have a clear button */
  isClearable?: boolean;
  /** Whether the input should take full width */
  fullWidth?: boolean;
  /** Minimum character length (for text inputs) */
  minLength?: number;
  /** Maximum character length (for text inputs) */
  maxLength?: number;
  /** Pattern for validation (regex) */
  pattern?: string;
  /** Callback when the clear button is clicked */
  onClear?: () => void;
  /** Callback when the input value changes */
  onValueChange?: (value: string | number) => void;
  /** Show password visibility toggle button (for password type) */
  showPasswordToggle?: boolean;

  // NumberInput specific props
  /** Minimum value (for number inputs) */
  minValue?: number;
  /** Maximum value (for number inputs) */
  maxValue?: number;
  /** Step value for number inputs */
  step?: number;
  /** Format options for number inputs */
  formatOptions?: Intl.NumberFormatOptions;
  /** Hide stepper buttons for number inputs */
  hideStepper?: boolean;
  /** Disable wheel scroll for number inputs */
  isWheelDisabled?: boolean;
}

export default function RHFInput<T extends FieldValues>({
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
  type = "text",
  placeholder,
  isClearable = false,
  fullWidth = true,
  minLength,
  maxLength,
  pattern,
  onClear,
  onValueChange,
  minValue,
  maxValue,
  step,
  formatOptions,
  hideStepper,
  isWheelDisabled,
}: RHFInputProps<T>) {
  //   const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  //   const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);

  return (
    <Controller
      name={name}
      render={({ field, fieldState }) => {
        // Use NumberInput for number type
        if (type === "number") {
          return (
            <NumberInput
              {...field}
              value={field.value ?? undefined}
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
              {...(minValue !== undefined && { minValue })}
              {...(maxValue !== undefined && { maxValue })}
              {...(step !== undefined && { step })}
              {...(formatOptions && { formatOptions })}
              {...(hideStepper !== undefined && { hideStepper })}
              {...(isWheelDisabled !== undefined && { isWheelDisabled })}
              {...(isClearable && {
                onClear: () => {
                  field.onChange(undefined);
                  onClear?.();
                },
              })}
              onValueChange={(value) => {
                field.onChange(value);
                onValueChange?.(value);
                onChangeSideEffect?.(value);
              }}
            />
          );
        }

        // Use regular Input for all other types
        return (
          <Input
            {...field}
            value={field.value || undefined}
            type={type}
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
            {...(minLength && { minLength })}
            {...(maxLength && { maxLength })}
            {...(pattern && { pattern })}
            {...(isClearable && {
              onClear: () => {
                field.onChange("");
                onClear?.();
              },
            })}
            onValueChange={(value) => {
              onValueChange?.(value);
              onChangeSideEffect?.(value);
            }}
            onChange={(e) => {
              field.onChange(e);
              onChangeSideEffect?.(e.target.value);
            }}
          />
        );
      }}
    />
  );
}
