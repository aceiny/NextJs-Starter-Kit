"use client";
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

import { TrendCard, MetricCard, StatusCard } from "@/components/kpi";
import {
  UsersGroupRounded,
  ServerSquare,
} from "@solar-icons/react-perf/Linear";
export default function ChartsExamplesPage() {
  return (
    <div className="container min-w-screen min-h-screen  p-10 space-y-8 ">
      <h1 className="text-2xl font-bold">Charts & Analytics Examples</h1>
      {/* KPI Cards Examples */}
      <section className="mt-8">
        <h2 className="text-xl font-medium mb-4">KPI Cards Examples</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Trend card */}
          <div className="p-4 bg-card rounded-md">
            <h3 className="font-medium mb-2">Trend Card</h3>
            {/* @ts-ignore */}
            <TrendCard
              title="Total Revenue"
              value="$228,451"
              change="33%"
              trendChipVariant="flat"
              changeType="positive"
              trendChipPosition="top"
              trendType="up"
            />
          </div>

          {/* Metric card */}
          <div className="p-4 bg-card rounded-md">
            <h3 className="font-medium ">Metric Card</h3>
            {/* @ts-ignore */}
            <MetricCard
              title="Total Users"
              value="5,400"
              change="33%"
              trendChipPosition="top"
              changeType="positive"
              icon={<UsersGroupRounded width={20} />}
            />
          </div>

          {/* Status card */}
          <div className="p-4 bg-card rounded-md">
            <h3 className="font-medium mb-2">Status Card</h3>
            {/* @ts-ignore */}
            <StatusCard
              title="Server Load"
              value={38}
              status="good"
              icon={<ServerSquare size={20} />}
            />
          </div>
        </div>
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
