"use client";

import ReactApexChart from "./DynamicApexChart";
import { useTheme } from "next-themes";
import { apexChartTooltipOneLine } from "./tooltip";
import ActionMenu, { ActionMenuItem } from "@/components/shared/DropdownActionMenu";

export interface ApexFilledPieChartProps {
  series?: number[];
  labels?: string[];
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

export default function ApexFilledPieChart({
  series = [55, 25, 20],
  labels = ["A", "B", "C"],
  height = 320,
  colors = ["#2065D1", "#FFB020", "#06D6A0"],
  variant = "simple",
  title,
  showLegend = false,
  legendPosition = "bottom",
  actions,
  className = "",
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

  const renderChart = () => (
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

  const renderLegend = () => {
    if (!showLegend) return null;

    const legendClasses =
      legendPosition === "left" || legendPosition === "right"
        ? "flex flex-col gap-2"
        : "flex flex-wrap gap-3 justify-center";

    return (
      <div className={legendClasses}>
        {labels.map((label, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-sm flex-shrink-0"
              style={{ backgroundColor: colors[index] }}
            />
            <span className="text-sm text-foreground/80">{label}</span>
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
