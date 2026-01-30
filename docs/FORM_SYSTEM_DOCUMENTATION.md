# React Hook Form Component System - Complete Documentation

## Table of Contents

1. [Introduction](#introduction)
2. [Installation & Setup](#installation--setup)
3. [Core Concepts](#core-concepts)
4. [Form Components](#form-components)
5. [Input Types](#input-types)
6. [Advanced Features](#advanced-features)
7. [Theming](#theming)
8. [Best Practices](#best-practices)
9. [API Reference](#api-reference)
10. [Examples](#examples)

---

## Introduction

This is a comprehensive, production-ready React Hook Form component system built with TypeScript, Tailwind CSS, and Next.js. It provides a complete set of form components with built-in validation, error handling, dark mode support, and a clean API.

### Key Features

- ✅ **Type-safe** - Full TypeScript support with generics
- ✅ **Zero boilerplate** - Automatic form integration, no manual onChange needed
- ✅ **Dark mode ready** - Built-in theme support with next-themes
- ✅ **Accessible** - Follows WCAG guidelines
- ✅ **Customizable** - Easy to style and extend
- ✅ **Production-ready** - Battle-tested patterns and error handling

---

## Installation & Setup

### Prerequisites

```bash
npm install react-hook-form
npm install next-themes  # For dark mode support
```

### File Structure

```
components/form/
├── Form.tsx                           # Main form wrapper
├── FormItem.tsx                       # Form field container
├── FormLabel.tsx                      # Label component
├── FormControl.tsx                    # Input wrapper
├── FormDescription.tsx                # Helper text
├── FormMessage.tsx                    # Error messages
├── RHFCheckbox.tsx                    # Single checkbox
├── RHFCheckboxGroup.tsx              # Multiple checkboxes
├── RHFSearchableCheckboxGroup.tsx    # Searchable checkbox list
├── RHFRadioGroup.tsx                 # Radio button group
├── RHFUpload.tsx                      # File upload (single/multiple)
├── useThemeMode.ts                    # Theme management hook
├── index.ts                           # Exports all components
├── input/
│   ├── RHFInput.tsx                   # Text, email, password, number inputs
│   ├── RHFTextarea.tsx                # Textarea input
│   ├── RHFOtp.tsx                     # OTP input
│   ├── RHFEditor.tsx                  # Rich text editor
│   └── index.ts
├── date/
│   ├── RHFDatePicker.tsx              # Date picker
│   ├── RHFDateRangePicker.tsx         # Date range picker
│   ├── RHFDateInput.tsx               # Date input
│   ├── RHFTimeInput.tsx               # Time input
│   └── index.ts
└── others/
    ├── RHFSelect.tsx                  # Dropdown (single/multi-select)
    └── index.ts
```

### Basic Setup

1. **Wrap your app with ThemeProvider** (in `app/layout.tsx`):

```tsx
import { ThemeProvider } from "@/components/ThemeProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
```

2. **Import form components**:

```tsx
import { useForm } from "react-hook-form";
import { Form, Field } from "@/components/form";
```

---

## Core Concepts

### 1. Type-Safe Forms

Define your form data type first:

```tsx
interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

const form = useForm<LoginFormData>({
  defaultValues: {
    email: "",
    password: "",
    rememberMe: false,
  },
});
```

### 2. Automatic Integration

All components use React Hook Form's `Controller` internally - **no manual onChange needed**:

```tsx
// ❌ DON'T DO THIS (manual management)
<input
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

// ✅ DO THIS (automatic management)
<Field.Input
  name="email"
  type="email"
  label="Email"
/>
```

### 3. Field Names

Use the `name` prop to match your form schema. TypeScript will autocomplete available field names:

```tsx
<Field.Input
  name="email" // ← TypeScript knows this field exists
  type="email"
  label="Email Address"
/>
```

---

## Form Components

### Form Wrapper

Wrap all form fields in the `<Form>` component:

```tsx
import { useForm } from "react-hook-form";
import { Form, Field } from "@/components/form";

function MyForm() {
  const form = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <Form form={form} onSubmit={onSubmit} className="space-y-4">
      {/* Your form fields here */}
    </Form>
  );
}
```

**Props:**

- `form` - React Hook Form instance (required)
- `onSubmit` - Submit handler (required)
- `className` - Additional CSS classes
- `children` - Form fields

---

## Input Types

### Field.Input - Text-based Inputs

HeroUI Input component for text, email, password, search, tel, url, and number types.

#### Text Input

```tsx
<Field.Input
  name="firstName"
  type="text"
  label="First Name"
  placeholder="John"
  isRequired
  description="Enter your legal first name"
/>
```

#### Email Input

```tsx
<Field.Input
  name="email"
  type="email"
  label="Email Address"
  placeholder="john@example.com"
  isRequired
/>
```

#### Password Input

```tsx
<Field.Input
  name="password"
  type="password"
  label="Password"
  placeholder="Enter password"
  isRequired
  description="Must be at least 8 characters"
/>
```

#### Number Input

```tsx
<Field.Input
  name="age"
  type="number"
  label="Age"
  minValue={18}
  maxValue={120}
  step={1}
  isRequired
/>
```

#### Phone Input

```tsx
<Field.Input
  name="phone"
  type="tel"
  label="Phone Number"
  placeholder="+1 (555) 123-4567"
/>
```

#### Search Input

```tsx
<Field.Input
  name="search"
  type="search"
  label="Search"
  placeholder="Search..."
  isClearable
/>
```

#### URL Input

```tsx
<Field.Input
  name="website"
  type="url"
  label="Website"
  placeholder="https://example.com"
/>
```

---

### Field.Textarea

HeroUI Textarea component for multi-line text input.

```tsx
<Field.Textarea
  name="bio"
  label="Bio"
  placeholder="Tell us about yourself..."
  description="Maximum 500 characters"
  minRows={4}
  maxRows={8}
/>
```

**Props:**

- `minRows` - Minimum number of rows
- `maxRows` - Maximum number of rows
- `disableAutosize` - Disable automatic resizing
- `minLength` - Minimum character length
- `maxLength` - Maximum character length

---

### Field.Otp

HeroUI InputOtp component for verification codes.

```tsx
<Field.Otp
  name="verificationCode"
  label="Verification Code"
  length={6}
  allowedKeys="^[0-9]*$"
  description="Enter the 6-digit code sent to your email"
/>
```

**Features:**

- Individual character boxes
- Auto-focuses next box on entry
- Backspace navigates to previous box
- Arrow keys for navigation
- Paste support (pastes full code)

**Props:**

- `length` - Number of characters (default: 6)
- `allowedKeys` - Regex pattern for allowed characters
- `textAlign` - Text alignment in boxes

---

### Field.DatePicker

HeroUI DatePicker component for selecting dates.

```tsx
<Field.DatePicker
  name="birthDate"
  label="Birth Date"
  isRequired
  showMonthAndYearPickers
/>
```

**Props:**

- `showMonthAndYearPickers` - Show month/year selection
- `visibleMonths` - Number of visible months
- `minValue` - Minimum selectable date
- `maxValue` - Maximum selectable date
- `granularity` - Time granularity (day, hour, minute, second)

---

### Field.DateRangePicker

HeroUI DateRangePicker component for selecting date ranges.

```tsx
<Field.DateRangePicker
  name="dateRange"
  label="Date Range"
  isRequired
  showMonthAndYearPickers
/>
```

---

### Field.DateInput

HeroUI DateInput component for entering dates via text.

```tsx
<Field.DateInput
  name="startDate"
  label="Start Date"
  placeholderValue={new CalendarDate(2024, 1, 1)}
  isRequired
/>
```

---

### Field.TimeInput

HeroUI TimeInput component for entering times.

```tsx
<Field.TimeInput name="appointmentTime" label="Appointment Time" isRequired />
```

---

### Field.Select (Dropdown)

HeroUI Select component supporting single and multi-select.

#### Single Select

```tsx
<Field.Select
  name="country"
  label="Country"
  options={[
    { key: "us", label: "United States", value: "us" },
    { key: "uk", label: "United Kingdom", value: "uk" },
    { key: "ca", label: "Canada", value: "ca" },
  ]}
  placeholder="Select your country"
  isRequired
  description="Select the country where you reside"
/>
```

#### Multi-Select

```tsx
<Field.Select
  name="skills"
  label="Technical Skills"
  options={[
    { key: "react", label: "React", value: "react" },
    { key: "typescript", label: "TypeScript", value: "typescript" },
    { key: "nodejs", label: "Node.js", value: "nodejs" },
  ]}
  selectionMode="multiple"
  description="Select your skills"
/>
```

#### With Sections

```tsx
<Field.Select
  name="role"
  label="Role"
  sections={[
    {
      key: "admin",
      title: "Admin Roles",
      items: [
        { key: "superadmin", label: "Super Admin", value: "superadmin" },
        { key: "admin", label: "Admin", value: "admin" },
      ],
    },
    {
      key: "user",
      title: "User Roles",
      items: [
        { key: "member", label: "Member", value: "member" },
        { key: "guest", label: "Guest", value: "guest" },
      ],
    },
  ]}
/>
```

#### Disabled Options

```tsx
<Field.Select
  name="role"
  label="Role"
  options={[
    { key: "admin", label: "Admin", value: "admin" },
    { key: "user", label: "User", value: "user" },
  ]}
  disabledKeys={["admin"]}
/>
```

**Props:**

- `options` - Array of select options
- `sections` - Grouped options with section headers
- `selectionMode` - "single" or "multiple"
- `disabledKeys` - Array of disabled option keys
- `isLoading` - Show loading state
- `isVirtualized` - Enable virtualization for large lists

---

### Field.Checkbox (Single Checkbox)

```tsx
<Field.Checkbox
  name="acceptTerms"
  label="I accept the terms and conditions"
  isRequired
/>

<Field.Checkbox
  name="newsletter"
  label="Subscribe to newsletter"
  description="Receive updates about new features"
  disabled={false}
/>
```

---

### Field.CheckboxGroup (Multiple Checkboxes)

```tsx
<Field.CheckboxGroup
  name="preferences"
  label="Email Preferences"
  options={[
    { label: "Newsletter", value: "newsletter" },
    { label: "Product Updates", value: "updates" },
    { label: "Marketing Emails", value: "marketing" },
    { label: "Event Notifications", value: "events" },
  ]}
  description="Choose the types of emails you'd like to receive"
/>
```

With disabled options:

```tsx
<Field.CheckboxGroup
  name="features"
  label="Features"
  options={[
    { label: "Feature A", value: "a" },
    { label: "Feature B (coming soon)", value: "b", disabled: true },
  ]}
/>
```

---

### Field.SearchableCheckboxGroup

For large lists of options with search functionality.

```tsx
<Field.SearchableCheckboxGroup
  name="languages"
  label="Programming Languages"
  options={[
    { label: "JavaScript", value: "javascript" },
    { label: "TypeScript", value: "typescript" },
    { label: "Python", value: "python" },
    // ... many more options
  ]}
  placeholder="Search languages..."
  maxHeight="300px" // Scrollable height
  description="Search and select languages you know"
/>
```

Features:

- Search input to filter options
- "Select All" and "Clear All" buttons
- Shows count of selected items
- Scrollable with custom max height
- "No results found" message

---

### Field.RadioGroup

```tsx
<Field.RadioGroup
  name="gender"
  label="Gender"
  options={[
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ]}
  isRequired
/>
```

#### Horizontal Layout

```tsx
<Field.RadioGroup
  name="preference"
  label="Preference"
  options={[...]}
  horizontal  // Display options side-by-side
/>
```

#### With Descriptions

```tsx
<Field.RadioGroup
  name="paymentMethod"
  label="Payment Method"
  options={[
    {
      label: "Credit Card",
      value: "credit_card",
      description: "Pay with your credit or debit card",
    },
    {
      label: "PayPal",
      value: "paypal",
      description: "Pay with your PayPal account",
    },
  ]}
  isRequired
/>
```

---

### Field.Upload (File Upload)

Three upload styles: `default`, `avatar`, `button`.

#### Default Style (Drop Zone)

```tsx
<Field.Upload
  name="documents"
  label="Documents"
  accept=".pdf,.doc,.docx"
  multiple
  maxFiles={3}
  maxSize={10 * 1024 * 1024} // 10MB per file
  showPreview
  description="Upload up to 3 documents"
/>
```

#### Avatar Style (Circular Profile Picture)

```tsx
<Field.Upload
  name="avatar"
  uploadStyle="avatar"
  label="Profile Picture"
  accept="image/*"
  maxSize={5 * 1024 * 1024} // 5MB
  showPreview
/>
```

#### Button Style (Simple Button)

```tsx
<Field.Upload
  name="resume"
  uploadStyle="button"
  label="Resume"
  accept=".pdf"
  maxSize={2 * 1024 * 1024} // 2MB
/>
```

#### With Side Effects

```tsx
<Field.Upload
  name="avatar"
  label="Profile Picture"
  accept="image/*"
  showPreview
  onChangeSideEffect={(files) => {
    if (files && files.length > 0) {
      console.log("File selected:", files[0].name);
      // Upload to server, show toast, etc.
    }
  }}
/>
```

---

## Advanced Features

### Floating Labels

By default, inputs use floating labels. When you supply a `placeholder`, the label automatically floats to show the placeholder.

```tsx
// Floating label (default)
<Field.Input
  name="email"
  label="Email"
  placeholder="Enter your email"  // Label auto-floats
/>

// Static label (above input)
<Field.Input
  name="email"
  label="Email"
  labelMode="static"
/>
```

**Label behavior:**

- No placeholder: Label floats on focus or when field has value
- With placeholder: Label always floats (to show placeholder)
- OTP inputs: Always use static label
- Static mode: Label always above input

### Side Effects

Execute code when field value changes (without interfering with form state):

```tsx
<Field.Input
  name="email"
  type="email"
  label="Email"
  onChangeSideEffect={(value) => {
    // Check email availability
    checkEmailAvailability(value);
  }}
/>

<Field.Select
  name="country"
  label="Country"
  options={[...]}
  onChangeSideEffect={(value) => {
    // Load states based on country
    loadStates(value);
  }}
/>

<Field.Upload
  name="avatar"
  label="Avatar"
  onChangeSideEffect={(files) => {
    // Upload to server immediately
    if (files) uploadToServer(files[0]);
  }}
/>
```

### Validation

Use React Hook Form's validation:

```tsx
const form = useForm<FormData>({
  defaultValues: { email: "" },
});

// In your form:
<Field.Input
  name="email"
  type="email"
  label="Email"
  required // Basic HTML5 validation
/>;
```

For advanced validation, use a schema library (Zod, Yup):

```tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  age: z.number().min(18, "Must be 18 or older"),
});

const form = useForm<FormData>({
  resolver: zodResolver(schema),
  defaultValues: { email: "", password: "", age: 18 },
});
```

Error messages automatically appear below the field.

---

## Theming

### Theme Support

All components support light and dark modes out of the box.

#### System Theme (Automatic)

```tsx
// Uses system theme by default
<Field.Input name="email" label="Email" />
```

#### Force Specific Theme

```tsx
// Force light mode for this field
<Field.Input
  name="email"
  label="Email"
  theme="light"
/>

// Force dark mode for this field
<Field.Input
  name="email"
  label="Email"
  theme="dark"
/>
```

### Theme Toggle

Add a theme toggle button:

```tsx
import { ThemeToggle } from "@/components/ThemeToggle";

function MyPage() {
  return (
    <div>
      <ThemeToggle />
      {/* Your content */}
    </div>
  );
}
```

### Custom Theme Colors

The components use these Tailwind colors:

**Light Mode:**

- Background: `bg-white`
- Text: `text-gray-900`
- Border: `border-gray-200`
- Focus: `ring-gray-900`

**Dark Mode:**

- Background: `bg-gray-950`
- Text: `text-gray-100`
- Border: `border-gray-800`
- Focus: `ring-gray-100`

To customize, modify the `getThemeClasses` function in `useThemeMode.ts` or update Tailwind config.

---

## Best Practices

### 1. Define Your Form Type First

```tsx
// ✅ Good
interface FormData {
  email: string;
  password: string;
}

const form = useForm<FormData>({ defaultValues: { email: "", password: "" } });

// ❌ Bad
const form = useForm(); // No type safety
```

### 2. Provide Default Values

```tsx
// ✅ Good
const form = useForm<FormData>({
  defaultValues: {
    email: "",
    preferences: [],
    acceptTerms: false,
  },
});

// ❌ Bad
const form = useForm<FormData>(); // Fields start as undefined
```

### 3. Use Helper Text for Clarity

```tsx
// ✅ Good
<Field.Input
  name="password"
  type="password"
  label="Password"
  helperText="Must be at least 8 characters with a number and special character"
/>

// ❌ Less helpful
<Field.Input
  name="password"
  type="password"
  label="Password"
/>
```

### 4. Group Related Fields

```tsx
<section className="space-y-4">
  <h2>Personal Information</h2>

  <div className="grid grid-cols-2 gap-4">
    <Field.Input name="firstName" label="First Name" />
    <Field.Input name="lastName" label="Last Name" />
  </div>

  <Field.Input name="email" type="email" label="Email" />
</section>
```

### 5. Provide Feedback

```tsx
const onSubmit = async (data: FormData) => {
  try {
    await api.submit(data);
    toast.success("Form submitted successfully!");
  } catch (error) {
    toast.error("Failed to submit form");
  }
};
```

### 6. Use Side Effects Wisely

```tsx
// ✅ Good - non-blocking operations
<Field.Input
  name="username"
  onChangeSideEffect={async (value) => {
    await checkUsernameAvailability(value);
  }}
/>

// ❌ Bad - blocking operations
<Field.Input
  name="username"
  onChangeSideEffect={(value) => {
    form.setValue("email", value + "@example.com");  // Don't modify form state here
  }}
/>
```

---

## API Reference

### Common Props (All Components)

| Prop          | Type      | Default  | Description                             |
| ------------- | --------- | -------- | --------------------------------------- |
| `name`        | `Path<T>` | Required | Field name matching form schema         |
| `label`       | `string`  | -        | Label text displayed above/around field |
| `description` | `string`  | -        | Description text displayed below field  |
| `isRequired`  | `boolean` | `false`  | Whether field is required               |
| `isDisabled`  | `boolean` | `false`  | Whether field is disabled               |
| `isReadOnly`  | `boolean` | `false`  | Whether field is read-only              |
| `className`   | `string`  | -        | Additional CSS classes                  |

### Field.Input Props (HeroUI Input)

| Prop                 | Type                   | Default  | Description                     |
| -------------------- | ---------------------- | -------- | ------------------------------- |
| `type`               | `string`               | `"text"` | HTML input type                 |
| `placeholder`        | `string`               | -        | Placeholder text                |
| `variant`            | HeroUI Variant         | -        | Input style variant             |
| `radius`             | HeroUI Radius          | -        | Border radius                   |
| `size`               | HeroUI Size            | -        | Input size                      |
| `labelPlacement`     | HeroUI LabelPlacement  | -        | Label positioning               |
| `onChangeSideEffect` | `(value: any) => void` | -        | Side effect callback            |
| `startContent`       | `ReactNode`            | -        | Icon/content at start of input  |
| `endContent`         | `ReactNode`            | -        | Icon/content at end of input    |
| `isClearable`        | `boolean`              | `false`  | Show clear button               |
| `errorMessage`       | `string`               | -        | Custom error message (from RHF) |

### Field.Textarea Props (HeroUI Textarea)

| Prop                 | Type                   | Default | Description                 |
| -------------------- | ---------------------- | ------- | --------------------------- |
| `placeholder`        | `string`               | -       | Placeholder text            |
| `minRows`            | `number`               | `3`     | Minimum rows                |
| `maxRows`            | `number`               | -       | Maximum rows (auto-expands) |
| `variant`            | HeroUI Variant         | -       | Textarea style variant      |
| `radius`             | HeroUI Radius          | -       | Border radius               |
| `size`               | HeroUI Size            | -       | Textarea size               |
| `onChangeSideEffect` | `(value: any) => void` | -       | Side effect callback        |

### Field.Otp Props (HeroUI InputOtp)

| Prop                 | Type                   | Default | Description             |
| -------------------- | ---------------------- | ------- | ----------------------- |
| `length`             | `number`               | `6`     | Number of OTP digits    |
| `variant`            | HeroUI Variant         | -       | OTP input style variant |
| `onChangeSideEffect` | `(value: any) => void` | -       | Side effect callback    |

### Field.Select Props (HeroUI Select)

| Prop                 | Type                     | Default    | Description                            |
| -------------------- | ------------------------ | ---------- | -------------------------------------- |
| `options`            | `SelectOption[]`         | Required   | Array of options                       |
| `sections`           | `SelectSection[]`        | -          | Grouped sections with options          |
| `placeholder`        | `string`                 | -          | Placeholder text                       |
| `selectionMode`      | `"single" \| "multiple"` | `"single"` | Single or multi-select mode            |
| `disabledKeys`       | `string[]`               | -          | Array of disabled option keys          |
| `isLoading`          | `boolean`                | `false`    | Show loading spinner                   |
| `isVirtualized`      | `boolean`                | `false`    | Enable virtual scrolling (large lists) |
| `variant`            | HeroUI Variant           | -          | Select style variant                   |
| `radius`             | HeroUI Radius            | -          | Border radius                          |
| `size`               | HeroUI Size              | -          | Select size                            |
| `onChangeSideEffect` | `(value: any) => void`   | -          | Side effect callback                   |

### Field.DatePicker Props (HeroUI DatePicker)

| Prop                 | Type                   | Default | Description              |
| -------------------- | ---------------------- | ------- | ------------------------ |
| `placeholder`        | `string`               | -       | Placeholder text         |
| `variant`            | HeroUI Variant         | -       | DatePicker style variant |
| `radius`             | HeroUI Radius          | -       | Border radius            |
| `size`               | HeroUI Size            | -       | DatePicker size          |
| `onChangeSideEffect` | `(value: any) => void` | -       | Side effect callback     |

### Field.Checkbox Props

| Prop                 | Type                       | Default | Description          |
| -------------------- | -------------------------- | ------- | -------------------- |
| `onChangeSideEffect` | `(value: boolean) => void` | -       | Side effect callback |

### Field.CheckboxGroup Props

| Prop                 | Type                      | Default  | Description               |
| -------------------- | ------------------------- | -------- | ------------------------- |
| `options`            | `CheckboxOption[]`        | Required | Array of checkbox options |
| `onChangeSideEffect` | `(values: any[]) => void` | -        | Side effect callback      |

### Field.SearchableCheckboxGroup Props

| Prop                 | Type                      | Default       | Description                   |
| -------------------- | ------------------------- | ------------- | ----------------------------- |
| `options`            | `CheckboxOption[]`        | Required      | Array of checkbox options     |
| `placeholder`        | `string`                  | `"Search..."` | Search input placeholder      |
| `maxHeight`          | `string`                  | `"300px"`     | Max height of scrollable list |
| `onChangeSideEffect` | `(values: any[]) => void` | -             | Side effect callback          |

### Field.RadioGroup Props

| Prop                 | Type                   | Default  | Description                  |
| -------------------- | ---------------------- | -------- | ---------------------------- |
| `options`            | `RadioOption[]`        | Required | Array of radio options       |
| `horizontal`         | `boolean`              | `false`  | Display options horizontally |
| `onChangeSideEffect` | `(value: any) => void` | -        | Side effect callback         |

### Field.Upload Props

| Prop                 | Type                                | Default     | Description            |
| -------------------- | ----------------------------------- | ----------- | ---------------------- |
| `uploadStyle`        | `"default" \| "avatar" \| "button"` | `"default"` | Upload UI style        |
| `accept`             | `string`                            | -           | Accepted file types    |
| `multiple`           | `boolean`                           | `false`     | Allow multiple files   |
| `maxFiles`           | `number`                            | -           | Max number of files    |
| `maxSize`            | `number`                            | -           | Max file size in bytes |
| `showPreview`        | `boolean`                           | `false`     | Show file preview      |
| `onChangeSideEffect` | `(files: FileList \| null) => void` | -           | Side effect callback   |

---

## Examples

### Complete Login Form

```tsx
import { useForm } from "react-hook-form";
import { Form, Field } from "@/components/form";

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export function LoginForm() {
  const form = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await api.login(data);
      toast.success("Logged in successfully!");
    } catch (error) {
      toast.error("Login failed");
    }
  };

  return (
    <Form form={form} onSubmit={onSubmit} className="space-y-4">
      <Field.Input
        name="email"
        type="email"
        label="Email"
        placeholder="you@example.com"
        isRequired
      />

      <Field.Input
        name="password"
        type="password"
        label="Password"
        placeholder="Enter password"
        isRequired
      />

      <Field.Checkbox name="rememberMe" label="Remember me" />

      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Login
      </button>
    </Form>
  );
}
```

### Profile Update Form

```tsx
interface ProfileFormData {
  firstName: string;
  lastName: string;
  bio: string;
  country: string;
  avatar: FileList | null;
  newsletter: boolean;
}

export function ProfileForm() {
  const form = useForm<ProfileFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      bio: "",
      country: "",
      avatar: null,
      newsletter: false,
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    // Handle form submission
  };

  return (
    <Form form={form} onSubmit={onSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <Field.Input
          name="firstName"
          label="First Name"
          placeholder="John"
          isRequired
        />
        <Field.Input
          name="lastName"
          label="Last Name"
          placeholder="Doe"
          isRequired
        />
      </div>

      <Field.Textarea
        name="bio"
        label="Bio"
        minRows={4}
        placeholder="Tell us about yourself..."
      />

      <Field.Select
        name="country"
        label="Country"
        options={[
          { key: "us", label: "United States", value: "us" },
          { key: "uk", label: "United Kingdom", value: "uk" },
          { key: "ca", label: "Canada", value: "ca" },
        ]}
        placeholder="Select country"
        isRequired
      />

      <Field.Upload
        name="avatar"
        uploadStyle="avatar"
        label="Profile Picture"
        accept="image/*"
        maxSize={5 * 1024 * 1024}
        showPreview
      />

      <Field.Checkbox name="newsletter" label="Subscribe to newsletter" />

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Update Profile
      </button>
    </Form>
  );
}
```

### Registration Form with Validation

```tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const registrationSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    acceptTerms: z
      .boolean()
      .refine((val) => val === true, "You must accept the terms"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type RegistrationFormData = z.infer<typeof registrationSchema>;

export function RegistrationForm() {
  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  const onSubmit = async (data: RegistrationFormData) => {
    await api.register(data);
  };

  return (
    <Form form={form} onSubmit={onSubmit} className="space-y-4">
      <Field.Input
        name="email"
        type="email"
        label="Email"
        placeholder="you@example.com"
        required
      />

      <Field.Input
        name="password"
        type="password"
        label="Password"
        placeholder="Create a password"
        required
      />

      <Field.Input
        name="confirmPassword"
        type="password"
        label="Confirm Password"
        placeholder="Confirm your password"
        required
      />

      <Field.Checkbox
        name="acceptTerms"
        label="I accept the terms and conditions"
        required
      />

      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Register
      </button>
    </Form>
  );
}
```

### Multi-Step Form

```tsx
import { useState } from "react";

interface MultiStepFormData {
  // Step 1
  firstName: string;
  lastName: string;
  email: string;

  // Step 2
  country: string;
  phone: string;

  // Step 3
  preferences: string[];
  newsletter: boolean;
}

export function MultiStepForm() {
  const [step, setStep] = useState(1);

  const form = useForm<MultiStepFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      country: "",
      phone: "",
      preferences: [],
      newsletter: false,
    },
  });

  const onSubmit = async (data: MultiStepFormData) => {
    await api.submit(data);
  };

  return (
    <Form form={form} onSubmit={onSubmit} className="space-y-6">
      {step === 1 && (
        <>
          <h2>Personal Information</h2>
          <Field.Input name="firstName" label="First Name" isRequired />
          <Field.Input name="lastName" label="Last Name" isRequired />
          <Field.Input name="email" type="email" label="Email" isRequired />
          <button type="button" onClick={() => setStep(2)}>Next</button>
        </>
      )}

      {step === 2 && (
        <>
          <h2>Contact Information</h2>
          <Field.Select
            name="country"
            label="Country"
            options={[...]}
            isRequired
          />
          <Field.Input name="phone" type="tel" label="Phone" />
          <button type="button" onClick={() => setStep(1)}>Back</button>
          <button type="button" onClick={() => setStep(3)}>Next</button>
        </>
      )}

      {step === 3 && (
        <>
          <h2>Preferences</h2>
          <Field.CheckboxGroup
            name="preferences"
            label="Interests"
            options={[...]}
          />
          <Field.Checkbox name="newsletter" label="Subscribe to newsletter" />
          <button type="button" onClick={() => setStep(2)}>Back</button>
          <button type="submit">Submit</button>
        </>
      )}
    </Form>
  );
}
```

---

## Troubleshooting

### Issue: Form values not updating

**Problem:** Field values don't update when typing.

**Solution:** Make sure you wrapped your form fields in the `<Form>` component and passed the form instance:

```tsx
const form = useForm<FormData>();

return (
  <Form form={form} onSubmit={onSubmit}>
    <Field.Input name="email" label="Email" />
  </Form>
);
```

### Issue: TypeScript errors on `name` prop

**Problem:** TypeScript complains about field names.

**Solution:** Define your form data type and pass it to `useForm`:

```tsx
interface FormData {
  email: string;
}

const form = useForm<FormData>({ defaultValues: { email: "" } });
```

### Issue: Dark mode not working

**Problem:** Components don't change appearance in dark mode.

**Solution:** Make sure you:

1. Wrapped your app with `ThemeProvider`
2. Added `darkMode: 'class'` to `tailwind.config.js`
3. Added `suppressHydrationWarning` to the `<html>` tag

### Issue: OTP input not accepting values

**Problem:** Can't type in OTP boxes.

**Solution:** Make sure the field value is initialized as an empty string:

```tsx
const form = useForm<FormData>({
  defaultValues: {
    verificationCode: "", // ← Initialize as empty string, not undefined
  },
});
```

---

## Migration Guide

### From Standard Inputs

**Before:**

```tsx
const [email, setEmail] = useState("");

<input
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  type="email"
  placeholder="Email"
/>;
```

**After:**

```tsx
const form = useForm<{ email: string }>({
  defaultValues: { email: "" },
});

<Form form={form} onSubmit={onSubmit}>
  <Field.Input name="email" type="email" label="Email" placeholder="Email" />
</Form>;
```

### From Material-UI

**Before:**

```tsx
<TextField
  label="Email"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={!!error}
  helperText={error}
  required
/>
```

**After:**

```tsx
<Field.Input
  name="email"
  type="email"
  label="Email"
  required
  helperText="Enter your email address"
/>
```

---

## Support

For issues, questions, or feature requests, please refer to:

- React Hook Form docs: https://react-hook-form.com/
- Next.js docs: https://nextjs.org/docs
- Tailwind CSS docs: https://tailwindcss.com/docs

---

## License

This form system is part of your project and follows your project's license.

---

**Last Updated:** November 20, 2025
**Version:** 1.0.0
