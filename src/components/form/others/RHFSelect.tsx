"use client";
import * as React from "react";
import { Controller, FieldValues } from "react-hook-form";
import {
  Select,
  SelectItem,
  SelectSection,
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
  children?: React.ReactNode;
}

export interface SelectSectionType {
  key: string;
  title: string;
  items: SelectOption[];
  classNames?: any;
  showDivider?: boolean;
}

interface RHFSelectProps<T extends FieldValues> extends Omit<
  RHFBaseFieldProps<T>,
  "isReadOnly"
> {
  // Options - one of these is required
  options?: SelectOption[];
  sections?: SelectSectionType[];

  // Selection props
  selectionMode?: "single" | "multiple";
  disabledKeys?: Iterable<React.Key>;
  disallowEmptySelection?: boolean;

  // Display props
  placeholder?: string;
  selectorIcon?: React.ReactNode;
  disableSelectorIconRotation?: boolean;

  // State props
  isOpen?: boolean;
  defaultOpen?: boolean;
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
  renderValue?: (items: any) => React.ReactNode;

  // Event handlers
  onClose?: () => void;
  onOpenChange?: (isOpen: boolean) => void;
  onSelectionChange?: (keys: any) => void;
  onClear?: () => void;
}

export default function RHFSelect<T extends FieldValues>({
  // RHFBaseFieldProps
  name,
  disabled = RHF_BASE_DEFAULTS.disabled,
  className = RHF_BASE_DEFAULTS.className,
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
  onChangeSideEffect,

  // Select-specific props
  options = [],
  sections,
  selectionMode = "single",
  disabledKeys,
  disallowEmptySelection = false,
  placeholder = "Select an option",
  selectorIcon,
  disableSelectorIconRotation = false,
  isOpen,
  defaultOpen,
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
}: RHFSelectProps<T>) {
  return (
    <Controller
      name={name}
      render={({ field, fieldState }) => {
        // Convert field value to selectedKeys format
        const selectedKeys = React.useMemo(() => {
          const value = field.value;
          if (value === undefined || value === null || value === "") {
            return new Set<React.Key>();
          }

          if (selectionMode === "multiple") {
            return Array.isArray(value)
              ? new Set<React.Key>(value)
              : new Set<React.Key>();
          } else {
            return new Set<React.Key>([value]);
          }
        }, [field.value]);

        // Handle selection change
        const handleSelectionChange = (keys: any) => {
          let newValue;

          if (selectionMode === "multiple") {
            // Convert Set to Array for multiple selection
            newValue = keys === "all" ? [] : Array.from(keys);
          } else {
            // Convert Set to single value for single selection
            newValue = keys === "all" ? null : Array.from(keys)[0] || null;
          }

          field.onChange(newValue);
          onSelectionChange?.(keys);
          onChangeSideEffect?.(newValue);
        };

        const selectProps = {
          selectedKeys: selectedKeys as any,
          onSelectionChange: handleSelectionChange,
          onBlur: field.onBlur,

          // Display props
          label,
          placeholder,
          variant,
          color,
          size,
          radius,
          labelPlacement,
          description,
          errorMessage: errorMessage || fieldState.error?.message,
          startContent,
          endContent,
          selectorIcon,
          disableSelectorIconRotation,

          // State props
          isOpen,
          defaultOpen,
          isRequired,
          isDisabled: disabled,
          isMultiline,
          isInvalid: isInvalid ?? !!fieldState.error,
          isClearable,
          validationState,
          hideEmptyContent,
          fullWidth,
          autoFocus,
          disableAnimation,
          isLoading,

          // Virtualization props
          isVirtualized,
          maxListboxHeight,
          itemHeight,

          // Scroll props
          showScrollIndicators,
          scrollRef,
          spinnerRef,
          scrollShadowProps,

          // Nested component props
          popoverProps,
          listboxProps,

          // Styling
          classNames,
          className,

          // Selection props
          selectionMode,
          ...(disabledKeys && { disabledKeys: disabledKeys as Iterable<any> }),
          disallowEmptySelection,

          // Render customization
          renderValue,

          // Event handlers
          onClose,
          onOpenChange,
          ...(isClearable && {
            onClear: () => {
              const emptyValue = selectionMode === "multiple" ? [] : null;
              field.onChange(emptyValue);
              onClear?.();
              onChangeSideEffect?.(emptyValue);
            },
          }),
        };

        // Render with sections if provided
        if (sections && sections.length > 0) {
          return (
            <Select {...selectProps}>
              {sections.map((section) => (
                <SelectSection
                  key={section.key}
                  title={section.title}
                  classNames={section.classNames}
                  showDivider={section.showDivider}
                >
                  {section.items.map((item) => (
                    <SelectItem
                      key={item.key}
                      textValue={item.textValue || item.label}
                      description={item.description}
                      startContent={item.startContent}
                      endContent={item.endContent}
                      classNames={item.classNames}
                    >
                      {item.children || item.label}
                    </SelectItem>
                  ))}
                </SelectSection>
              ))}
            </Select>
          );
        }

        // Render with flat options
        return (
          <Select {...selectProps}>
            {options.map((item) => (
              <SelectItem
                key={item.key}
                textValue={item.textValue || item.label}
                description={item.description}
                startContent={item.startContent}
                endContent={item.endContent}
                classNames={item.classNames}
              >
                {item.children || item.label}
              </SelectItem>
            ))}
          </Select>
        );
      }}
    />
  );
}
