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
export { RHFUniversalInput } from "./RHFUniversalInput";
export { RHFSelect } from "./RHFSelect";
export { RHFCheckbox } from "./RHFCheckbox";
export { RHFCheckboxGroup } from "./RHFCheckboxGroup";
export { RHFSearchableCheckboxGroup } from "./RHFSearchableCheckboxGroup";
export { RHFRadioGroup } from "./RHFRadioGroup";
export { RHFUpload } from "./RHFUpload";

// Type exports
export type { SelectOption } from "./RHFSelect";
export type { CheckboxOption } from "./RHFCheckboxGroup";
export type { RadioOption } from "./RHFRadioGroup";

// Import field components for Field object
import { RHFUniversalInput } from "./RHFUniversalInput";
import { RHFSelect } from "./RHFSelect";
import { RHFCheckbox } from "./RHFCheckbox";
import { RHFCheckboxGroup } from "./RHFCheckboxGroup";
import { RHFSearchableCheckboxGroup } from "./RHFSearchableCheckboxGroup";
import { RHFRadioGroup } from "./RHFRadioGroup";
import { RHFUpload } from "./RHFUpload";

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
   * Universal input component supporting all input types
   * Includes: text, password, email, phone, number, date, search, url, datetime-local, otp, textarea, editor
   */
  Input: RHFUniversalInput,

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
} as const;
