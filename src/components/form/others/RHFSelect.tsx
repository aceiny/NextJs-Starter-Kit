"use client";
import * as React from "react";
import { Controller, useFormContext, FieldValues } from "react-hook-form";
import {
  Select,
  SelectItem,
  PopoverProps,
  ListboxProps,
  ScrollShadowProps,
} from "@heroui/react";
import { RHFBaseFieldProps } from "@/types/shared/interface/rhf-date-base.interface";
import { RHF_BASE_DEFAULTS } from "@/config/rhf/rhf-date-defaults.config";

export interface SelectOption {
  key: string | number;
  label: string;
  value?: string | number;
  description?: string;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  textValue?: string;
  classNames?: any;
}

interface RHFSelectProps<T extends FieldValues> extends Omit<RHFBaseFieldProps<T>, 'isReadOnly'> {
  // Options - required for rendering
  options: SelectOption[];
  
  // Selection props
  selectionMode?: "single" | "multiple";
  selectedKeys?: "all" | Iterable<React.Key>;
  disabledKeys?: Iterable<React.Key>;
  defaultSelectedKeys?: "all" | Iterable<React.Key>;
  disallowEmptySelection?: boolean;
  
  // Display props
  placeholder?: string;
  selectorIcon?: React.ReactNode;
  disableSelectorIconRotation?: boolean;
  
  // State props
  isOpen?: boolean;
  defaultOpen?: boolean;
  isDisabled?: boolean;
  isMultiline?: boolean;
  isClearable?: boolean;
  validationState?: "valid" | "invalid";
  hideEmptyContent?: boolean;
  fullWidth?: boolean;
  isLoading?: boolean;
  
  // Virtualization props
  isVirtualized?: boolean;
  maxListboxHeight?: number;
  itemHeight?: number;
  
  // Scroll props
  showScrollIndicators?: boolean;
  scrollRef?: React.RefObject<HTMLElement>;
  spinnerRef?: React.RefObject<HTMLElement>;
  scrollShadowProps?: ScrollShadowProps;
  
  // Nested component props
  popoverProps?: PopoverProps;
  listboxProps?: ListboxProps;
  
  // Render customization
  renderValue?: (items: SelectOption[]) => React.ReactNode;
  
  // Event handlers
  onClose?: () => void;
  onOpenChange?: (isOpen: boolean) => void;
  onSelectionChange?: (keys: "all" | (Set<React.Key> & { anchorKey?: string; currentKey?: string })) => void;
  onClear?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function RHFSelect<T extends FieldValues>({
  // RHFBaseFieldProps
  name,
  label,
  description,
  errorMessage,
  isInvalid,
  isRequired = RHF_BASE_DEFAULTS.isRequired,
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
  className = RHF_BASE_DEFAULTS.className,
  disabled = RHF_BASE_DEFAULTS.disabled,
  onChangeSideEffect,
  
  // Select-specific props
  options,
  selectionMode = "single",
  selectedKeys,
  disabledKeys,
  defaultSelectedKeys,
  disallowEmptySelection = false,
  placeholder = "Select an option",
  selectorIcon,
  disableSelectorIconRotation = false,
  isOpen,
  defaultOpen,
  isDisabled = disabled,
  isMultiline = false,
  isClearable = false,
  validationState,
  hideEmptyContent = false,
  fullWidth = true,
  isLoading = false,
  isVirtualized,
  maxListboxHeight = 256,
  itemHeight = 32,
  showScrollIndicators = true,
  scrollRef,
  spinnerRef,
  scrollShadowProps,
  popoverProps,
  listboxProps,
  renderValue,
  onClose,
  onOpenChange,
  onSelectionChange,
  onClear,
  onChange,
}: RHFSelectProps<T>) {
  const { control } = useFormContext<T>();
  
   return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Select
          // Selection props
          selectionMode={selectionMode}
          selectedKeys={field.value ?? selectedKeys}
          disabledKeys={disabledKeys}
          defaultSelectedKeys={defaultSelectedKeys}
          disallowEmptySelection={disallowEmptySelection}
          
          // Display props from RHFBaseFieldProps
          label={label}
          placeholder={placeholder}
          variant={variant}
          color={color}
          size={size}
          radius={radius}
          labelPlacement={labelPlacement}
          description={description}
          errorMessage={errorMessage ?? error?.message}
          startContent={startContent}
          endContent={endContent}
          selectorIcon={selectorIcon}
          disableSelectorIconRotation={disableSelectorIconRotation}
          
          // State props
          isOpen={isOpen}
          defaultOpen={defaultOpen}
          isRequired={isRequired}
          isDisabled={isDisabled}
          isMultiline={isMultiline}
          isInvalid={isInvalid ?? !!error}
          isClearable={isClearable}
          validationState={validationState}
          hideEmptyContent={hideEmptyContent}
          fullWidth={fullWidth}
          autoFocus={autoFocus}
          disableAnimation={disableAnimation}
          isLoading={isLoading}
          
          // Virtualization props
          isVirtualized={isVirtualized}
          maxListboxHeight={maxListboxHeight}
          itemHeight={itemHeight}
          
          // Scroll props
          showScrollIndicators={showScrollIndicators}
          scrollRef={scrollRef}
          spinnerRef={spinnerRef}
          scrollShadowProps={scrollShadowProps}
          
          // Nested component props
          popoverProps={popoverProps}
          listboxProps={listboxProps}
          
          // Styling
          classNames={classNames}
          
          // Render customization
          renderValue={renderValue}
          
          // Event handlers
          onClose={onClose}
          onOpenChange={onOpenChange}
          onSelectionChange={(keys) => {
            field.onChange(keys);
            onSelectionChange?.(keys);
            onChangeSideEffect?.(keys);
          }}
          onClear={() => {
            field.onChange(undefined);
            onClear?.();
          }}
          onChange={onChange}
        >
          {options.map((option) => (
            <SelectItem
              key={option.key}
              textValue={option.textValue ?? option.label}
              description={option.description}
              startContent={option.startContent}
              endContent={option.endContent}
              classNames={option.classNames}
            >
              {option.label}
            </SelectItem>
          ))}
        </Select>
      )}
    />
  );
}