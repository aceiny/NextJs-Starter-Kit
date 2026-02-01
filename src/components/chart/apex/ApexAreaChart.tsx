"use client";
import ReactApexChart from "./DynamicApexChart";
import { useTheme } from "next-themes";
import { apexChartTooltipMultipleEntries } from "./tooltip";
import ActionMenu, {
    ActionMenuItem,
} from "@/components/shared/DropdownActionMenu";

export interface ApexAreaChartProps {
  series?: { name: string; data: number[] }[];
  categories?: string[];
  height?: number;
  colors?: string[];
  // show or hide the background grid
  showGrid?: boolean;
  // control the area fill opacity (0 to 1)
  areaOpacity?: number;
  // control the gradient shade intensity (1 default)
  areaShadeIntensity?: number;
  // controls whether numeric labels show on the y-axis
  showYAxisLabels?: boolean;
  // controls whether numeric labels show near the data points on the line
  showDataLabels?: boolean;
  // Layout options
  variant?: "simple" | "full";
  title?: string;
  showLegend?: boolean;
  legendPosition?: "top" | "bottom" | "left" | "right";
  actions?: ActionMenuItem[];
  className?: string;
}

export default function ApexAreaChart({
  series = [{ name: "Series A", data: [2, 4, 3, 5, 6] }],
  categories = ["Mon", "Tue", "Wed", "Thu", "Fri"],
  height = 280,
  colors = ["#2065D1"],
  showGrid = false,
  areaOpacity = 0.16,
  areaShadeIntensity = 1,
  showYAxisLabels = true,
  showDataLabels = false,
  variant = "simple",
  title,
  showLegend = false,
  legendPosition = "bottom",
  actions,
  className = "",
}: ApexAreaChartProps) {
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
    markers: { size: 0 },
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

  const renderChart = () => (
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
