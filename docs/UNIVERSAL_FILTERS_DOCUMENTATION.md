# Universal Filters Component - Complete Documentation

## Table of Contents

1. [Introduction](#introduction)
2. [Installation & Setup](#installation--setup)
3. [Core Concepts](#core-concepts)
4. [Component Modes](#component-modes)
5. [Filter Types](#filter-types)
6. [Configuration](#configuration)
7. [URL Integration](#url-integration)
8. [API Reference](#api-reference)
9. [Examples](#examples)
10. [Best Practices](#best-practices)

---

## Introduction

UniversalFilters is a powerful, flexible filtering component that provides a centralized way to manage filters in your application. It supports multiple display modes (tabs and dropdown), automatic URL synchronization, and integrates seamlessly with the React Hook Form system.

### Key Features

- ✅ **Two Display Modes** - Tabs (horizontal layout) or Dropdown (compact menu)
- ✅ **URL-Synced** - All filter values automatically stored in URL params
- ✅ **Type-Safe** - Full TypeScript support with comprehensive interfaces
- ✅ **Debounced Inputs** - Smart debouncing for text inputs (500ms)
- ✅ **Dark Mode Ready** - Built-in theme support
- ✅ **Form Integration** - Uses React Hook Form under the hood
- ✅ **13 Filter Types** - Text, Select, Multi-select, Checkbox, Radio, Date, Number, and more
- ✅ **Active Filter Count** - Visual indicator of applied filters
- ✅ **Reset Functionality** - Easy clear all filters

---

## Installation & Setup

### Prerequisites

The UniversalFilters component depends on the form system components. Make sure you have:

```bash
npm install react-hook-form
npm install lucide-react  # For icons
```

### File Structure

```
components/shared/
└── universal-filters.tsx       # Main UniversalFilters component

hooks/shared/
├── use-query-params.ts         # URL params management
└── useClickOutside.ts          # Click outside detection

types/shared/interface/
└── filter-config.interface.ts  # TypeScript interfaces
```

### Basic Setup

1. **Import the component**:

```tsx
import UniversalFilters from "@/components/shared/universal-filters";
import { FiltersConfig } from "@/types/shared/interface/filter-config.interface";
```

2. **Define your filter configuration**:

```tsx
const filtersConfig: FiltersConfig = {
  filters: [
    {
      name: "Search",
      param: "search",
      type: "text",
      placeholder: "Search users...",
    },
    {
      name: "Status",
      param: "status",
      type: "select",
      options: [
        { label: "All", value: "all" },
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
      ],
    },
  ],
  showReset: true,
  resetButtonText: "Clear Filters",
};
```

3. **Use the component**:

```tsx
<UniversalFilters config={filtersConfig} mode="tabs" />
```

---

## Core Concepts

### 1. Filter Configuration

Every filter is defined by a `FilterConfig` object with the following properties:

```typescript
interface FilterConfig {
  name: string;              // Display label
  param: string;             // URL parameter name
  type: FilterType;          // Input type
  placeholder?: string;      // Placeholder text
  helperText?: string;       // Helper text below input
  required?: boolean;        // Mark as required
  disabled?: boolean;        // Disable the filter
  defaultValue?: any;        // Default value
  options?: SelectOption[];  // For select/multiselect/radio/checkbox-group
  min?: number;              // For number/date inputs
  max?: number;              // For number/date inputs
  step?: number;             // For number inputs
}
```

### 2. URL Parameter Management

All filter values are automatically synchronized with URL parameters:

- **Setting a filter** → Updates URL
- **Clearing a filter** → Removes from URL
- **Navigating back/forward** → Filters restored from URL
- **Sharing URL** → Filters preserved

Example URL with filters:
```
/users?search=john&status=active&role=admin&startDate=2024-01-01
```

### 3. Debouncing

Text inputs (text, email, phone, number, search, url) are automatically debounced with a 500ms delay to prevent excessive URL updates while typing. Other input types (select, checkbox, etc.) update immediately.

---

## Component Modes

### Tabs Mode (Default)

Displays filters horizontally in a grid layout. Best for:
- Desktop applications
- 4-6 filters or less
- Always-visible filters

```tsx
<UniversalFilters config={filtersConfig} mode="tabs" />
```

**Features:**
- Responsive grid (1-4 columns based on screen size)
- Clear visual separation
- Active filter count badge
- Reset button in bottom-right

### Dropdown Mode

Displays filters in a compact dropdown menu. Best for:
- Mobile applications
- Many filters (7+)
- Limited screen space
- Optional filters

```tsx
<UniversalFilters
  config={filtersConfig}
  mode="dropdown"
  dropdownButtonText="Filter Results"
  dropdownButtonSize="md"
/>
```

**Features:**
- Compact button with active count badge
- Scrollable filter list
- Click outside to close
- Optional "Apply" button
- Customizable button size (sm, md, lg)

---

## Filter Types

### 1. Text-Based Inputs

#### Text
```tsx
{
  name: "Search",
  param: "search",
  type: "text",
  placeholder: "Search...",
}
```

#### Email
```tsx
{
  name: "Email",
  param: "email",
  type: "email",
  placeholder: "user@example.com",
}
```

#### Phone
```tsx
{
  name: "Phone",
  param: "phone",
  type: "phone",
  placeholder: "+1 (555) 123-4567",
}
```

#### URL
```tsx
{
  name: "Website",
  param: "website",
  type: "url",
  placeholder: "https://example.com",
}
```

#### Search
```tsx
{
  name: "Quick Search",
  param: "q",
  type: "search",
  placeholder: "Type to search...",
}
```

#### Textarea
```tsx
{
  name: "Description",
  param: "description",
  type: "textarea",
  placeholder: "Enter description...",
  helperText: "Maximum 500 characters",
}
```

### 2. Number Input

```tsx
{
  name: "Age",
  param: "age",
  type: "number",
  min: 18,
  max: 100,
  step: 1,
  placeholder: "Enter age",
}
```

### 3. Date Inputs

#### Date
```tsx
{
  name: "Start Date",
  param: "startDate",
  type: "date",
}
```

#### DateTime-Local
```tsx
{
  name: "Appointment",
  param: "appointmentTime",
  type: "datetime-local",
}
```

### 4. Select (Single)

```tsx
{
  name: "Status",
  param: "status",
  type: "select",
  placeholder: "Select status",
  options: [
    { label: "All Statuses", value: "all" },
    { label: "Active", value: "active" },
    { label: "Pending", value: "pending" },
    { label: "Inactive", value: "inactive" },
  ],
}
```

### 5. Multi-Select

```tsx
{
  name: "Categories",
  param: "categories",
  type: "multiselect",
  placeholder: "Select categories",
  options: [
    { label: "Technology", value: "tech" },
    { label: "Business", value: "business" },
    { label: "Design", value: "design" },
  ],
  helperText: "Select multiple categories",
}
```

**URL format:** `?categories=tech,business,design`

### 6. Checkbox (Single)

```tsx
{
  name: "Show Archived",
  param: "showArchived",
  type: "checkbox",
  defaultValue: false,
}
```

**URL format:** `?showArchived=true`

### 7. Checkbox Group

```tsx
{
  name: "Permissions",
  param: "permissions",
  type: "checkbox-group",
  options: [
    { label: "Read", value: "read" },
    { label: "Write", value: "write" },
    { label: "Delete", value: "delete" },
  ],
}
```

**URL format:** `?permissions=read,write`

### 8. Radio Group

```tsx
{
  name: "Sort By",
  param: "sortBy",
  type: "radio",
  options: [
    { label: "Newest First", value: "newest" },
    { label: "Oldest First", value: "oldest" },
    { label: "Most Popular", value: "popular" },
  ],
}
```

---

## Configuration

### FiltersConfig Interface

```typescript
interface FiltersConfig {
  /** Array of filter configurations */
  filters: FilterConfig[];
  
  /** Show reset button */
  showReset?: boolean;
  
  /** Custom text for reset button */
  resetButtonText?: string;
  
  /** Show apply button (dropdown mode) */
  showApplyButton?: boolean;
  
  /** Custom text for apply button */
  applyButtonText?: string;
  
  /** Callback when filters are reset */
  onReset?: () => void;
  
  /** Callback when apply is clicked (dropdown mode) */
  onApply?: (values: Record<string, any>) => void;
}
```

### UniversalFilters Props

```typescript
interface UniversalFiltersProps {
  /** Filter configuration */
  config: FiltersConfig;
  
  /** Display mode: tabs (horizontal) or dropdown */
  mode?: "tabs" | "dropdown";
  
  /** Custom className for the container */
  className?: string;
  
  /** Button text for dropdown mode */
  dropdownButtonText?: string;
  
  /** Custom icon for dropdown button */
  dropdownIcon?: React.ReactNode;
  
  /** Button size for dropdown mode */
  dropdownButtonSize?: "sm" | "md" | "lg";
}
```

---

## URL Integration

### Reading URL Parameters

The component automatically reads URL parameters on mount and when they change:

```tsx
// URL: /users?search=john&status=active

// Component automatically sets:
// - search input to "john"
// - status select to "active"
```

### Writing URL Parameters

When a filter changes, the URL is automatically updated:

```tsx
// User types "john" in search
// URL becomes: /users?search=john

// User selects "active" status
// URL becomes: /users?search=john&status=active

// User clears search
// URL becomes: /users?status=active
```

### Using URL Parameters in Your App

```tsx
"use client";

import { useAllSearchParams } from "@/hooks/shared/use-query-params";

export default function UsersPage() {
  const params = useAllSearchParams();
  
  // Access filter values
  const search = params.search || "";
  const status = params.status || "all";
  
  // Use in API calls
  const { data } = useQuery({
    queryKey: ["users", params],
    queryFn: () => fetchUsers(params),
  });
  
  return (
    <div>
      <UniversalFilters config={filtersConfig} />
      {/* Your filtered content */}
    </div>
  );
}
```

---

## API Reference

### UniversalFilters Component

```tsx
<UniversalFilters
  config={filtersConfig}
  mode="tabs"
  className="mb-6"
  dropdownButtonText="Filters"
  dropdownIcon={<Filter />}
  dropdownButtonSize="md"
/>
```

**Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `config` | `FiltersConfig` | Required | Filter configuration object |
| `mode` | `"tabs" \| "dropdown"` | `"tabs"` | Display mode |
| `className` | `string` | `""` | Additional CSS classes |
| `dropdownButtonText` | `string` | `"Filters"` | Dropdown button label |
| `dropdownIcon` | `React.ReactNode` | `<Filter />` | Dropdown button icon |
| `dropdownButtonSize` | `"sm" \| "md" \| "lg"` | `"md"` | Dropdown button size |

### useAllSearchParams Hook

```tsx
import { useAllSearchParams } from "@/hooks/shared/use-query-params";

const params = useAllSearchParams();
// Returns: { [key: string]: string }
```

### useSetQueryParams Hook

```tsx
import { useSetQueryParams } from "@/hooks/shared/use-query-params";

const { setMultipleParams } = useSetQueryParams();

setMultipleParams({
  params: {
    search: "john",
    status: "active",
    role: null, // Removes 'role' from URL
  },
  replace: true, // Use replace instead of push
});
```

---

## Examples

### Example 1: User Management Filters

```tsx
const userFilters: FiltersConfig = {
  filters: [
    {
      name: "Search Users",
      param: "search",
      type: "text",
      placeholder: "Search by name or email...",
    },
    {
      name: "Status",
      param: "status",
      type: "select",
      options: [
        { label: "All", value: "all" },
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
        { label: "Pending", value: "pending" },
      ],
    },
    {
      name: "Role",
      param: "role",
      type: "multiselect",
      options: [
        { label: "Admin", value: "admin" },
        { label: "User", value: "user" },
        { label: "Moderator", value: "moderator" },
      ],
    },
    {
      name: "Created After",
      param: "createdAfter",
      type: "date",
    },
  ],
  showReset: true,
  resetButtonText: "Clear All",
};

<UniversalFilters config={userFilters} mode="tabs" />
```

### Example 2: E-Commerce Product Filters

```tsx
const productFilters: FiltersConfig = {
  filters: [
    {
      name: "Search Products",
      param: "q",
      type: "search",
      placeholder: "Search products...",
    },
    {
      name: "Category",
      param: "category",
      type: "select",
      options: [
        { label: "All Categories", value: "all" },
        { label: "Electronics", value: "electronics" },
        { label: "Clothing", value: "clothing" },
        { label: "Books", value: "books" },
      ],
    },
    {
      name: "Price Range",
      param: "maxPrice",
      type: "number",
      min: 0,
      max: 10000,
      placeholder: "Max price",
    },
    {
      name: "In Stock Only",
      param: "inStock",
      type: "checkbox",
    },
    {
      name: "Sort By",
      param: "sortBy",
      type: "radio",
      options: [
        { label: "Newest", value: "newest" },
        { label: "Price: Low to High", value: "price_asc" },
        { label: "Price: High to Low", value: "price_desc" },
        { label: "Most Popular", value: "popular" },
      ],
    },
  ],
  showReset: true,
  showApplyButton: true,
  applyButtonText: "Apply Filters",
  onApply: (values) => {
    console.log("Applied filters:", values);
  },
};

<UniversalFilters
  config={productFilters}
  mode="dropdown"
  dropdownButtonSize="lg"
/>
```

### Example 3: Dropdown Mode with Custom Icon

```tsx
import { SlidersHorizontal } from "lucide-react";

<UniversalFilters
  config={filtersConfig}
  mode="dropdown"
  dropdownButtonText="Filter Results"
  dropdownIcon={<SlidersHorizontal />}
  dropdownButtonSize="md"
  className="mb-4"
/>
```

### Example 4: Event Filters

```tsx
const eventFilters: FiltersConfig = {
  filters: [
    {
      name: "Event Name",
      param: "name",
      type: "text",
      placeholder: "Search events...",
    },
    {
      name: "Event Type",
      param: "type",
      type: "checkbox-group",
      options: [
        { label: "Conference", value: "conference" },
        { label: "Workshop", value: "workshop" },
        { label: "Webinar", value: "webinar" },
        { label: "Meetup", value: "meetup" },
      ],
    },
    {
      name: "Start Date",
      param: "startDate",
      type: "date",
    },
    {
      name: "End Date",
      param: "endDate",
      type: "date",
    },
    {
      name: "Location",
      param: "location",
      type: "text",
      placeholder: "City or venue",
    },
  ],
  showReset: true,
};

<UniversalFilters config={eventFilters} mode="tabs" />
```

---

## Best Practices

### 1. Use Meaningful Parameter Names

```tsx
// ✅ Good
{ param: "search", name: "Search Users" }
{ param: "status", name: "Status" }
{ param: "createdAfter", name: "Created After" }

// ❌ Bad
{ param: "s", name: "Search" }
{ param: "f1", name: "Filter 1" }
```

### 2. Provide Default Values for Select Filters

```tsx
{
  name: "Status",
  param: "status",
  type: "select",
  options: [
    { label: "All Statuses", value: "all" }, // ✅ Provides clear default
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
  ],
}
```

### 3. Group Related Filters

```tsx
// ✅ Good - Date range together
filters: [
  { name: "Start Date", param: "startDate", type: "date" },
  { name: "End Date", param: "endDate", type: "date" },
  { name: "Status", param: "status", type: "select", options: [...] },
]
```

### 4. Use Appropriate Input Types

```tsx
// ✅ Good - Use specific types
{ param: "email", type: "email" }      // Email validation
{ param: "phone", type: "phone" }      // Phone formatting
{ param: "age", type: "number" }       // Number input

// ❌ Bad - Generic text for everything
{ param: "email", type: "text" }
{ param: "age", type: "text" }
```

### 5. Limit Filter Count in Dropdown Mode

For better UX, limit to 6-8 filters in dropdown mode. For more filters, consider:
- Using tabs mode instead
- Categorizing filters into multiple dropdowns
- Progressive disclosure (show more/less)

### 6. Provide Helper Text

```tsx
{
  name: "Price Range",
  param: "maxPrice",
  type: "number",
  placeholder: "Enter max price",
  helperText: "Leave empty for no limit", // ✅ Helpful guidance
}
```

### 7. Handle Filter Reset Properly

```tsx
const filtersConfig: FiltersConfig = {
  filters: [...],
  showReset: true,
  onReset: () => {
    // ✅ Refetch data or update state
    queryClient.invalidateQueries(['users']);
  },
};
```

### 8. Debounce Considerations

The component automatically debounces text inputs (500ms). For real-time filtering needs:

```tsx
// Text inputs are debounced by 500ms
// Consider this in your UX design
{ type: "text" }  // Debounced

// Select/checkbox update immediately
{ type: "select" }    // Immediate
{ type: "checkbox" }  // Immediate
```

---

## TypeScript Interfaces

### Complete Type Definitions

```typescript
export type FilterType =
  | "text"
  | "email"
  | "phone"
  | "number"
  | "date"
  | "datetime-local"
  | "search"
  | "url"
  | "textarea"
  | "select"
  | "multiselect"
  | "checkbox"
  | "checkbox-group"
  | "radio"
  | "radio-group";

export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
  description?: string;
}

export interface FilterConfig {
  name: string;
  param: string;
  type: FilterType;
  placeholder?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  defaultValue?: any;
  options?: SelectOption[];
  min?: number;
  max?: number;
  step?: number;
}

export interface FiltersConfig {
  filters: FilterConfig[];
  showReset?: boolean;
  resetButtonText?: string;
  showApplyButton?: boolean;
  applyButtonText?: string;
  onReset?: () => void;
  onApply?: (values: Record<string, any>) => void;
}
```

---

## Troubleshooting

### Filters not updating

**Problem:** Filter values don't update when URL changes

**Solution:** Make sure you're using the component in a Client Component:

```tsx
"use client"; // ✅ Add this at the top

import UniversalFilters from "@/components/shared/universal-filters";
```

### Dropdown not closing

**Problem:** Dropdown stays open when clicking outside

**Solution:** Ensure the `useClickOutside` hook is properly implemented and the component is not re-rendering unnecessarily.

### Debounce too slow/fast

**Problem:** Text input debounce timing is not suitable

**Solution:** Modify the debounce delay in `universal-filters.tsx`:

```tsx
// Change this value (default is 500ms)
debounceTimers.current[param] = setTimeout(applyFilter, 500);
```

### URL params not syncing

**Problem:** Filter values in URL are out of sync

**Solution:** Ensure you're using `useAllSearchParams` correctly and the component is mounted in the page:

```tsx
const params = useAllSearchParams();

// Use params in your data fetching
useEffect(() => {
  fetchData(params);
}, [params]);
```

---

## Advanced Usage

### Custom Filter Rendering

If you need custom filter behavior, you can extend the component:

```tsx
// Wrap UniversalFilters with custom logic
export function CustomFilters() {
  const params = useAllSearchParams();
  
  useEffect(() => {
    // Custom side effect when filters change
    console.log("Filters changed:", params);
  }, [params]);
  
  return (
    <UniversalFilters
      config={filtersConfig}
      mode="tabs"
    />
  );
}
```

### Integration with React Query

```tsx
import { useQuery } from "@tanstack/react-query";
import { useAllSearchParams } from "@/hooks/shared/use-query-params";

export default function UsersPage() {
  const params = useAllSearchParams();
  
  const { data, isLoading } = useQuery({
    queryKey: ["users", params],
    queryFn: () => fetchUsers(params),
  });
  
  return (
    <>
      <UniversalFilters config={userFilters} />
      {isLoading ? <Loading /> : <UserTable data={data} />}
    </>
  );
}
```

---

## Migration Guide

### From Custom Filters to UniversalFilters

Before:
```tsx
const [search, setSearch] = useState("");
const [status, setStatus] = useState("all");

<input value={search} onChange={(e) => setSearch(e.target.value)} />
<select value={status} onChange={(e) => setStatus(e.target.value)}>
  {/* options */}
</select>
```

After:
```tsx
const filtersConfig: FiltersConfig = {
  filters: [
    { name: "Search", param: "search", type: "text" },
    { name: "Status", param: "status", type: "select", options: [...] },
  ],
};

<UniversalFilters config={filtersConfig} />
```

---

## Support

For issues, questions, or contributions:
- GitHub Issues: [Report an issue](https://github.com/aceiny/NextJs-Starter-Kit/issues)
- Documentation: [Full documentation](https://github.com/aceiny/NextJs-Starter-Kit/tree/main/docs)
- Examples: [See examples](https://github.com/aceiny/NextJs-Starter-Kit/tree/main/examples)

---

**Last Updated:** January 2026  
**Version:** 1.0.0
