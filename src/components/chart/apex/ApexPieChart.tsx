"use client";

import ReactApexChart from "./DynamicApexChart";
import { useTheme } from "next-themes";
import { tooltipOneLine } from "./tooltip";

export interface ApexPieChartProps {
  series?: number[];
  labels?: string[];
  height?: number;
  colors?: string[];
}

export default function ApexPieChart({
  series = [55, 25, 20],
  labels = ["A", "B", "C"],
  height = 280,
  colors = ["#2065D1", "#FFB020", "#06D6A0"],
}: ApexPieChartProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const tooltipBg = isDark ? "#0f1724" : "#fff";
  const tooltipColor = isDark ? "#E6EDF3" : "#0f1724";

  const options: any = {
    chart: { toolbar: { show: false }, background: "transparent" },
    labels,
    legend: { show: false },
    // remove slice borders
    stroke: { colors: ["transparent"] },
    colors,
    dataLabels: { enabled: false },
    tooltip: {
      // single-line tooltip (dot + label: value) with translucent blurry background and rounded-xl
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
        return tooltipOneLine(label, value, color, isDarkLocal);
      },
    },
    theme: { mode: isDark ? "dark" : "light" },
  };

  return (
    <div className="w-full" style={{ height }}>
      {/* @ts-ignore */}
      <ReactApexChart
        options={options}
        series={series}
        type="donut"
        height={height}
      />
    </div>
  );
}
