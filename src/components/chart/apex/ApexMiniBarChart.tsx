"use client";;
import ReactApexChart from "./DynamicApexChart";
import { useTheme } from "next-themes";
import { tooltipWithTitle } from "./tooltip";

export interface ApexMiniBarChartProps {
  data?: number[] | Record<string, any>[];
  dataKey?: string;
  height?: number;
  color?: string;
}

export default function ApexMiniBarChart({ data = [40, 60, 45, 70, 55, 75, 65], dataKey, height = 56, color = "#2065D1" }: ApexMiniBarChartProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const isObjectArray = Array.isArray(data) && data.length > 0 && typeof data[0] === 'object';
  const numericData = isObjectArray ? (data as any[]).map(d => Number(d[dataKey ?? 'value'] ?? 0)) : (data as number[]);
  const categories = isObjectArray ? (data as any[]).map((d, i) => String(d.label ?? i)) : numericData.map((_, i) => String(i));

  const options: any = {
    chart: { toolbar: { show: false }, sparkline: { enabled: true }, background: "transparent" },
    plotOptions: { bar: { horizontal: false, columnWidth: "60%", borderRadius: 6 } },
    dataLabels: { enabled: false },
    xaxis: { categories, labels: { show: false }, axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { labels: { show: false } },
    grid: { show: false },
    tooltip: {
      custom: function ({ series, seriesIndex, dataPointIndex, w }: any) {
        const title = (w && w.config && w.config.xaxis && w.config.xaxis.categories && w.config.xaxis.categories[dataPointIndex]) || "";
        const label = ""; // omit the word 'Value'
        const value = (series && series[0] && series[0][dataPointIndex]) || "";
        const colorLocal = (w && w.config && w.config.colors && w.config.colors[0]) || color || "#000";
        const isDarkLocal = (w && w.config && w.config.theme && w.config.theme.mode) === "dark";
        return tooltipWithTitle(title, label, value, colorLocal, isDarkLocal);
      },
    },
    colors: [color],
    theme: { mode: isDark ? "dark" : "light" },
  };

  return (
    <div style={{ width: 96, height }}>
      {/* @ts-ignore */}
      <ReactApexChart options={options} series={[{ data: numericData }]} type="bar" height={height} />
    </div>
  );
}
