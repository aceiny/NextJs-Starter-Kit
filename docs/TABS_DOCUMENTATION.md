# 📑 Tabs Component Documentation

A flexible, accessible tabs component built with HeroUI, featuring support for icons, badges, custom content, and multiple layout options.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Quick Start](#quick-start)
- [API Reference](#api-reference)
- [Usage Examples](#usage-examples)
- [Advanced Features](#advanced-features)
- [Styling & Customization](#styling--customization)
- [Best Practices](#best-practices)
- [Accessibility](#accessibility)

---

## Overview

The `TabsComponent` provides a complete solution for managing tabbed interfaces with:

✅ **Flexible Content** - Support for any React content in tabs and panels  
✅ **Icon Support** - Built-in Lucide icon integration  
✅ **Badges & Custom Content** - Add start/end content to tab headers  
✅ **Multiple Variants** - Solid, bordered, light, and underlined styles  
✅ **Controlled & Uncontrolled** - Full state management flexibility  
✅ **Responsive Layouts** - Horizontal and vertical orientations  
✅ **Link Support** - Navigate between routes with tab clicks  
✅ **TypeScript Support** - Complete type safety  
✅ **Accessibility** - WCAG compliant with keyboard navigation

---

## Quick Start

### Basic Usage

```tsx
import { TabsComponent } from "@/components/shared/Tabs";

function MyComponent() {
  const tabs = [
    {
      key: "photos",
      title: "Photos",
      content: <div>Photo gallery content</div>,
    },
    {
      key: "music",
      title: "Music",
      content: <div>Music library content</div>,
    },
    {
      key: "videos",
      title: "Videos",
      content: <div>Video collection content</div>,
    },
  ];

  return <TabsComponent items={tabs} defaultSelectedKey="photos" />;
}
```

### With Icons

```tsx
import { Camera, Music, Video } from "lucide-react";

const tabs = [
  {
    key: "photos",
    title: "Photos",
    icon: Camera,
    content: <PhotoGallery />,
  },
  {
    key: "music",
    title: "Music",
    icon: Music,
    content: <MusicLibrary />,
  },
  {
    key: "videos",
    title: "Videos",
    icon: Video,
    content: <VideoCollection />,
  },
];

<TabsComponent items={tabs} defaultSelectedKey="photos" color="primary" />;
```

### Controlled State

```tsx
const [selectedTab, setSelectedTab] = useState("photos");

<TabsComponent
  items={tabs}
  selectedKey={selectedTab}
  onSelectionChange={setSelectedTab}
/>;
```

---

## API Reference

### TabsComponent Props

| Prop                 | Type        | Default      | Description                             |
| -------------------- | ----------- | ------------ | --------------------------------------- |
| `items`              | `TabItem[]` | **Required** | Array of tab items to render            |
| `defaultSelectedKey` | `string`    | -            | Default selected tab key (uncontrolled) |
| `selectedKey`        | `string`    | -            | Controlled selected tab key             |
| `disabledKeys`       | `string[]`  | -            | Array of keys for disabled tabs         |
| `isDisabled`         | `boolean`   | `false`      | Disable all tabs                        |
| `ariaLabel`          | `string`    | `"Tabs"`     | Accessibility label                     |

#### Appearance Props

| Prop        | Type                                                                                    | Default     | Description          |
| ----------- | --------------------------------------------------------------------------------------- | ----------- | -------------------- |
| `variant`   | `"solid"` \| `"bordered"` \| `"light"` \| `"underlined"`                                | `"solid"`   | Visual style variant |
| `color`     | `"default"` \| `"primary"` \| `"secondary"` \| `"success"` \| `"warning"` \| `"danger"` | `"default"` | Color theme          |
| `size`      | `"sm"` \| `"md"` \| `"lg"`                                                              | `"md"`      | Size of tabs         |
| `radius`    | `"none"` \| `"sm"` \| `"md"` \| `"lg"` \| `"full"`                                      | -           | Border radius        |
| `fullWidth` | `boolean`                                                                               | `false`     | Tabs take full width |

#### Layout Props

| Prop                      | Type                                          | Default | Description             |
| ------------------------- | --------------------------------------------- | ------- | ----------------------- |
| `placement`               | `"top"` \| `"bottom"` \| `"start"` \| `"end"` | `"top"` | Position of tab list    |
| `isVertical`              | `boolean`                                     | `false` | Vertical orientation    |
| `destroyInactiveTabPanel` | `boolean`                                     | `true`  | Unmount inactive panels |

#### Behavior Props

| Prop                     | Type                        | Default       | Description             |
| ------------------------ | --------------------------- | ------------- | ----------------------- |
| `keyboardActivation`     | `"automatic"` \| `"manual"` | `"automatic"` | Tab keyboard behavior   |
| `shouldSelectOnPressUp`  | `boolean`                   | `true`        | Select on press release |
| `disableCursorAnimation` | `boolean`                   | `false`       | Disable animated cursor |
| `disableAnimation`       | `boolean`                   | `false`       | Disable all animations  |

#### Styling Props

| Prop         | Type     | Description                |
| ------------ | -------- | -------------------------- |
| `className`  | `string` | Additional CSS classes     |
| `classNames` | `object` | Classes for specific slots |

#### Event Props

| Prop                | Type                    | Description             |
| ------------------- | ----------------------- | ----------------------- |
| `onSelectionChange` | `(key: string) => void` | Called when tab changes |

---

### TabItem Interface

```tsx
interface TabItem {
  key: string; // Unique identifier
  title: React.ReactNode; // Tab label
  content: React.ReactNode; // Tab panel content
  titleValue?: string; // Accessibility text value
  icon?: LucideIcon; // Icon component
  disabled?: boolean; // Disable this tab
  href?: string; // Link URL
  target?: string; // Link target
  rel?: string; // Link rel attribute
  download?: boolean | string; // Download attribute
  className?: string; // Custom CSS classes
  startContent?: React.ReactNode; // Content before title
  endContent?: React.ReactNode; // Content after title
}
```

---

## Usage Examples

### Basic Tabs with Different Variants

```tsx
// Solid (default)
<TabsComponent items={tabs} variant="solid" />

// Bordered
<TabsComponent items={tabs} variant="bordered" />

// Light
<TabsComponent items={tabs} variant="light" />

// Underlined
<TabsComponent items={tabs} variant="underlined" />
```

### Color Themes

```tsx
<TabsComponent items={tabs} color="primary" />
<TabsComponent items={tabs} color="secondary" />
<TabsComponent items={tabs} color="success" />
<TabsComponent items={tabs} color="warning" />
<TabsComponent items={tabs} color="danger" />
```

### Sizes

```tsx
<TabsComponent items={tabs} size="sm" />   // Small
<TabsComponent items={tabs} size="md" />   // Medium (default)
<TabsComponent items={tabs} size="lg" />   // Large
```

### With Badges

```tsx
const tabsWithBadges = [
  {
    key: "inbox",
    title: "Inbox",
    endContent: <Badge>12</Badge>,
    content: <InboxView />,
  },
  {
    key: "drafts",
    title: "Drafts",
    endContent: <Badge variant="secondary">3</Badge>,
    content: <DraftsView />,
  },
];

<TabsComponent items={tabsWithBadges} />;
```

### Disabled Tabs

```tsx
// Disable specific tabs
<TabsComponent
  items={tabs}
  disabledKeys={["music", "videos"]}
  defaultSelectedKey="photos"
/>

// Disable all tabs
<TabsComponent items={tabs} isDisabled />
```

### Full Width

```tsx
<TabsComponent items={tabs} fullWidth />
```

### Different Placements

```tsx
// Top (default)
<TabsComponent items={tabs} placement="top" />

// Bottom
<TabsComponent items={tabs} placement="bottom" />

// Start (left)
<TabsComponent items={tabs} placement="start" className="h-64" />

// End (right)
<TabsComponent items={tabs} placement="end" className="h-64" />
```

### Vertical Tabs

```tsx
<TabsComponent
  items={tabs}
  isVertical
  defaultSelectedKey="photos"
  className="h-96"
/>
```

### Tabs as Links (Next.js)

```tsx
"use client";
import { usePathname } from "next/navigation";

function Navigation() {
  const pathname = usePathname();

  const navTabs = [
    {
      key: "home",
      title: "Home",
      href: "/",
      content: null,
    },
    {
      key: "about",
      title: "About",
      href: "/about",
      content: null,
    },
    {
      key: "contact",
      title: "Contact",
      href: "/contact",
      content: null,
    },
  ];

  return (
    <TabsComponent
      items={navTabs}
      selectedKey={pathname}
      variant="underlined"
    />
  );
}
```

---

## Advanced Features

### Custom Tab Content

```tsx
const customTabs = [
  {
    key: "profile",
    title: (
      <div className="flex items-center gap-2">
        <User className="w-4 h-4" />
        <span>Profile</span>
        <Badge variant="destructive">New</Badge>
      </div>
    ),
    content: <ProfilePanel />,
  },
];
```

### Preserving Inactive Panels

By default, inactive tab panels are unmounted. To keep them mounted:

```tsx
<TabsComponent items={tabs} destroyInactiveTabPanel={false} />
```

This is useful for:

- Preserving form state
- Preventing unnecessary re-renders
- Keeping scroll positions

### Manual Keyboard Activation

```tsx
<TabsComponent items={tabs} keyboardActivation="manual" />
```

With `automatic` (default), arrow keys immediately switch tabs.  
With `manual`, arrow keys focus tabs but require Enter/Space to activate.

### Complex Panel Content

```tsx
const tabs = [
  {
    key: "dashboard",
    title: "Dashboard",
    content: (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
        <div className="grid grid-cols-3 gap-4">
          <MetricCard />
          <MetricCard />
          <MetricCard />
        </div>
        <Chart />
      </div>
    ),
  },
];
```

---

## Styling & Customization

### Custom Slot Classes

```tsx
<TabsComponent
  items={tabs}
  classNames={{
    base: "w-full", // Container
    tabList: "gap-6 w-full", // Tab list wrapper
    tab: "max-w-fit px-0", // Individual tab
    tabContent: "text-sm", // Tab content wrapper
    cursor: "w-full bg-primary", // Active indicator
    panel: "pt-4", // Panel container
  }}
/>
```

### Custom Styles Example

```tsx
<TabsComponent
  items={tabs}
  variant="underlined"
  classNames={{
    tabList: "gap-6 relative rounded-none p-0 border-b border-divider",
    cursor: "w-full bg-gradient-to-r from-primary to-secondary h-1",
    tab: "max-w-fit px-0 h-12",
    tabContent: "group-data-[selected=true]:text-primary font-semibold",
  }}
/>
```

### Dynamic Classes Based on State

```tsx
const tabs = items.map((item) => ({
  ...item,
  className:
    item.key === activeKey ? "font-bold text-primary" : "text-muted-foreground",
}));
```

---

## Best Practices

### 1. Use Meaningful Keys

```tsx
// ✅ Good - descriptive keys
const tabs = [
  { key: "user-profile", title: "Profile", content: <Profile /> },
  { key: "account-settings", title: "Settings", content: <Settings /> },
];

// ❌ Bad - numeric keys
const tabs = [
  { key: "1", title: "Profile", content: <Profile /> },
  { key: "2", title: "Settings", content: <Settings /> },
];
```

### 2. Provide Accessible Labels

```tsx
<TabsComponent items={tabs} ariaLabel="User account navigation" />
```

### 3. Keep Tab Count Reasonable

- **Desktop**: 5-7 tabs maximum
- **Mobile**: 3-5 tabs maximum
- Use dropdowns for overflow items

### 4. Use Controlled State for Forms

```tsx
// Prevent accidental navigation away from unsaved forms
const [selectedTab, setSelectedTab] = useState("edit");
const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

const handleTabChange = (key: string) => {
  if (hasUnsavedChanges) {
    if (confirm("You have unsaved changes. Continue?")) {
      setSelectedTab(key);
      setHasUnsavedChanges(false);
    }
  } else {
    setSelectedTab(key);
  }
};

<TabsComponent
  items={tabs}
  selectedKey={selectedTab}
  onSelectionChange={handleTabChange}
/>;
```

### 5. Loading States

```tsx
const tabs = isLoading
  ? [{ key: "loading", title: "Loading...", content: <Spinner /> }]
  : actualTabs;
```

### 6. Optimize Performance

```tsx
// Use destroyInactiveTabPanel to unmount heavy components
<TabsComponent
  items={tabs}
  destroyInactiveTabPanel={true}  // Unmount inactive panels
/>

// Or keep mounted for frequently switched tabs
<TabsComponent
  items={tabs}
  destroyInactiveTabPanel={false}  // Keep all mounted
/>
```

---

## Accessibility

### Keyboard Navigation

The component supports full keyboard navigation:

- **Tab**: Focus tabs
- **Arrow Keys**: Navigate between tabs
- **Enter/Space**: Activate focused tab
- **Home**: First tab
- **End**: Last tab

### ARIA Attributes

Automatically applied:

- `role="tablist"` on tab container
- `role="tab"` on each tab
- `role="tabpanel"` on each panel
- `aria-selected` on active tab
- `aria-controls` linking tabs to panels
- `aria-labelledby` linking panels to tabs

### Screen Reader Support

```tsx
// Provide descriptive labels
<TabsComponent items={tabs} ariaLabel="Product information sections" />;

// Use titleValue for complex tab titles
const tabs = [
  {
    key: "stats",
    title: (
      <span>
        Stats <Badge>New</Badge>
      </span>
    ),
    titleValue: "Statistics (has new updates)", // For screen readers
    content: <Stats />,
  },
];
```

---

## Common Patterns

### Tabs with Counts

```tsx
const tabs = [
  {
    key: "all",
    title: "All",
    endContent: <span className="text-xs text-muted-foreground ml-2">234</span>,
    content: <AllItems />,
  },
  {
    key: "active",
    title: "Active",
    endContent: <span className="text-xs text-success ml-2">12</span>,
    content: <ActiveItems />,
  },
];
```

### Tabs with Loading

```tsx
function TabsWithData() {
  const { data, isLoading } = useQuery("tabs-data");

  if (isLoading) {
    return <Skeleton />;
  }

  const tabs = data.map((item) => ({
    key: item.id,
    title: item.name,
    content: <ItemDetail id={item.id} />,
  }));

  return <TabsComponent items={tabs} />;
}
```

### Responsive Tabs

```tsx
<TabsComponent
  items={tabs}
  className="w-full"
  variant="underlined"
  // On mobile, scrollable tabs
  classNames={{
    tabList: "overflow-x-auto flex-nowrap",
  }}
/>
```

---

## Troubleshooting

### Tabs Not Switching

**Problem**: Clicking tabs doesn't change the content.

**Solution**: Ensure you're using unique keys for each tab:

```tsx
// ✅ Correct
const tabs = [
  { key: "tab1", title: "Tab 1", content: <Content1 /> },
  { key: "tab2", title: "Tab 2", content: <Content2 /> },
];

// ❌ Incorrect - duplicate keys
const tabs = [
  { key: "tab", title: "Tab 1", content: <Content1 /> },
  { key: "tab", title: "Tab 2", content: <Content2 /> },
];
```

### Controlled State Not Working

**Problem**: selectedKey prop doesn't control the tabs.

**Solution**: Must also provide onSelectionChange:

```tsx
// ✅ Correct
<TabsComponent
  items={tabs}
  selectedKey={selected}
  onSelectionChange={setSelected}
/>

// ❌ Incorrect - missing onSelectionChange
<TabsComponent
  items={tabs}
  selectedKey={selected}
/>
```

### Content Not Rendering

**Problem**: Tab panels are empty.

**Solution**: Ensure content is provided in each TabItem:

```tsx
// ✅ Correct
{ key: "tab1", title: "Tab 1", content: <div>Content here</div> }

// ❌ Incorrect - missing content
{ key: "tab1", title: "Tab 1" }
```

---

## Examples

See [examples/tabs/tabs.tsx](../examples/tabs/tabs.tsx) for complete working examples including:

- Basic tabs with all variants
- Tabs with icons and badges
- Controlled and uncontrolled usage
- Different placements and orientations
- Custom styling examples
- Disabled states
- Full-width layouts

---

## Related Components

- **DialogCreator** - For modal dialogs within tabs
- **ActionMenu** - For dropdown menus in tab actions
- **DataTable** - For tabular data within tab panels
- **Form Components** - For forms within tab panels

---

## Migration Guide

### From React Tabs

```tsx
// Before (react-tabs)
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";

<Tabs>
  <TabList>
    <Tab>Photos</Tab>
    <Tab>Music</Tab>
  </TabList>
  <TabPanel>
    <Photos />
  </TabPanel>
  <TabPanel>
    <Music />
  </TabPanel>
</Tabs>;

// After (TabsComponent)
const tabs = [
  { key: "photos", title: "Photos", content: <Photos /> },
  { key: "music", title: "Music", content: <Music /> },
];

<TabsComponent items={tabs} />;
```

### From MUI Tabs

```tsx
// Before (MUI)
<Tabs value={value} onChange={handleChange}>
  <Tab label="Photos" />
  <Tab label="Music" />
</Tabs>
<TabPanel value={value} index={0}><Photos /></TabPanel>
<TabPanel value={value} index={1}><Music /></TabPanel>

// After (TabsComponent)
<TabsComponent
  items={tabs}
  selectedKey={value}
  onSelectionChange={handleChange}
/>
```

---

## License

MIT License - see [LICENSE](../LICENSE) for details.
