import React from "react";
import { TrendingUp, TrendingDown, ChartColumnBig } from "lucide-react";
import { darkenColor, hexToRgba } from "@/lib/utils/color.utils";
import { fNumber, fPercent } from "@/lib/utils/number-utils";
import { cn } from "@/lib/utils";
// Charts
import { ApexSparkline, ApexMiniBarChart } from "@/components/chart";
import { Card } from "@heroui/react";

// ----------------------------------------------------------------------

type Props = {
  title: string;
  total: number;
  percent: number;
  color?: string;
  icon?: React.ReactNode;
  chartType?: "mini-bars" | "sparkline";
  chartData?: number[] | Record<string, any>[];
  chartColor?: string;
  dataKey?: string;
};

export default function AnalyticsWidgetSummary({
  icon = <ChartColumnBig size={30} />,
  title,
  total,
  percent,
  color = "#ECD5FF",
  chartType = "mini-bars",
  chartData,
  chartColor,
  dataKey,
}: Props) {
  const isPositive = percent >= 0;
  const darkColor = darkenColor(color, 0.2);

  return (
    <Card
      className="group relative overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 p-4 sm:min-w-80 min-w-40"
      style={{
        background: `linear-gradient(135deg, ${hexToRgba(color, 0.15)} 0%, ${hexToRgba(color, 0.05)} 100%)`,
        backdropFilter: "blur(10px)",
      }}
    >
      {/* Animated background gradient */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${hexToRgba(color, 0.2)}, transparent 70%)`,
        }}
      />

      {/* Decorative circles */}
      <div
        className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-10 group-hover:scale-110 transition-transform duration-500"
        style={{ backgroundColor: color }}
      />
      <div
        className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full opacity-5"
        style={{ backgroundColor: color }}
      />

      {/* Icon with enhanced styling */}

      {/* Icon with enhanced styling */}

      <div
        className="relative w-14 h-14  rounded-2xl flex items-center justify-center shadow-md group-hover:scale-110 group-hover:rotate-2 transition-all duration-300"
        style={{
          backgroundColor: hexToRgba(color, 0.2),
          border: `2px solid ${hexToRgba(color, 0.3)}`,
        }}
      >
        <div style={{ color: darkColor }} className="max-w-8 max-h-8">
          {icon}
        </div>
      </div>

      {/* Trending indicator with pill design */}
      <div
        className={cn(
          "absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-sm shadow-sm",
          {
            "bg-green-500/10": isPositive,
            "bg-red-500/10": !isPositive,
          },
        )}
        style={{
          border: `1px solid ${hexToRgba(color, 0.3)}`,
        }}
      >
        {isPositive ? (
          <TrendingUp className="w-4 h-4 text-green-500" />
        ) : (
          <TrendingDown className="w-4 h-4 text-red-500" />
        )}
        {/* //TODO adjust color more  */}
        <span
          className={cn("font-bold text-xs", {
            "text-green-500": isPositive,
            "text-red-500": !isPositive,
          })}
        >
          {isPositive && "+"}
          {fPercent(percent)}
        </span>
      </div>

      {/* Content */}
      <div className="relative flex items-end gap-4 justify-between flex-wrap">
        <div className="grow min-w-28">
          <div
            className="text-sm font-semibold mb-2 uppercase tracking-wide opacity-70"
            style={{ color: darkColor }}
          >
            {title}
          </div>
          <div
            className="text-4xl font-bold bg-clip-text"
            style={{ color: darkColor }}
          >
            {fNumber(total)}
          </div>
        </div>

        <div className="w-24 h-16 flex items-end gap-1">
          {chartData && chartType === "sparkline" ? (
            // @ts-ignore - client component
            <ApexSparkline
              series={chartData as any}
              dataKey={dataKey}
              color={chartColor || color}
            />
          ) : chartData && chartType === "mini-bars" ? (
            // @ts-ignore
            <ApexMiniBarChart
              data={chartData as any}
              dataKey={dataKey}
              color={chartColor || color}
              height={56}
            />
          ) : null}
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
        style={{ backgroundColor: color }}
      />
    </Card>
  );
}
