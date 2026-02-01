"use client";
import ReactApexChart from "./DynamicApexChart";
import { useTheme } from "next-themes";
import { apexChartTooltipWithTitle } from "./tooltip";
import ActionMenu, {
  ActionMenuItem,
} from "@/components/shared/DropdownActionMenu";

export interface ApexLineChartProps {
  series?: { name: string; data: number[] }[];
  categories?: string[];
  height?: number;
  colors?: string[];
  // Layout options
  variant?: "simple" | "full";
  title?: string;
  showLegend?: boolean;
  legendPosition?: "top" | "bottom" | "left" | "right";
  actions?: ActionMenuItem[];
  className?: string;
}

export default function ApexLineChart({
  series = [{ name: "Series A", data: [10, 20, 18, 24, 30] }],
  categories = ["Mon", "Tue", "Wed", "Thu", "Fri"],
  height = 280,
  colors = ["#2065D1"],
  variant = "simple",
  title,
  showLegend = false,
  legendPosition = "bottom",
  actions,
  className = "",
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
        return apexChartTooltipWithTitle(
          title,
          label,
          value,
          color,
          isDarkLocal,
        );
      },
    },

    theme: { mode: isDark ? "dark" : "light" },
    colors,
    legend: { show: false },
  };

  const renderChart = () => (
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
