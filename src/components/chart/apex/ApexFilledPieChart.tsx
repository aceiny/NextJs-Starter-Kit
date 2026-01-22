"use client";

import ReactApexChart from "./DynamicApexChart";
import { useTheme } from "next-themes";
import { apexChartTooltipOneLine } from "./tooltip";

export interface ApexFilledPieChartProps {
  series?: number[];
  labels?: string[];
  height?: number;
  colors?: string[];
}

export default function ApexFilledPieChart({
  series = [55, 25, 20],
  labels = ["A", "B", "C"],
  height = 320,
  colors = ["#2065D1", "#FFB020", "#06D6A0"],
}: ApexFilledPieChartProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const options: any = {
    chart: {
      toolbar: { show: false },
      background: "transparent",
    },
    labels,
    legend: { show: false },
    stroke: { colors: ["transparent"] },
    colors,
    dataLabels: {
      enabled: true,
      formatter: function (val: number, opts: any) {
        const idx = opts?.seriesIndex ?? 0;
        const label =
          (opts &&
            opts.w &&
            opts.w.config &&
            opts.w.config.labels &&
            opts.w.config.labels[idx]) ||
          labels[idx] ||
          "";
        const num = typeof val === "number" ? val : Number(val);
        const formatted = isNaN(num)
          ? val
          : num.toLocaleString(undefined, {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            });
        return `${label}: ${formatted}`;
      },
      style: {
        colors: [isDark ? "#fff" : "#fff"],
        fontWeight: "600",
        fontSize: "12px",
      },
    },
    tooltip: {
      custom: function ({ series, seriesIndex, dataPointIndex, w }: any) {
        const label =
          (w && w.config && w.config.labels && w.config.labels[seriesIndex]) ||
          "";
        const value =
          (w &&
            w.globals &&
            w.globals.series &&
            w.globals.series[seriesIndex]) ||
          series[seriesIndex];
        const color =
          (w && w.config && w.config.colors && w.config.colors[seriesIndex]) ||
          colors[seriesIndex] ||
          "#000";
        const isDarkLocal =
          (w && w.config && w.config.theme && w.config.theme.mode) === "dark";
        return apexChartTooltipOneLine(label, value, color, isDarkLocal);
      },
    },
    // Use a solid, fully opaque fill to avoid translucent-looking slices
    fill: {
      type: "solid",
      opacity: 1,
    },
    theme: { mode: isDark ? "dark" : "light" },
  };

  return (
    <div className="w-full" style={{ height }}>
      {/* @ts-ignore */}
      <ReactApexChart
        options={options}
        series={series}
        type="pie"
        height={height}
      />
    </div>
  );
}
