"use client";
import ReactApexChart from "./DynamicApexChart";
import { useTheme } from "next-themes";
import { tooltipWithTitle } from "./tooltip";

export interface ApexHorizontalBarChartProps {
  series?: { name: string; data: number[] }[];
  categories?: string[];
  height?: number;
  colors?: string[];
}

export default function ApexHorizontalBarChart({
  series = [
    { name: "Series A", data: [40, 30, 50, 70, 60] },
    { name: "Series B", data: [40, 30, 50, 70, 60] },
  ],
  categories = ["Mon", "Tue", "Wed", "Thu", "Fri"],
  height = 320,
  colors = ["#2065D1", "#FFB020"],
}: ApexHorizontalBarChartProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const options: any = {
    chart: {
      toolbar: { show: false },
      animations: { enabled: true },
      background: "transparent",
    },
    plotOptions: {
      bar: { horizontal: true, barHeight: "55%", borderRadius: 6 },
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
      // title centered in gray and single-line content below
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
          (w &&
            w.globals &&
            w.globals.seriesNames &&
            w.globals.seriesNames[seriesIndex]) ||
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
        return tooltipWithTitle(title, label, value, color, isDarkLocal);
      },
    },
    theme: { mode: isDark ? "dark" : "light" },
    colors,
    legend: { show: false },
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
