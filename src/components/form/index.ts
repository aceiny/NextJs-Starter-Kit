/**
 * React Hook Form Component System
 *
 * A comprehensive, production-ready form component library for Next.js with TypeScript
 * Built on React Hook Form with automatic integration via Controller
 * ```
 */

// Core form components
export { Form } from "./Form";
export { FormItem } from "./FormItem";
export { FormLabel } from "./FormLabel";
export { FormControl } from "./FormControl";
export { FormDescription } from "./FormDescription";
export { FormMessage } from "./FormMessage";

// Form field components
export { default as RHFInput } from "./input/RHFInput";
export { RHFSelect } from "./others";
export { RHFCheckbox } from "./RHFCheckbox";
export { RHFCheckboxGroup } from "./RHFCheckboxGroup";
export { RHFSearchableCheckboxGroup } from "./RHFSearchableCheckboxGroup";
export { RHFRadioGroup } from "./RHFRadioGroup";
export { RHFUpload } from "./RHFUpload";

// Specialized inputs
export {
  RHFDatePicker,
  RHFDateRangePicker,
  RHFDateInput,
  RHFTimeInput,
} from "./date";

// Type exports
export type { CheckboxOption } from "./RHFCheckboxGroup";
export type { RadioOption } from "./RHFRadioGroup";

// Import field components for Field object
import { RHFSelect } from "./others";
import { RHFCheckbox } from "./RHFCheckbox";
import { RHFCheckboxGroup } from "./RHFCheckboxGroup";
import { RHFSearchableCheckboxGroup } from "./RHFSearchableCheckboxGroup";
import { RHFRadioGroup } from "./RHFRadioGroup";
import { RHFUpload } from "./RHFUpload";
import {
  RHFDatePicker,
  RHFDateRangePicker,
  RHFDateInput,
  RHFTimeInput,
} from "./date";
import { RHFInput, RHFOtp, RHFTextarea } from "./input";

/**
 * Field object - Convenient access to all form field components
 *
 * This object maps semantic names to their corresponding RHF components
 * for cleaner, more readable code.
 *
 * @example
 * ```tsx
 * // Instead of:
 * <RHFUniversalInput name="email" type="email" label="Email" />
 *
 * // Use:
 * <Field.Input name="email" type="email" label="Email" />
 * ```
 */
export const Field = {
  /**
   * HeroUI Input component (recommended)
   * Supports: text, email, password, search, tel, url, number
   * Modern, clean design with full HeroUI integration
   */
  Input: RHFInput,

  /**
   * HeroUI Textarea component
   * Supports: text, email, password, search, tel, url, number
   * Modern, clean design with full HeroUI integration
   */
  Textarea: RHFTextarea,

  /**
   * OTP (One-Time Password) input component
   * For entering verification codes, 2FA codes, etc.
   */
  Otp: RHFOtp,

  /**
   * Select component supporting single and multi-select modes
   * Multi-select can be limited with maxSelect prop
   */
  Select: RHFSelect,

  /**
   * Single checkbox component
   * For boolean values (true/false)
   */
  Checkbox: RHFCheckbox,

  /**
   * Checkbox group component
   * For selecting multiple values from a list
   */
  CheckboxGroup: RHFCheckboxGroup,

  /**
   * Searchable checkbox group component
   * For selecting multiple values from a large list with search functionality
   */
  SearchableCheckboxGroup: RHFSearchableCheckboxGroup,

  /**
   * Radio button group component
   * For selecting a single value from a list of options
   */
  RadioGroup: RHFRadioGroup,

  /**
   * File upload component
   * Supports single/multiple files, max file size, max count, and file type restrictions
   */
  Upload: RHFUpload,

  /**   * HeroUI DatePicker component
   * For selecting single dates
   */
  DatePicker: RHFDatePicker,

  /**   * HeroUI DateRangePicker component
   * For selecting date ranges
   */
  DateRangePicker: RHFDateRangePicker,

  /**   * HeroUI DateInput component
   * For entering dates via text input
   */
  DateInput: RHFDateInput,

  /**   * HeroUI TimeInput component
   * For entering times via text input
   */
  TimeInput: RHFTimeInput,
} as const;
