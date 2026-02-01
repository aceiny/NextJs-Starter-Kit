# Charts & Analytics

This document describes the lightweight charts and analytics UI components included in the starter kit. These are minimal, theme-aware components built with ApexCharts and used to provide compact visuals in dashboards and cards.

## Overview

All Apex chart components now support two rendering modes:

- **Simple Mode** (`variant="simple"`) — Just the chart, no wrapper. Perfect for custom cards or inline usage.
- **Full Mode** (`variant="full"`) — Chart wrapped in a styled card with optional title, legend, and action menu.

## Common Props (All Apex Charts)

### Data Props
- `series` — Chart data (format varies by chart type)
- `categories` — X-axis labels (for bar/line/area charts)
- `labels` — Data labels (for pie charts)
- `height?: number` — Chart height in pixels
- `colors?: string[]` — Color palette for the chart

### Layout Props
- `variant?: "simple" | "full"` — Rendering mode. Default: `"simple"`
- `title?: string` — Chart title (shown in header when `variant="full"`)
- `showLegend?: boolean` — Display legend with colored keys. Default: `false`
- `legendPosition?: "top" | "bottom" | "left" | "right"` — Legend placement. Default: `"bottom"`
- `actions?: ActionMenuItem[]` — Dropdown menu actions (from `DropdownActionMenu` component)
- `className?: string` — Additional CSS classes for the wrapper

### ActionMenuItem Interface
```tsx
{
  id: string;
  label: string;
  icon?: LucideIcon;
  onClick?: () => void;
  variant?: "default" | "destructive";
  showDivider?: boolean;
}
```

## Chart Components

### Line Charts

**ApexLineChart** — Smooth line chart for trends and time-series data.

```tsx
// Simple mode
<ApexLineChart
  series={[{ name: "Revenue", data: [10, 20, 18, 24, 30] }]}
  categories={["Mon", "Tue", "Wed", "Thu", "Fri"]}
  colors={["#2065D1"]}
/>

// Full mode with legend and actions
<ApexLineChart
  variant="full"
  title="Weekly Performance"
  showLegend={true}
  legendPosition="bottom"
  series={[
    { name: "Revenue", data: [10, 20, 18, 24, 30] },
    { name: "Profit", data: [8, 15, 12, 20, 25] }
  ]}
  colors={["#2065D1", "#FFB020"]}
  actions={[
    {
      id: "download",
      label: "Download",
      icon: Download,
      onClick: () => downloadChart()
    }
  ]}
/>
```

---

### Bar Charts

**ApexBarChart** — Vertical bar chart.

Props (in addition to common props):
- `stacked?: boolean` — Enable stacking. Default: `false`

**ApexHorizontalBarChart** — Horizontal bar chart.

**ApexStackedBarChart** — Stacked vertical bar chart with configurable column width.

Props:
- `columnWidth?: string | number` — Column width (e.g., `"55%"` or `20`). Default: `"55%"`

**ApexStackedHorizontalBarChart** — Stacked horizontal bar chart.

```tsx
// Stacked bar with legend on the right
<ApexStackedBarChart
  variant="full"
  title="Sales by Product"
  showLegend={true}
  legendPosition="right"
  series={[
    { name: "Product A", data: [40, 30, 50, 70, 60] },
    { name: "Product B", data: [20, 25, 18, 15, 30] }
  ]}
  colors={["#2065D1", "#FFB020"]}
/>
```

---

### Area Charts

**ApexAreaChart** — Gradient area chart with customizable fill and grid.

Additional Props:
- `showGrid?: boolean` — Show background grid. Default: `false`
- `areaOpacity?: number` — Area fill opacity (0-1). Default: `0.16`
- `areaShadeIntensity?: number` — Gradient intensity. Default: `1`
- `showYAxisLabels?: boolean` — Show Y-axis labels. Default: `true`
- `showDataLabels?: boolean` — Show data point labels. Default: `false`

**ApexSplineAreaChart** — Smooth spline area chart with similar customization options.

```tsx
<ApexAreaChart
  variant="full"
  title="Traffic Overview"
  showLegend={true}
  legendPosition="top"
  series={[
    { name: "Visitors", data: [2, 4, 3, 5, 6] },
    { name: "Page Views", data: [3, 5, 4, 6, 7] }
  ]}
  showGrid={true}
  areaOpacity={0.3}
/>
```

---

### Pie Charts

**ApexPieChart** — Donut chart with center text showing hovered/selected slice.

**ApexFilledPieChart** — Solid pie chart with data labels on slices.

```tsx
// Pie chart with legend at bottom
<ApexFilledPieChart
  variant="full"
  title="Sales Distribution"
  showLegend={true}
  legendPosition="bottom"
  series={[55, 25, 20]}
  labels={["Product A", "Product B", "Product C"]}
  colors={["#2065D1", "#FFB020", "#06D6A0"]}
  actions={[
    {
      id: "export",
      label: "Export Data",
      icon: FileText,
      onClick: () => exportData()
    }
  ]}
/>
```

---

### Mini Charts

These are lightweight charts for compact widgets and cards. They do not support the full layout features.

### `ApexSparkline`

A thin, inline sparkline used for compact numeric series displays.

Props

- `series?: number[] | Record<string, any>[]` — Array of numbers or objects with numeric values.
- `dataKey?: string` — When passing object series, use `dataKey` to select the numeric value (e.g., `"visits"`).
- `height?: number` — Chart height in px. Default: `48`.
- `color?: string` — Primary chart color.

Behavior

- If `series` is an object-array, the chart maps `label` fields to x-axis categories and `dataKey` for the values.
- Tooltip shows the category (x-axis label) as the title and the numeric value in the body.

Example

```tsx
<ApexSparkline
  series={[
    { label: "Mon", visits: 40 },
    { label: "Tue", visits: 60 },
  ]}
  dataKey="visits"
  color="#2065D1"
/>
```

---

### `ApexMiniBarChart`

A small stacked/vertical mini bar chart intended for tiny dashboard widgets.

Props

- `data?: number[] | Record<string, any>[]` — Numeric array or object-array.
- `dataKey?: string` — Key to read numeric value from objects (e.g., `"visits"`).
- `height?: number` — Chart height in px. Default: `56`.
- `color?: string` — Bar color.

Behavior

- Maps object-array `label` to categories and `dataKey` to values.
- Tooltip shows category in the header and the value in the body (no extra label name).

Example

```tsx
<ApexMiniBarChart
  data={[
    { label: "Mon", visits: 40 },
    { label: "Tue", visits: 60 },
  ]}
  dataKey="visits"
  color="#FFB020"
/>
```

---

### `AnalyticsCard`

A compact card that can render a small chart (sparkline) alongside primary metric information. See component for more configuration.

---

## Legend Positioning

The `legendPosition` prop controls where the legend appears:

- **`"top"`** — Legend appears above the chart, centered horizontally
- **`"bottom"`** — Legend appears below the chart, centered horizontally (default)
- **`"left"`** — Legend appears to the left of the chart in a vertical layout
- **`"right"`** — Legend appears to the right of the chart in a vertical layout

For left/right positions, the layout automatically switches to a side-by-side flex layout, with the chart taking up the remaining space.

## Action Menu Integration

All full-mode charts can include a dropdown action menu in the header using the `actions` prop. The menu is powered by the `DropdownActionMenu` component and supports:

- Icons from Lucide React
- Click handlers
- Destructive variants (red color for dangerous actions)
- Visual dividers between groups

Example:

```tsx
<ApexLineChart
  variant="full"
  title="Revenue Trend"
  actions={[
    {
      id: "download",
      label: "Download",
      icon: Download,
      onClick: () => toast.success("Downloading...")
    },
    {
      id: "share",
      label: "Share",
      icon: Share,
      onClick: () => openShareDialog()
    },
    {
      id: "delete",
      label: "Delete",
      icon: Trash,
      variant: "destructive",
      showDivider: true,
      onClick: () => confirmDelete()
    }
  ]}
/>
```

## Best Practices

- Use **simple mode** when you need custom card styling or want to embed charts in existing layouts
- Use **full mode** for consistent, ready-to-use chart cards with minimal setup
- Place legends at **bottom** for horizontal charts (bar, line, area) to maintain readability
- Place legends on the **right** for vertical/tall charts to save vertical space
- Keep action menus concise (3-5 items max) for better UX
- Use colored boxes in legends automatically match your chart colors
- Prefer passing object-array data with `{ label, valueKey }` when you need category labels in tooltips (for mini charts)
- Keep mini charts small (width ~96px) for compact dashboards

---

## Examples

See comprehensive examples at:
- **`/example/charts`** — All chart variations including simple mode, full mode with different legend positions, and action menus
- **`/test`** — Interactive test demos

All charts are fully responsive and theme-aware (automatically adapt to light/dark mode).
