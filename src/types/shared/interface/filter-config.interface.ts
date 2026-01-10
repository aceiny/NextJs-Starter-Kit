import { ReactNode } from "react";

/**
 * Supported filter input types - maps to form component types
 */
export type FilterType =
  | "text"
  | "email"
  | "number"
  | "phone"
  | "date"
  | "datetime-local"
  | "textarea"
  | "select"
  | "multiselect"
  | "checkbox"
  | "radio"
  | "checkbox-group"
  | "radio-group";

/**
 * Option for select, radio, checkbox-group fields
 */
export interface FilterOption {
  label: string;
  value: string | number;
  disabled?: boolean;
  description?: string;
}

/**
 * Configuration for a single filter field
 */
export interface FilterConfig {
  /** Display name/label for the filter */
  name: string;

  /** URL parameter name for this filter */
  param: string;

  /** Type of filter input */
  type: FilterType;

  /** Placeholder text for input fields */
  placeholder?: string;

  /** Options for select, radio, checkbox, etc. */
  options?: FilterOption[];

  /** Helper text shown below the field */
  helperText?: string;

  /** Icon to display next to filter name (in tab mode) */
  icon?: ReactNode;

  /** Whether the filter is required */
  required?: boolean;

  /** Whether the filter is disabled */
  disabled?: boolean;

  /** Minimum value (for number/date inputs) */
  min?: number | string;

  /** Maximum value (for number/date inputs) */
  max?: number | string;

  /** Step value (for number inputs) */
  step?: number;

  /** Default value for the filter */
  defaultValue?: any;

  /** Custom validation function */
  validate?: (value: any) => boolean | string;
}

/**
 * Configuration for the entire filter system
 */
export interface FiltersConfig {
  title?: string;
  /** Array of filter configurations */
  filters: FilterConfig[];

  /** Whether to show reset button */
  showReset?: boolean;

  /** Custom reset button text */
  resetButtonText?: string;

  /** Whether to show apply button (mainly for dropdown mode) */
  showApplyButton?: boolean;

  /** Custom apply button text */
  applyButtonText?: string;

  /** Callback when filters are applied */
  onApply?: (filters: Record<string, any>) => void;

  /** Callback when filters are reset */
  onReset?: () => void;
}
