"use client";
import AnalyticsWidgetSummary from "@/components/ui/analytics-widget-summary";
import { Users, Podcast } from "lucide-react";
import { ActionButton } from "@/components/ui/action-button";
import {
  HorizontalBarChart,
  PieChart,
  ApexLineChart,
  ApexHorizontalBarChart,
  ApexPieChart,
  ApexFilledPieChart,
  ApexSplineAreaChart,
  ApexBarChart,
  ApexStackedBarChart,
  ApexAreaChart,
  ApexStackedHorizontalBarChart,
} from "@/components/chart";
export default function ChartsExamplesPage() {
  return (
    <div className="container min-w-screen min-h-screen  p-10 space-y-8 ">
      <h1 className="text-2xl font-bold">Charts & Analytics Examples</h1>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AnalyticsWidgetSummary
          title="Users"
          total={18765}
          percent={2.6}
          icon={<Users />}
          chartType="mini-bars"
          chartData={[
            { label: "Mon", visits: 40 },
            { label: "Tue", visits: 60 },
            { label: "Wed", visits: 45 },
            { label: "Thu", visits: 70 },
            { label: "Fri", visits: 55 },
          ]}
          dataKey="visits"
        />

        <AnalyticsWidgetSummary
          title="Posts"
          total={3232323}
          color="#FFE1D1"
          percent={-12}
          icon={<Podcast />}
          chartType="sparkline"
          chartData={[
            { label: "Mon", visits: 40 },
            { label: "Tue", visits: 60 },
            { label: "Wed", visits: 45 },
            { label: "Thu", visits: 70 },
            { label: "Fri", visits: 55 },
          ]}
          dataKey="visits"
        />
      </section>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-card rounded-md">
          <h3 className="font-medium mb-2">Apex Line </h3>
          {/* @ts-ignore */}
          <ApexLineChart />
        </div>
        <div className="p-4 bg-card rounded-md">
          <h3 className="font-medium mb-2">Apex Horizontal Bar </h3>
          {/* @ts-ignore */}
          <ApexHorizontalBarChart />
        </div>
        <div className="p-4 bg-card rounded-md">
          <h3 className="font-medium mb-2">Apex Pie </h3>
          {/* @ts-ignore */}
          <ApexPieChart />
        </div>
        <div className="p-4 bg-card rounded-md">
          <h3 className="font-medium mb-2">Apex Filled Pie</h3>
          {/* @ts-ignore */}
          <ApexFilledPieChart />
        </div>
        <div className="p-4 bg-card rounded-md">
          {" "}
          <h3 className="font-medium mb-2">
            Apex Spline Area (grid + brighter area)
          </h3>
          {/* @ts-ignore */}
          <ApexSplineAreaChart
            showGrid={true}
            areaOpacity={1}
            areaShadeIntensity={1.2}
          />
        </div>
        <div className="p-4 bg-card rounded-md">
          {" "}
          <h3 className="font-medium mb-2">Apex Bar </h3>
          {/* @ts-ignore */}
          <ApexBarChart />
        </div>
        <div className="p-4 bg-card rounded-md">
          <h3 className="font-medium mb-2">Apex Stacked Bar </h3>
          {/* @ts-ignore */}
          <ApexStackedBarChart />
        </div>
        <div className="p-4 bg-card rounded-md">
          <h3 className="font-medium mb-2">Apex Stacked Horizontal Bar</h3>
          {/* @ts-ignore */}
          <ApexStackedHorizontalBarChart />
        </div>
        <div className="p-4 bg-card rounded-md">
          <h3 className="font-medium mb-2">Apex Area (grid + brighter area)</h3>
          {/* @ts-ignore */}
          <ApexAreaChart
            showGrid={true}
            areaOpacity={1}
            areaShadeIntensity={1.2}
          />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-card rounded-md">
          <h3 className="font-medium mb-2">Nivo Horizontal Bar</h3>
          {/* @ts-ignore */}
          <HorizontalBarChart />
        </div>
        <div className="p-4 bg-card rounded-md">
          <h3 className="font-medium mb-2">Nivo Pie</h3>
          {/* @ts-ignore */}
          <PieChart />
        </div>
      </div>
    </div>
  );
}
