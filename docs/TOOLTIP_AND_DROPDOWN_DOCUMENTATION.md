# Tooltip & Dropdown Menu Documentation

This document covers the **CustomTooltip** and **ActionMenu** components - reusable UI elements for displaying contextual information and action menus.

---

## Table of Contents

- [CustomTooltip](#customtooltip)
  - [Basic Usage](#basic-usage)
  - [Variants](#variants)
  - [Sizes](#sizes)
  - [Positioning](#positioning)
  - [Helper Components](#helper-components)
  - [Props Reference](#props-reference)
- [ActionMenu](#actionmenu)
  - [Basic Usage](#actionmenu-basic-usage)
  - [Grouped Actions](#grouped-actions)
  - [Checkbox & Radio Menus](#checkbox--radio-menus)
  - [Submenus](#submenus)
  - [Trigger Variants](#trigger-variants)
  - [Props Reference](#actionmenu-props-reference)

---

## CustomTooltip

A variant-based tooltip component built on shadcn/ui tooltip with additional customization options.

### Basic Usage

```tsx
import { CustomTooltip } from "@/components/CustomTooltip";

function Example() {
  return (
    <CustomTooltip content="This is a helpful tip">
      <button>Hover me</button>
    </CustomTooltip>
  );
}
```

### Variants

Four built-in variants with appropriate styling:

```tsx
import {
  CustomTooltip,
  InfoTooltip,
  SuccessTooltip,
  WarningTooltip,
  ErrorTooltip,
} from "@/components/CustomTooltip";

// Using variant prop
<CustomTooltip content="Information message" variant="info">
  <span>Info</span>
</CustomTooltip>

<CustomTooltip content="Success message" variant="success">
  <span>Success</span>
</CustomTooltip>

<CustomTooltip content="Warning message" variant="warning">
  <span>Warning</span>
</CustomTooltip>

<CustomTooltip content="Error message" variant="error">
  <span>Error</span>
</CustomTooltip>

// Or use helper components
<InfoTooltip content="This is informational">
  <button>Info</button>
</InfoTooltip>

<SuccessTooltip content="Operation succeeded!">
  <button>Success</button>
</SuccessTooltip>

<WarningTooltip content="Proceed with caution">
  <button>Warning</button>
</WarningTooltip>

<ErrorTooltip content="Something went wrong">
  <button>Error</button>
</ErrorTooltip>
```

### Sizes

Three size options: `sm`, `md` (default), and `lg`:

```tsx
<CustomTooltip content="Small tooltip" size="sm">
  <span>Small</span>
</CustomTooltip>

<CustomTooltip content="Medium tooltip (default)" size="md">
  <span>Medium</span>
</CustomTooltip>

<CustomTooltip content="Large tooltip with more padding" size="lg">
  <span>Large</span>
</CustomTooltip>
```

### Positioning

Control tooltip placement with `side` and `align` props:

```tsx
// Side: top, bottom, left, right
<CustomTooltip content="Above the element" side="top">
  <span>Top</span>
</CustomTooltip>

<CustomTooltip content="Below the element" side="bottom">
  <span>Bottom</span>
</CustomTooltip>

<CustomTooltip content="Left of the element" side="left">
  <span>Left</span>
</CustomTooltip>

<CustomTooltip content="Right of the element" side="right">
  <span>Right</span>
</CustomTooltip>

// Alignment: start, center, end
<CustomTooltip content="Aligned to start" side="top" align="start">
  <span>Start aligned</span>
</CustomTooltip>

<CustomTooltip content="Centered (default)" side="top" align="center">
  <span>Center aligned</span>
</CustomTooltip>

<CustomTooltip content="Aligned to end" side="top" align="end">
  <span>End aligned</span>
</CustomTooltip>
```

### Custom Delay

Control how quickly the tooltip appears:

```tsx
// Quick tooltip (100ms delay)
<CustomTooltip content="Fast!" delayDuration={100}>
  <span>Quick</span>
</CustomTooltip>

// Slow tooltip (1000ms delay)
<CustomTooltip content="Took a while..." delayDuration={1000}>
  <span>Slow</span>
</CustomTooltip>
```

### Helper Components

Pre-configured variant components for convenience:

```tsx
import {
  InfoTooltip,
  SuccessTooltip,
  WarningTooltip,
  ErrorTooltip,
} from "@/components/CustomTooltip";

// These are shortcuts for CustomTooltip with variant prop
<InfoTooltip content="Info variant pre-applied">
  <span>ℹ️</span>
</InfoTooltip>;
```

### Props Reference

| Prop            | Type                                          | Default     | Description               |
| --------------- | --------------------------------------------- | ----------- | ------------------------- |
| `content`       | `ReactNode`                                   | required    | Tooltip content           |
| `children`      | `ReactNode`                                   | required    | Trigger element           |
| `variant`       | `"info" \| "success" \| "warning" \| "error"` | `undefined` | Visual variant            |
| `size`          | `"sm" \| "md" \| "lg"`                        | `"md"`      | Tooltip size              |
| `side`          | `"top" \| "bottom" \| "left" \| "right"`      | `"top"`     | Placement side            |
| `align`         | `"start" \| "center" \| "end"`                | `"center"`  | Alignment                 |
| `delayDuration` | `number`                                      | `200`       | Delay before showing (ms) |
| `className`     | `string`                                      | `undefined` | Additional CSS classes    |

---

## ActionMenu

A customizable dropdown menu component for displaying actions, with support for groups, checkboxes, radios, and submenus.

### ActionMenu Basic Usage

```tsx
import { ActionMenu } from "@/components/ActionMenu";

function Example() {
  return (
    <ActionMenu
      items={[
        {
          id: "edit",
          label: "Edit",
          onClick: () => console.log("Edit clicked"),
        },
        {
          id: "duplicate",
          label: "Duplicate",
          onClick: () => console.log("Duplicate clicked"),
        },
        {
          id: "delete",
          label: "Delete",
          onClick: () => console.log("Delete clicked"),
          variant: "destructive",
        },
      ]}
    />
  );
}
```

### Grouped Actions

Organize actions into logical groups:

```tsx
import { ActionMenu } from "@/components/ActionMenu";

function Example() {
  return (
    <ActionMenu
      groups={[
        {
          label: "Edit",
          items: [
            { id: "undo", label: "Undo", shortcut: "⌘Z", onClick: () => {} },
            { id: "redo", label: "Redo", shortcut: "⌘Y", onClick: () => {} },
          ],
        },
        {
          label: "Clipboard",
          items: [
            { id: "cut", label: "Cut", shortcut: "⌘X", onClick: () => {} },
            { id: "copy", label: "Copy", shortcut: "⌘C", onClick: () => {} },
            { id: "paste", label: "Paste", shortcut: "⌘V", onClick: () => {} },
          ],
        },
        {
          // Group without label
          items: [
            {
              id: "delete",
              label: "Delete",
              variant: "destructive",
              onClick: () => {},
            },
          ],
        },
      ]}
    />
  ); ActionMenu } from "@/components/ActionMenu";
import { useState } from "react";

function Example() {
  const [showStatusBar, setShowStatusBar] = useState(true);
  const [showPanel, setShowPanel] = useState(false);
  const [fontSize, setFontSize] = useState("medium");

  return (
    <ActionMenu
      trigger={<button>Settings</button>}
      checkboxItems={[
        {
          id: "statusbar",
          label: "Show Status Bar",
          checked: showStatusBar,
          onCheckedChange: setShowStatusBar,
        },
        {
          id: "panel",
          label: "Show Panel",
          checked: showPanel,
          onCheckedChange: setShowPanel,
        },
      ]}
      radioGroups={[
        {
          label: "Font Size",
          value: fontSize,
          onValueChange: setFontSize,
          options: [
            { id: "small", label: "Small" },
            { id: "medium", label: "Medium" },
            { id: "large", label: "Large" },
          ],
        },
      ]el: "Medium" },
      { value: "large", label: "Large" },
    ],
  };

  return (
    <ActionMenu
      trigger={<button>Settings</button>}
      checkboxItems={checkboxItems}
      radioItems={radioItems}
    />
  );
}
```

### Submenus

Create nested dropdown menus:

```tsx
import { ActionMenu, ActionMenuSubmenu } from "@/components/ActionMenu";

function Example()  } from "@/components/ActionMenu";

function Example() {
  return (
    <ActionMenu
      items={[{ id: "download", label: "Download", onClick: () => {} }]}
      submenus={[
        {
          label: "Share",
          items: [
            { id: "email", label: "Email", onClick: () => {} },
            { id: "message", label: "Message", onClick: () => {} },
            { id: "link", label: "Copy Link", onClick: () => {} },
          ],
        },
        {
          label: "Export As",
          items: [
            { id: "pdf", label: "PDF", onClick: () => {} },
            { id: "png", label: "PNG", onClick: () => {} },
            { id: "svg", label: "SVG", onClick: () => {} },
          ],
        },
      ]
}
```

### Trigger Variants

Built-in trigger styles:

```tCustom Header

Use `customHeader` for complex menu headers with JSX content:

```tsx
import { ActionMenu } from "@/components/ActionMenu";
import { User, Settings, LogOut } from "lucide-react";

function Example() {
  return (
    <ActionMenu
      customHeader={
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
            JD
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">John Doe</span>
            <span className="text-xs text-muted-foreground">
              john@example.com
            </span>
          </div>
        </div>
      }
import { ActionMenu } from "@/components/ActionMenu";

<ActionMenu
  items={[
    { id: "edit", label: "Edit", onClick: () => {} },
    { id: "archive", label: "Archive", onClick: () => {}, disabled: true },
    { id: "delete", label: "Delete", onClick: () => {}, variant: "destructive" },
  ]}
/>
```

### Keyboard Shortcuts

Display keyboard shortcut hints:

```tsx
import { ActionMenu } from "@/components/ActionMenu";

<ActionMenu
  items={[
    { id: "new", label: "New File", shortcut: "⌘N", onClick: () => {} },
    { id: "open", label: "Open", shortcut: "⌘O", onClick: () => {} },
    { id: "save", label: "Save", shortcut: "⌘S", onClick: () => {} },
    { id: "saveas", label: "Save As...", shortcut: "⇧⌘S", onClick: () => {} },
  ]}  | Type                                 | Default        | Description                                                      |
| ------------------ | ------------------------------------ | -------------- | ---------------------------------------------------------------- |
| `items`            | `ActionMenuItem[]`                   | `undefined`    | Simple action items                                              |
| `groups`           | `ActionMenuGroup[]`                  | `undefined`    | Grouped action items                                             |
| `checkboxItems`    | `ActionMenuCheckboxItem[]`           | `undefined`    | Checkbox items                                                   |
| `radioGroups`      | `ActionMenuRadioGroup[]`             | `undefined`    | Radio button groups                                              |
| `submenus`         | `ActionMenuSubmenu[]`                | `undefined`    | Nested submenus                                                  |
| `menuLabel`        | `string`                             | `undefined`    | Simple text header at the top of the menu                        |
| `customHeader`     | `ReactNode`                          | `undefined`    | Custom JSX header for complex layouts (user profiles, stats, etc.) |
| `trigger`          | `ReactNode`                          | Dots icon      | Custom trigger element                                           |
| `triggerVariant`   | `"horizontal" \| "vertical"`         | `"horizontal"` | Built-in trigger style                                           |
| `buttonVariant`    | `"default" \| "ghost" \| "outline" \| "secondary"` | `"ghost"` | Trigger button variant                                   |
| `buttonSize` Item

| Prop        | Type                         | Description                            |
| ----------- | ---------------------------- | -------------------------------------- |
| `id`        | `string`                     | Unique identifier for the item         |
| `label`     | `string`                     | Display text                           |
| `icon`      | `LucideIcon`                 | Optional icon component                |
| `onClick`   | `() => void`                 | Click handler                          |
| `disabled`  | `boolean`                    | Whether the item is disabled           |
| `shortcut`  | `string`                     | Keyboard shortcut display (e.g., "⌘K") |
| `variant`   | `"default" \| "destructive"` | Destructive/danger styling             |
| `separator` | `boolean`                    | Whether to show separator after item   |

#### ActionMenuGroup

| Prop    | Type               | Description          |
| ------- | ------------------ | -------------------- |
| `label` | `string`           | Optional group label |
| `items` | `ActionMenuItem[]` | Actions in the group |

#### ActionMenuCheckboxItem

| Prop              | Type                         | Description                |
| ----------------- | ---------------------------- | -------------------------- |
| `id`              | `string`                     | Unique identifier          |
| `label`           | `string`                     | Display text               |
| `checked`         | `boolean`                    | Whether checked            |
| `onCheckedChange` | `(checked: boolean) => void` | Change handler             |
| `disabled`        | `boolean`                    | Whether the item is disabled |
| `icon`            | `LucideIcon`                 | Optional icon component    |

#### ActionMenuRadioGroup

| Prop            | Type                                                                         | Description            |
| --------------- | ---------------------------------------------------------------------------- | ---------------------- |
| `label`         | `string`                                                                     | Optional group label   |
| `value`         | `string`                                                                     | Current selected value |
| `onValueChange` | `(value: string) => void`                                                    | Change handler         |
| `options`       | `{ id: string; label: string; icon?: LucideIcon; disabled?: boolean }[]`    | Radio options          |

#### ActionMenuSubmenu

| Prop    | Type               | Description          |
| ------- | ------------------ | -------------------- |
| `label` | `string`           | Submenu trigger text |
| `icon`  | `LucideIcon`       | Optional icon for the trigger |
| `items` | `ActionMenuItem
const actions: ActionMenuAction[] = [
  { label: "New File", shortcut: "⌘N", onClick: () => {} },
  { label: "Open", shortcut: "⌘O", onClick: () => {} },
  { label: "Save", shortcut: "⌘S", onClick: () => {} },
  { label: "Save As...", shortcut: "⇧⌘S", onClick: () => {} },
];
```

### ActionMenu Props Reference

#### ActionMenu Props

| Prop             | Type                                   | Default             | Description            |
| ---------------- | -------------------------------------- | ------------------- | ---------------------- |
| `actitems={[
        { id: "edit", label: "Edit", onClick: () => editUser(row) },
        { id: "view", label: "View Profile", onClick: () => viewProfile(row) },
        {
          id: "delete",
          label: "Delete",
          variant: "destructive",
          onClick: () => deleteUser(row),
        },
      ]}
    />
  )}
/>;
```

### User Profile Menu with Custom Header

```tsx
import { ActionMenu } from "@/components/ActionMenu";
import { User, Settings, HelpCircle, LogOut } from "lucide-react";

function UserMenu({ user }) {
  return (
    <ActionMenu
      customHeader={
        <div className="flex items-center gap-3">
          <img
            src={user.avatar}
            alt={user.name}
            className="h-10 w-10 rounded-full"
          />
          <div className="flex flex-col">
            <span className="text-sm font-medium">{user.name}</span>
            <span className="text-xs text-muted-foreground">{user.email}</span>
          </div>
        </div>
      }
      groups={[
        {
          items: [
            {
              id: "profile",
              label: "Profile",
              icon: User,
              onClick: () => navigateToProfile(),
            },
            {
              id: "settings",
              label: "Settings",
              icon: Settings,
              onClick: () => navigateToSettings(),
            },
          ],
        },
        {
          items: [
            {
              id: "help",
              label: "Help & Support",
              icon: HelpCircle,
              onClick: () => openHelpCenter(),
            },
          ],
        },
        {
          items: [
            {
              id: "logout",
              label: "Log out",
              icon: LogOut,
              variant: "destructive",
              onClick: () => handleLogout(),
            },
          ],
        },
      ]}
    />
  );
}
| Prop       | Type                         | Description                        |
| ---------- | ---------------------------- | ---------------------------------- |
| `label`    | `string`                     | Display text                       |
| `onClick`  | `() => void`                 | Click handler                      |
| `shortcut` | `string`                     | Optional keyboard shortcut display |
| `disabled` | `boolean`                    | Disable the item                   |
| `variant`  | `"default" \| "destructive"` | Visual variant                     |
| `icon`     | `ReactNode`                  | Optional icon                      |

#### ActionMenuGroup

| Prop    | Type                 | Description          |
| ------- | -------------------- | -------------------- |
| `label` | `string`             | Optional group label |
| `items` | `ActionMenuAction[]` | Actions in the group |

#### ActionMenuCheckbox

| Prop              | Type                         | Description      |
| ----------------- | ---------------------------- | ---------------- |
| `label`           | `string`                     | Display text     |
| `checked`         | `boolean`                    | Checked state    |
| `onCheckedChange` | `(checked: boolean) => void` | Change handler   |
| `disabled`        | `boolean`                    | Disable the item |

#### ActionMenuRadio

| Prop            | Type                                                     | Description            |
| --------------- | -------------------------------------------------------- | ---------------------- |
| `value`         | `string`                                                 | Current selected value |
| `onValueChange` | `(value: string) => void`                                | Change handler         |
| `items`         | `{ value: string; label: string; disabled?: boolean }[]` | Radio options          |

#### ActionMenuSubmenu

| Prop    | Type                 | Description          |
| ------- | -------------------- | -------------------- |
| `label` | `string`             | Submenu trigger text |
| `items` | `ActionMenuAction[]` | Submenu actions      |

---

## Examples

### DataTable with Actions

```tsx
import { DataTable } from "@/components/DataTable";
import { ActionMenu } from "@/components/ActionMenu";

const columns = [
  { key: "name", header: "Name", sortable: true },
  { key: "email", header: "Email", sortable: true },
  { key: "status", header: "Status" },
];

<DataTable
  columns={columns}
  data={users}
  actions={(row) => (
    <ActionMenu
      actions={[
        { label: "Edit", onClick: () => editUser(row) },
        { label: "View Profile", onClick: () => viewProfile(row) },
        {
          label: "Delete",
          variant: "destructive",
          onClick: () => deleteUser(row),
        },
      ]}
    />
  )}
/>;
```

### Form Field with Tooltip

```tsx
import { CustomTooltip } from "@/components/CustomTooltip";
import { RHFUniversalInput } from "@/components/form";
import { Info } from "lucide-react";

<div className="flex items-center gap-2">
  <label>API Key</label>
  <CustomTooltip
    content="Your API key can be found in Settings > Developer > API Keys"
    variant="info"
  >
    <Info className="w-4 h-4 text-gray-400 cursor-help" />
  </CustomTooltip>
</div>
<RHFUniversalInput control={control} name="apiKey" type="password" />
```

---

## Best Practices

### Tooltips

1. **Keep content brief** - Tooltips should provide quick context, not lengthy explanations
2. **Use appropriate variants** - Match the variant to the type of information
3. **Don't overuse** - Only add tooltips where they provide value
4. **Consider mobile** - Tooltips require hover, so ensure mobile alternatives exist

### Dropdown Menus

1. **Group related actions** - Use groups to organize logically related items
2. **Limit depth** - Avoid deeply nested submenus
3. **Highlight destructive actions** - Use `variant: "destructive"` for dangerous operations
4. **Add shortcuts** - Display keyboard shortcuts for power users
5. **Disable wisely** - Show disabled items to indicate unavailable actions, but consider hiding irrelevant ones

---

## Live Examples

Visit these routes to see the components in action:

- **Tooltips**: [/example/toast](http://localhost:3000/example/toast) (includes tooltip examples)
- **Dropdown Menus**: [/example/dropdown](http://localhost:3000/example/dropdown)
- **DataTable with Actions**: [/example/data-table](http://localhost:3000/example/data-table)
