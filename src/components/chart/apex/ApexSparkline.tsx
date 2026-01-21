"use client";

import ReactApexChart from "./DynamicApexChart";
import { useTheme } from "next-themes";
import { tooltipWithTitle } from "./tooltip";

export interface ApexSparklineProps {
  series?: number[] | Record<string, any>[];
  dataKey?: string;
  height?: number;
  color?: string;
}

export default function ApexSparkline({
  series = [10, 20, 18, 24, 30],
  dataKey,
  height = 48,
  color = "#2065D1",
}: ApexSparklineProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const isObjectSeries =
    Array.isArray(series) && series.length > 0 && typeof series[0] === "object";
  const numericSeries = isObjectSeries
    ? (series as any[]).map((s) => Number(s[dataKey ?? "value"] ?? 0))
    : (series as number[]);
  const categories = isObjectSeries
    ? (series as any[]).map((s, i) => String(s.label ?? i))
    : numericSeries.map((_, i) => String(i));

  const options: any = {
    chart: {
      sparkline: { enabled: true },
      toolbar: { show: false },
      background: "transparent",
    },
    stroke: { curve: "smooth", width: 2 },
    markers: { size: 0 },
    grid: { show: false },
    xaxis: {
      categories,
      labels: { show: false },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: { labels: { show: false } },
    tooltip: {
      custom: function ({ series, seriesIndex, dataPointIndex, w }: any) {
        const title =
          (categories && categories[dataPointIndex]) ||
          (w &&
            w.config &&
            w.config.xaxis &&
            w.config.xaxis.categories &&
            w.config.xaxis.categories[dataPointIndex]) ||
          "";
        const label = ""; // do not show dataKey in body; title shows the category
        const value =
          (series &&
            series[seriesIndex] &&
            series[seriesIndex][dataPointIndex]) ||
          (w &&
            w.globals &&
            w.globals.series &&
            w.globals.series[seriesIndex] &&
            w.globals.series[seriesIndex][dataPointIndex]) ||
          "";
        const colorLocal =
          (w && w.config && w.config.colors && w.config.colors[seriesIndex]) ||
          color ||
          "#000";
        const isDarkLocal =
          (w && w.config && w.config.theme && w.config.theme.mode) === "dark";
        return tooltipWithTitle(title, label, value, colorLocal, isDarkLocal);
      },
    },
    colors: [color],
    theme: { mode: isDark ? "dark" : "light" },
  };

  return (
    <div style={{ width: 96, height }}>
      {/* @ts-ignore */}
      <ReactApexChart
        options={options}
        series={[{ data: numericSeries }]}
        type="line"
        height={height}
      />
    </div>
  );
}
