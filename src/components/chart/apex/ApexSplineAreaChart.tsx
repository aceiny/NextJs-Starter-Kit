"use client";

import ReactApexChart from "./DynamicApexChart";
import { useTheme } from "next-themes";
import { apexChartTooltipMultipleEntries } from "./tooltip";

export interface ApexSplineAreaChartProps {
  series?: { name: string; data: number[] }[];
  categories?: string[];
  height?: number;
  colors?: string[];
  // controls whether numeric labels show on the y-axis
  showYAxisLabels?: boolean;
  // controls whether numeric labels show near the data points on the line
  showDataLabels?: boolean;
  // show or hide the background grid
  showGrid?: boolean;
  // control the area fill opacity (0 to 1)
  areaOpacity?: number;
  // control the gradient shade intensity (1 default)
  areaShadeIntensity?: number;
}

export default function ApexSplineAreaChart({
  series = [
    { name: "Series A", data: [31, 40, 28, 51, 42, 109, 100] },
    { name: "Series B", data: [11, 32, 45, 32, 34, 52, 41] },
  ],
  categories = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  height = 320,
  colors = ["#2065D1", "#FFB020"],
  showYAxisLabels = true,
  showDataLabels = false,
  showGrid = false,
  areaOpacity = 0.28,
  areaShadeIntensity = 1,
}: ApexSplineAreaChartProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const options: any = {
    chart: {
      toolbar: { show: false },
      animations: { enabled: true },
      background: "transparent",
    },
    stroke: { curve: "smooth", width: 2 },
    dataLabels: {
      enabled: showDataLabels,
      formatter: function (val: number) {
        return Number.isInteger(val) ? String(val) : val.toFixed(2);
      },
      style: {
        colors: [isDark ? "#fff" : "#111"],
        fontSize: "12px",
        fontWeight: 600,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: areaShadeIntensity,
        opacityFrom: areaOpacity,
        opacityTo: Math.max(0.01, areaOpacity * 0.2),
      },
    },
    markers: { size: 3 },
    grid: {
      show: showGrid,
      borderColor: isDark ? "rgba(255,255,255,0.04)" : "rgba(15,23,42,0.04)",
      strokeDashArray: 4,
    },
    xaxis: {
      categories,
      labels: { style: { colors: isDark ? "#9CA3AF" : "#6B7280" } },
    },
    yaxis: {
      labels: {
        show: showYAxisLabels,
        // Format values: integers shown as-is, others shown with up to 2 decimals
        formatter: function (val: number) {
          return Number.isInteger(val) ? String(val) : val.toFixed(2);
        },
        style: { colors: isDark ? "#9CA3AF" : "#6B7280" },
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      custom: function ({ series, seriesIndex, dataPointIndex, w }: any) {
        const title =
          (w &&
            w.config &&
            w.config.xaxis &&
            w.config.xaxis.categories &&
            w.config.xaxis.categories[dataPointIndex]) ||
          categories[dataPointIndex] ||
          "";
        const isDarkLocal =
          (w && w.config && w.config.theme && w.config.theme.mode) === "dark";

        const entries =
          w && w.config && w.config.series
            ? w.config.series.map((s: any, i: number) => {
                const label = (s && s.name) || `Series ${i + 1}`;
                const value =
                  w &&
                  w.globals &&
                  w.globals.series &&
                  Array.isArray(w.globals.series[i]) &&
                  typeof w.globals.series[i][dataPointIndex] !== "undefined"
                    ? w.globals.series[i][dataPointIndex]
                    : (series && series[i] && series[i][dataPointIndex]) || "";
                const color =
                  (w && w.config && w.config.colors && w.config.colors[i]) ||
                  colors[i] ||
                  "#000";
                return { label, value, color };
              })
            : [];

        return apexChartTooltipMultipleEntries(title, entries, isDarkLocal);
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
        type="area"
        height={height}
      />
    </div>
  );
}
