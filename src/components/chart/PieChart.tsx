"use client";

import { ResponsivePie } from "@nivo/pie";
import { useTheme } from "next-themes";

export interface PieChartProps {
  data?: { id: string; value: number; label?: string }[];
  height?: number;
  colors?: string[];
}

const defaultData = [
  { id: "A", label: "A", value: 55 },
  { id: "B", label: "B", value: 25 },
  { id: "C", label: "C", value: 20 },
];

function getNivoTheme(resolvedTheme: string | undefined) {
  const isDark = resolvedTheme === "dark";
  return {
    labels: { text: { fill: isDark ? "#e6edf3" : "#222222" } },
    tooltip: { container: { background: isDark ? "#0f1724" : "#fff", color: isDark ? "#e6edf3" : "#111827" } },
  };
}

export default function PieChart({
  data = defaultData,
  height = 320,
  colors = ["#2065D1", "#FFB020", "#06D6A0"],
}: PieChartProps) {
  const { resolvedTheme } = useTheme();
  const tooltipBg = resolvedTheme === "dark" ? 'rgba(15,23,36,0.92)' : 'rgba(255,255,255,0.98)';
  const tooltipColor = resolvedTheme === "dark" ? "#E6EDF3" : "#0f1724";

  return (
    <div style={{ height }} className="w-full">
      <ResponsivePie
        data={data}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={6}
        colors={colors}
        theme={getNivoTheme(resolvedTheme)}
        activeOuterRadiusOffset={8}
        borderWidth={0}
        enableArcLabels={false}
        enableArcLinkLabels={true}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor={resolvedTheme === "dark" ? "#e6edf3" : "#222"}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        tooltip={({ datum }) => (
          <div style={{ padding: 10, borderRadius: 16, background: tooltipBg, color: tooltipColor, display: "flex", alignItems: "center", gap: 8, minWidth: 140, backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', boxShadow: 'none' }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: (datum && (datum as any).color) || colors[0], display: "inline-block", flexShrink: 0 }} />
            <div style={{ whiteSpace: 'nowrap', fontSize: 13, fontWeight: 600 }}>{(datum && (datum as any).label) || datum.id}: <span style={{ fontWeight: 400, marginLeft: 6 }}>{(datum && (datum as any).value) ?? datum.value}</span></div>
          </div>
        )}
        animate={true}
      />
    </div>
  );
}
