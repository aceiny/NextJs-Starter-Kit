# Charts & Analytics

This document describes the lightweight charts and analytics UI components included in the starter kit. These are minimal, theme-aware components built with ApexCharts and used to provide compact visuals in dashboards and cards.

## Components

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

### `AnalyticsWidgetSummary`

Compact dashboard widget that displays a title, total, percent change, and a small chart (either mini-bars or sparkline).

Props

- `title: string`
- `total: number`
- `percent: number`
- `color?: string` — Accent color for background/decoration.
- `icon?: React.ReactNode` — Optional icon (defaults to a chart icon).
- `chartType?: 'mini-bars' | 'sparkline'` — Chart type to show.
- `chartData?: number[] | Record<string, any>[]` — Chart data. If omitted, no chart is rendered.
- `chartColor?: string` — Chart color.
- `dataKey?: string` — Key to pick numeric values when `chartData` is an object-array.

Example

```tsx
<AnalyticsWidgetSummary
  title="Visits"
  total={52300}
  percent={3.2}
  chartType="mini-bars"
  chartData={[
    { label: "Mon", visits: 40 },
    { label: "Tue", visits: 60 },
  ]}
  dataKey="visits"
/>
```

---

### `AnalyticsCard`

A compact card that can render a small chart (sparkline) alongside primary metric information. See component for more configuration.

---

### Action Buttons & Ripple Button

Small dashboard UIs often need quick action buttons (for example: refresh, export, or quick filters). This starter provides two helpers:

- `ActionButton` — a small convenience wrapper that accepts a `btn` configuration object (`text`, `variant`, `size`, `onClick`, `href`, `ripple`) and will render either a standard `Button` or the `RippleButton` when `btn.ripple` is `true`.
- `RippleButton` — a low-level button that shows an animated ripple effect on click. It supports `variant`, `size`, and a configurable ripple duration.

Usage examples

```tsx
// Action button configuration
<ActionButton btn={{ text: 'Refresh', variant: 'default', size: 'sm', onClick: () => fetchData(), ripple: true }} />

// Direct ripple button usage
<RippleButton variant="ghost" size="sm" onClick={() => console.log('clicked')}>Replay</RippleButton>
```

> Tip: Use `ActionButton` for consistent action styling in cards and dialogs, and `RippleButton` for flexible, animated click affordances.

## Best Practices

- Prefer passing object-array data with `{ label, valueKey }` when you need category labels in tooltips.
- Only pass `chartData` when you want a chart — the widget hides the chart when `chartData` is `undefined` or empty.
- Keep mini charts small (width ~96px) for compact dashboards.

---

## Demo

See the live demo at `/example/charts` and the test demo at `/test` for interactive examples.

If you need help integrating with your backend, use `dataKey` to map API responses directly.
