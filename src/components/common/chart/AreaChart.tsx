"use client";
import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "next-themes";

export interface AreaChartProps {
  data?: { id: string; data: { x: number | string; y: number }[] }[];
  height?: number;
  colors?: string[];
}

const defaultData = [
  {
    id: "A",
    data: [
      { x: 0, y: 2 },
      { x: 1, y: 4 },
      { x: 2, y: 3 },
      { x: 3, y: 5 },
      { x: 4, y: 6 },
    ],
  },
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

export default function AreaChart({
  data = defaultData,
  height = 280,
  colors = ["#2065D1"],
}: AreaChartProps) {
  const { resolvedTheme } = useTheme();

  return (
    <div style={{ height }} className="w-full">
      <ResponsiveLine
        data={data}
        margin={{ top: 20, right: 40, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{ type: "linear", min: "auto", max: "auto", stacked: false }}
        axisTop={null}
        axisRight={null}
        axisBottom={{ tickSize: 5, tickPadding: 5, tickRotation: 0 }}
        axisLeft={{ tickSize: 5, tickPadding: 5, tickRotation: 0 }}
        colors={colors}
        enableGridX={false}
        enableGridY={true}
        enablePoints={false}
        areaOpacity={0.2}
        curve="monotoneX"
        theme={getNivoTheme(resolvedTheme)}
        useMesh={true}
        animate={true}
        legends={[]}
      />
    </div>
  );
}
