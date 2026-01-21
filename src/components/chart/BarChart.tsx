"use client";
import { ResponsiveBar } from "@nivo/bar";
import { useTheme } from "next-themes";

export interface BarChartProps {
  data?: any[]; // records with index and keys
  keys?: string[];
  indexBy?: string;
  height?: number;
  colors?: string[];
  showGrid?: boolean;
}

const defaultData = [
  { label: "Jan", "Series A": 40, "Series B": 30 },
  { label: "Feb", "Series A": 30, "Series B": 20 },
  { label: "Mar", "Series A": 50, "Series B": 40 },
  { label: "Apr", "Series A": 70, "Series B": 60 },
];

function getNivoTheme(resolvedTheme: string | undefined) {
  const isDark = resolvedTheme === "dark";
  return {
    textColor: isDark ? "#e6edf3" : "#222222",
    axis: { domain: { line: { stroke: isDark ? "#334155" : "#e6eef8" } } },
    grid: {
      line: { stroke: isDark ? "rgba(255,255,255,0.04)" : "rgba(2,6,23,0.06)" },
    },
    tooltip: {
      container: {
        background: isDark ? "#0f1724" : "#fff",
        color: isDark ? "#e6edf3" : "#111827",
      },
    },
  };
}

export default function BarChart({
  data = defaultData,
  keys = ["Series A", "Series B"],
  indexBy = "label",
  height = 320,
  colors = ["#2065D1", "#FFB020"],
  showGrid = true,
}: BarChartProps) {
  const { resolvedTheme } = useTheme();

  return (
    <div style={{ height }} className="w-full">
      <ResponsiveBar
        data={data}
        keys={keys}
        indexBy={indexBy}
        margin={{ top: 20, right: 20, bottom: 50, left: 40 }}
        padding={0.3}
        colors={colors}
        theme={getNivoTheme(resolvedTheme)}
        axisBottom={{ tickSize: 5, tickPadding: 5, tickRotation: 0 }}
        axisLeft={{ tickSize: 5, tickPadding: 5, tickRotation: 0 }}
        enableGridY={showGrid}
        enableGridX={false}
        borderRadius={4}
        enableLabel={false}
        animate={true}
        legends={[]}
      />
    </div>
  );
}
