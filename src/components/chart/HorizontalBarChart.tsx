"use client";;
import { ResponsiveBar } from "@nivo/bar";
import { useTheme } from "next-themes";

export interface HorizontalBarChartProps {
  data?: any[]; // array of objects
  keys?: string[];
  indexBy?: string;
  height?: number;
  colors?: string[];
  showGrid?: boolean;
}

const defaultData = [
  { label: "Mon", "Series A": 40, "Series B": 30 , "Series C": 30 , "Series D": 20},
  { label: "Tue", "Series A": 30, "Series B": 20 , "Series C": 25 , "Series D": 15},
  { label: "Wed", "Series A": 50, "Series B": 40 },
  { label: "Thu", "Series A": 70, "Series B": 60 },
  { label: "Fri", "Series A": 60, "Series B": 45 },
];

function getNivoTheme(resolvedTheme: string | undefined) {
  const isDark = resolvedTheme === "dark";
  return {
    textColor: isDark ? "#e6edf3" : "#222222",
    axis: { domain: { line: { stroke: isDark ? "#334155" : "#e6eef8" } } },
    grid: { line: { stroke: isDark ? "rgba(255,255,255,0.04)" : "rgba(2,6,23,0.06)" } },
    tooltip: { container: { background: isDark ? "#0f1724" : "#fff", color: isDark ? "#e6edf3" : "#111827" } },
  };
}

export default function HorizontalBarChart({
  data = defaultData,
  keys = ["Series A", "Series B", "Series C" , "Series D"],
  indexBy = "label",
  height = 320,
  colors = ["#2065D1", "#FFB020" , "#06D6A0" , "#FF6B6B"],
  showGrid = true,
}: HorizontalBarChartProps) {
  const { resolvedTheme } = useTheme();

  return (
    <div style={{ height }} className="w-full">
      <ResponsiveBar
        data={data}
        keys={keys}
        indexBy={indexBy}
        layout="horizontal"
        margin={{ top: 20, right: 20, bottom: 30, left: 80 }}
        padding={0.2}
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
