"use client";
import { useState } from "react";
import ReactApexChart from "./DynamicApexChart";
import { useTheme } from "next-themes";
import { apexChartTooltipOneLine } from "./tooltip";
import ActionMenu, {
  ActionMenuItem,
} from "@/components/shared/DropdownActionMenu";

export interface ApexPieChartProps {
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

export default function ApexPieChart({
  series = [55, 25, 20],
  labels = ["A", "B", "C"],
  height = 280,
  colors = ["#2065D1", "#FFB020", "#06D6A0"],
  variant = "simple",
  title,
  showLegend = false,
  legendPosition = "bottom",
  actions,
  className = "",
}: ApexPieChartProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const tooltipBg = isDark ? "#0f1724" : "#fff";
  const tooltipColor = isDark ? "#E6EDF3" : "#0f1724";

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const options: any = {
    chart: {
      toolbar: { show: false },
      background: "transparent",
      events: {
        dataPointMouseEnter: function (
          _event: any,
          _chartContext: any,
          config: any,
        ) {
          // For pie/donut charts, the hovered slice index is in dataPointIndex.
          // Use dataPointIndex, falling back to seriesIndex if present.
          const idx =
            typeof config?.dataPointIndex === "number"
              ? config.dataPointIndex
              : config?.seriesIndex;
          setHoveredIndex(typeof idx === "number" ? idx : null);
        },
        dataPointMouseLeave: function () {
          setHoveredIndex(null);
        },
        dataPointSelection: function (
          _event: any,
          _chartContext: any,
          config: any,
        ) {
          // Toggle selection for clicked slice (click again to deselect)
          const idx =
            typeof config?.dataPointIndex === "number"
              ? config.dataPointIndex
              : config?.seriesIndex;
          setSelectedIndex((prev) =>
            prev === idx ? null : typeof idx === "number" ? idx : null,
          );
        },
      },
    },

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
        return apexChartTooltipOneLine(label, value, color, isDarkLocal);
      },
    },
    theme: { mode: isDark ? "dark" : "light" },
  };

  // prefer hovered slice; if none hovered, fallback to selected (clicked) slice
  const displayedIndex = hoveredIndex ?? selectedIndex;

  const renderChart = () => (
    <div className="w-full relative " style={{ height }}>
      {/* @ts-ignore */}
      <ReactApexChart
        options={options}
        series={series}
        type="donut"
        height={height}
      />
      <div className="absolute inset-0 top-0 flex items-center justify-center pointer-events-none">
        {displayedIndex !== null && labels?.[displayedIndex] !== undefined ? (
          <div className="text-center">
            <div
              className={`text-lg font-bold ${isDark ? "text-gray-400" : "text-slate-600"}`}
            >
              {labels[displayedIndex]}
            </div>
            <div
              className={`text-xl font-semibold ${isDark ? "text-white" : "text-slate-900"}`}
            >
              {series?.[displayedIndex]}
            </div>
          </div>
        ) : null}
      </div>
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
