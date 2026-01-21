"use client";
import ReactApexChart from "./DynamicApexChart";
import { useTheme } from "next-themes";
import { tooltipWithTitle } from "./tooltip";

export interface ApexLineChartProps {
  series?: { name: string; data: number[] }[];
  categories?: string[];
  height?: number;
  colors?: string[];
}

export default function ApexLineChart({
  series = [{ name: "Series A", data: [10, 20, 18, 24, 30] }],
  categories = ["Mon", "Tue", "Wed", "Thu", "Fri"],
  height = 280,
  colors = ["#2065D1"],
}: ApexLineChartProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const options: any = {
    chart: {
      toolbar: { show: false },
      zoom: { enabled: false },
      sparkline: false,
      animations: { enabled: true },
      background: "transparent",
    },
    stroke: { curve: "smooth", width: 3 },
    markers: { size: 0 },
    grid: { show: false },
    xaxis: {
      categories,
      labels: { show: true, style: { colors: isDark ? "#9CA3AF" : "#6B7280" } },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: { labels: { show: false } },
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
        type="line"
        height={height}
      />
    </div>
  );
}
