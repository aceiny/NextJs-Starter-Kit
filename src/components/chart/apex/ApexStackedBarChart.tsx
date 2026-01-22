"use client";

import ReactApexChart from "./DynamicApexChart";
import { useTheme } from "next-themes";
import { apexChartTooltipWithTitle } from "./tooltip";

export interface ApexStackedBarChartProps {
  series?: { name: string; data: number[] }[];
  categories?: string[];
  height?: number;
  colors?: string[];
  /** columnWidth accepts values like '55%' or '20px' or a number (treated as px) */
  columnWidth?: string | number;
}

export default function ApexStackedBarChart({
  series = [
    { name: "Series A", data: [40, 30, 50, 70, 60] },
    { name: "Series B", data: [20, 25, 18, 15, 30] },
  ],
  categories = ["Mon", "Tue", "Wed", "Thu", "Fri"],
  height = 320,
  colors = ["#2065D1", "#FFB020"],
  columnWidth = "55%",
}: ApexStackedBarChartProps) {
  const resolvedColumnWidth =
    typeof columnWidth === "number" ? `${columnWidth}px` : columnWidth;
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const options: any = {
    chart: {
      toolbar: { show: false },
      animations: { enabled: true },
      background: "transparent",
      stacked: true,
    },

    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: resolvedColumnWidth,
        borderRadius: 6,
      },
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories,
      labels: { style: { colors: isDark ? "#9CA3AF" : "#6B7280" } },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: { labels: { style: { colors: isDark ? "#9CA3AF" : "#6B7280" } } },
    grid: { show: false },
    tooltip: {
      custom: function ({ series, seriesIndex, dataPointIndex, w }: any) {
        const title =
          (w &&
            w.config &&
            w.config.xaxis &&
            w.config.xaxis.categories &&
            w.config.xaxis.categories[dataPointIndex]) ||
          "";
        const label =
          (w &&
            w.config &&
            w.config.series &&
            w.config.series[seriesIndex] &&
            w.config.series[seriesIndex].name) ||
          "";
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
        const color =
          (w && w.config && w.config.colors && w.config.colors[seriesIndex]) ||
          colors[seriesIndex] ||
          "#000";
        const isDarkLocal =
          (w && w.config && w.config.theme && w.config.theme.mode) === "dark";
        return apexChartTooltipWithTitle(
          title,
          label,
          value,
          color,
          isDarkLocal,
        );
      },
    },
    colors,
    legend: { show: false },
    theme: { mode: isDark ? "dark" : "light" },
  };

  return (
    <div className="w-full" style={{ height }}>
      {/* @ts-ignore */}
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={height}
      />
    </div>
  );
}
