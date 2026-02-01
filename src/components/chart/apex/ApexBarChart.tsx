"use client";
import ReactApexChart from "./DynamicApexChart";
import { useTheme } from "next-themes";
import { apexChartTooltipWithTitle } from "./tooltip";
import ActionMenu, {
    ActionMenuItem,
} from "@/components/shared/DropdownActionMenu";

export interface ApexBarChartProps {
  series?: { name: string; data: number[] }[];
  categories?: string[];
  height?: number;
  colors?: string[];
  stacked?: boolean;
  // Layout options
  variant?: "simple" | "full";
  title?: string;
  showLegend?: boolean;
  legendPosition?: "top" | "bottom" | "left" | "right";
  actions?: ActionMenuItem[];
  className?: string;
}

export default function ApexBarChart({
  series = [{ name: "Series A", data: [40, 30, 50, 70, 60] }],
  categories = ["Mon", "Tue", "Wed", "Thu", "Fri"],
  height = 320,
  colors = ["#2065D1"],
  stacked = false,
  variant = "simple",
  title,
  showLegend = false,
  legendPosition = "bottom",
  actions,
  className = "",
}: ApexBarChartProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const options: any = {
    chart: {
      toolbar: { show: false },
      animations: { enabled: true },
      background: "transparent",
      stacked,
    },
    plotOptions: {
      bar: { horizontal: false, columnWidth: "55%", borderRadius: 6 },
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

  const renderChart = () => (
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

  const renderLegend = () => {
    if (!showLegend) return null;

    const legendClasses =
      legendPosition === "left" || legendPosition === "right"
        ? "flex flex-col gap-2"
        : "flex flex-wrap gap-3 justify-center";

    return (
      <div className={legendClasses}>
        {series.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-sm flex-shrink-0"
              style={{ backgroundColor: colors[index] }}
            />
            <span className="text-sm text-foreground/80">{item.name}</span>
          </div>
        ))}
      </div>
    );
  };

  // Simple variant: just the chart
  if (variant === "simple") {
    return renderChart();
  }

  // Full variant with left/right legend positioning
  if (legendPosition === "left" || legendPosition === "right") {
    return (
      <div className={`rounded-lg bg-card ${className}`}>
        {/* Header with title and actions */}
        {(title || actions) && (
          <div className="flex items-center justify-between px-6 py-4">
            {title && (
              <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            )}
            {actions && actions.length > 0 && <ActionMenu items={actions} />}
          </div>
        )}

        {/* Chart and Legend Side by Side */}
        <div
          className={`flex ${legendPosition === "left" ? "flex-row-reverse" : "flex-row"} items-center gap-6 p-6`}
        >
          <div className="flex-1">{renderChart()}</div>
          <div className="flex-shrink-0">{renderLegend()}</div>
        </div>
      </div>
    );
  }

  // Full variant: chart with title, legend (top/bottom), and actions
  return (
    <div className={`rounded-lg bg-card ${className}`}>
      {/* Header with title and actions */}
      {(title || actions) && (
        <div className="flex items-center justify-between px-6 py-4">
          {title && (
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          )}
          {actions && actions.length > 0 && <ActionMenu items={actions} />}
        </div>
      )}

      {/* Legend at top */}
      {showLegend && legendPosition === "top" && (
        <div className="px-6 pt-4">{renderLegend()}</div>
      )}

      {/* Chart */}
      <div className="p-6">{renderChart()}</div>

      {/* Legend at bottom */}
      {showLegend && legendPosition === "bottom" && (
        <div className="px-6 pb-4">{renderLegend()}</div>
      )}
    </div>
  );
}
