# RHFInput Component Documentation

## Overview

`RHFInput` is a React Hook Form wrapper for HeroUI's Input component. It provides seamless integration with RHF while maintaining all HeroUI features and styling.

## Features

- ✅ Full HeroUI Input integration
- ✅ React Hook Form automatic binding
- ✅ TypeScript support with generics
- ✅ Shared interface with other RHF components (RHFBaseFieldProps)
- ✅ Default configuration support
- ✅ All HeroUI Input props supported
- ✅ Clean, minimal implementation

## Installation

```tsx
import { Field } from "@/components/form";
// or
import RHFInput from "@/components/form/RHFInput";
```

## Basic Usage

```tsx
import { useForm } from "react-hook-form";
import { Form, Field } from "@/components/form";

interface FormData {
  email: string;
  password: string;
}

function MyForm() {
  const form = useForm<FormData>();

  return (
    <Form form={form} onSubmit={(data) => console.log(data)}>
      <Field.Input
        name="email"
        type="email"
        label="Email"
        placeholder="Enter your email"
        isRequired
      />

      <Field.Input
        name="password"
        type="password"
        label="Password"
        isRequired
      />
    </Form>
  );
}
```

## Props

### RHFBaseFieldProps (Shared)
These props are inherited from `RHFBaseFieldProps` and shared across all RHF components:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `Path<T>` | **required** | Field name matching form schema |
| `disabled` | `boolean` | `false` | Disable the input |
| `className` | `string` | `""` | Additional CSS classes |
| `label` | `ReactNode` | - | Label text |
| `description` | `ReactNode` | - | Helper text below input |
| `errorMessage` | `ReactNode` | - | Custom error message |
| `isInvalid` | `boolean` | - | Force invalid state |
| `isRequired` | `boolean` | `false` | Mark as required |
| `isReadOnly` | `boolean` | `false` | Make read-only |
| `variant` | `"flat" \| "bordered" \| "faded" \| "underlined"` | `"bordered"` | Input variant |
| `color` | `"default" \| "primary" \| "secondary" \| "success" \| "warning" \| "danger"` | `"default"` | Color theme |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Input size |
| `radius` | `"none" \| "sm" \| "md" \| "lg" \| "full"` | `"md"` | Border radius |
| `labelPlacement` | `"inside" \| "outside" \| "outside-left"` | `"inside"` | Label position |
| `startContent` | `ReactNode` | - | Content before input |
| `endContent` | `ReactNode` | - | Content after input |
| `autoFocus` | `boolean` | `false` | Auto-focus on mount |
| `disableAnimation` | `boolean` | `false` | Disable animations |
| `classNames` | `object` | - | Custom class names for parts |
| `onChangeSideEffect` | `function` | - | Side effect on change |

### Input-Specific Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `"text" \| "email" \| "password" \| "search" \| "tel" \| "url" \| "number"` | `"text"` | Input type |
| `placeholder` | `string` | - | Placeholder text |
| `isClearable` | `boolean` | `false` | Show clear button |
| `fullWidth` | `boolean` | `true` | Take full width |
| `minLength` | `number` | - | Min character length |
| `maxLength` | `number` | - | Max character length |
| `pattern` | `string` | - | Validation pattern (regex) |
| `onClear` | `() => void` | - | Clear button callback |
| `onValueChange` | `(value: string) => void` | - | Value change callback |

## Examples

### Basic Text Input
```tsx
<Field.Input
  name="username"
  type="text"
  label="Username"
  placeholder="Enter username"
  isRequired
  description="Choose a unique username"
/>
```

### Email with Validation
```tsx
<Field.Input
  name="email"
  type="email"
  label="Email Address"
  placeholder="john@example.com"
  isRequired
  description="We'll never share your email"
/>
```

### Password Input
```tsx
<Field.Input
  name="password"
  type="password"
  label="Password"
  placeholder="Enter password"
  isRequired
  minLength={8}
  description="Must be at least 8 characters"
/>
```

### Search with Clear Button
```tsx
<Field.Input
  name="search"
  type="search"
  label="Search"
  placeholder="Type to search..."
  isClearable
  onClear={() => console.log("Search cleared")}
/>
```

### Phone Number
```tsx
<Field.Input
  name="phone"
  type="tel"
  label="Phone Number"
  placeholder="+1 (555) 123-4567"
  pattern="[0-9+\s()-]+"
/>
```

### URL Input
```tsx
<Field.Input
  name="website"
  type="url"
  label="Website"
  placeholder="https://example.com"
  description="Enter your website URL"
/>
```

### Number Input
```tsx
<Field.Input
  name="age"
  type="number"
  label="Age"
  placeholder="Enter your age"
  isRequired
/>
```

### With Start Content (Icon)
```tsx
<Field.Input
  name="email"
  type="email"
  label="Email"
  placeholder="john@example.com"
  startContent={
    <svg className="w-5 h-5" /* ... email icon SVG */>
      <path d="..." />
    </svg>
  }
/>
```

### With End Content
```tsx
<Field.Input
  name="price"
  type="number"
  label="Price"
  placeholder="0.00"
  startContent={<span className="text-default-400">$</span>}
  endContent={<span className="text-default-400">USD</span>}
/>
```

### With URL Prefix/Suffix
```tsx
<Field.Input
  name="website"
  type="url"
  label="Website"
  placeholder="example"
  startContent={<span className="text-default-400 text-small">https://</span>}
  endContent={<span className="text-default-400 text-small">.com</span>}
/>
```

### Custom Variant & Color
```tsx
<Field.Input
  name="highlight"
  type="text"
  label="Important Field"
  variant="faded"
  color="primary"
  size="lg"
/>
```

### Outside Label Placement
```tsx
<Field.Input
  name="firstName"
  type="text"
  label="First Name"
  placeholder="John"
  labelPlacement="outside"
/>
```

### Disabled State
```tsx
<Field.Input
  name="locked"
  type="text"
  label="Locked Field"
  disabled
  value="Cannot edit"
/>
```

### Read-Only State
```tsx
<Field.Input
  name="readonly"
  type="text"
  label="Read Only"
  isReadOnly
  value="Read only value"
/>
```

### With Side Effect
```tsx
<Field.Input
  name="username"
  type="text"
  label="Username"
  onChangeSideEffect={(value) => {
    console.log("Username changed:", value);
  }}
/>
```

## Integration with Form Validation

### With Zod Schema
```tsx
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  age: z.number().min(18, "Must be at least 18 years old"),
});

type FormData = z.infer<typeof schema>;

function MyForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  return (
    <Form form={form} onSubmit={(data) => console.log(data)}>
      <Field.Input name="email" type="email" label="Email" isRequired />
      <Field.Input name="password" type="password" label="Password" isRequired />
      <Field.Input name="age" type="number" label="Age" isRequired />
    </Form>
  );
}
```

## Comparison: RHFInput vs RHFUniversalInput

| Feature | RHFInput (HeroUI) | RHFUniversalInput (Legacy) |
|---------|-------------------|----------------------------|
| Design System | HeroUI | Custom/Mixed |
| Types Supported | text, email, password, search, tel, url, number | text, password, email, phone, number, search, url, OTP, textarea, editor |
| Clear Button | ✅ Native | ❌ Manual |
| Icon Support | ✅ startContent/endContent | ❌ |
| Animations | ✅ HeroUI animations | ✅ Custom |
| Theme Integration | ✅ Full HeroUI theming | ⚠️ Partial |
| File Size | Smaller | Larger |
| Recommended For | Standard inputs | OTP, textarea, rich text editor |

**Recommendation:** Use `Field.Input` (RHFInput) for standard inputs, and `Field.UniversalInput` only for OTP, textarea, or rich text editor.

## Default Configuration

Defaults are defined in `/src/config/rhf/rhf-date-defaults.config.ts`:

```typescript
export const RHF_BASE_DEFAULTS = {
  disabled: false,
  className: "",
  isRequired: false,
  isReadOnly: false,
  variant: "bordered" as const,
  color: "default" as const,
  size: "md" as const,
  radius: "md" as const,
  labelPlacement: "inside" as const,
  autoFocus: false,
  disableAnimation: false,
};
```

## TypeScript Support

Full TypeScript support with generics:

```tsx
interface MyFormData {
  email: string;
  age: number;
}

// Type inference works automatically
<Field.Input<MyFormData>
  name="email" // ✅ Autocomplete works
  type="email"
  label="Email"
/>
```

## Architecture

### File Structure
```
src/components/form/
  ├── RHFInput.tsx              # Main component
  ├── index.ts                  # Exports
  └── date/                     # Date components
      └── ...

src/types/shared/interface/
  └── rhf-date-base.interface.ts # Shared props

src/config/rhf/
  └── rhf-date-defaults.config.ts # Defaults
```

### Shared Interface Pattern
`RHFInput` uses the `RHFBaseFieldProps` interface, which is shared across all RHF components. This ensures consistency and reduces code duplication.

## Best Practices

1. **Use Field.Input for standard inputs**
   ```tsx
   // ✅ Recommended
   <Field.Input name="email" type="email" label="Email" />

   // ❌ Avoid for simple inputs
   <Field.UniversalInput name="email" type="email" label="Email" />
   ```

2. **Use type prop correctly**
   ```tsx
   // ✅ Good
   <Field.Input name="email" type="email" />

   // ❌ Don't use unsupported types
   <Field.Input name="otp" type="otp" /> // Use UniversalInput
   ```

3. **Leverage startContent/endContent**
   ```tsx
   // ✅ Great for icons, units, prefixes
   <Field.Input
     name="price"
     type="number"
     startContent={<span>$</span>}
     endContent={<span>USD</span>}
   />
   ```

4. **Use isClearable for search**
   ```tsx
   // ✅ Good UX
   <Field.Input name="search" type="search" isClearable />
   ```

5. **Match variant to design**
   ```tsx
   // Choose appropriate variant
   <Field.Input variant="bordered" />  // Default
   <Field.Input variant="flat" />      // Minimal
   <Field.Input variant="faded" />     // Subtle
   <Field.Input variant="underlined" /> // Classic
   ```

## Troubleshooting

### Input value not updating
Ensure you're using the `Form` component wrapper and `useForm` correctly:
```tsx
const form = useForm<FormData>();

<Form form={form} onSubmit={onSubmit}>
  <Field.Input name="email" />
</Form>
```

### Validation not working
Ensure you're using a resolver (like Zod):
```tsx
const form = useForm<FormData>({
  resolver: zodResolver(schema),
});
```

### Type errors with name prop
Ensure your form data type matches:
```tsx
interface FormData {
  email: string; // ✅ Must exist
}

<Field.Input<FormData> name="email" /> // ✅ Works
<Field.Input<FormData> name="invalid" /> // ❌ Type error
```

## Related Components

- [RHFDateInput](./FORM_SYSTEM_DOCUMENTATION.md#rhfdateinput) - Date input
- [RHFDatePicker](./FORM_SYSTEM_DOCUMENTATION.md#rhfdatepicker) - Date picker with calendar
- [RHFDateRangePicker](./FORM_SYSTEM_DOCUMENTATION.md#rhfdaterangepicker) - Date range picker
- [RHFTimeInput](./FORM_SYSTEM_DOCUMENTATION.md#rhftimeinput) - Time input
- [RHFSelect](./FORM_SYSTEM_DOCUMENTATION.md#rhfselect) - Select dropdown
- [RHFUniversalInput](./FORM_SYSTEM_DOCUMENTATION.md#rhfuniversalinput) - Legacy input with OTP/textarea/editor

## Migration Guide

### From RHFUniversalInput to RHFInput

```tsx
// Before (UniversalInput)
<Field.Input
  name="email"
  type="email"
  label="Email"
  required
  helperText="Enter your email"
/>

// After (RHFInput - HeroUI)
<Field.Input
  name="email"
  type="email"
  label="Email"
  isRequired
  description="Enter your email"
/>
```

**Key Changes:**
- `required` → `isRequired`
- `helperText` → `description`
- `disabled` → keep as `disabled` (both supported, but `isDisabled` also works)

## License

Same as project license.
