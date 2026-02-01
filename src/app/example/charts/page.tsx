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
import { Download, Share, FileText } from "lucide-react";
import { toast } from "sonner";
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
          <h3 className="font-medium mb-2">Apex Line (Simple)</h3>
          {/* @ts-ignore */}
          <ApexLineChart />
        </div>
        <div className="p-4 bg-card rounded-md">
          <h3 className="font-medium mb-2">Apex Line (Full with Title)</h3>
          {/* @ts-ignore */}
          <ApexLineChart
            variant="full"
            title="Weekly Performance"
            series={[
              { name: "Revenue", data: [10, 20, 18, 24, 30] },
              { name: "Profit", data: [8, 15, 12, 20, 25] },
            ]}
            colors={["#2065D1", "#FFB020"]}
          />
        </div>
        <div className="p-4 bg-card rounded-md">
          <h3 className="font-medium mb-2">Apex Line (Legend Bottom)</h3>
          {/* @ts-ignore */}
          <ApexLineChart
            variant="full"
            title="Sales Trend"
            showLegend={true}
            legendPosition="bottom"
            series={[
              { name: "Product A", data: [10, 20, 18, 24, 30] },
              { name: "Product B", data: [15, 12, 22, 18, 28] },
            ]}
            colors={["#2065D1", "#FFB020"]}
          />
        </div>
        <div className="p-4 bg-card rounded-md">
          <h3 className="font-medium mb-2">Apex Line (Legend Top)</h3>
          {/* @ts-ignore */}
          <ApexLineChart
            variant="full"
            title="Performance Metrics"
            showLegend={true}
            legendPosition="top"
            series={[
              { name: "Series A", data: [10, 20, 18, 24, 30] },
              { name: "Series B", data: [15, 12, 22, 18, 28] },
            ]}
            colors={["#06D6A0", "#EF476F"]}
          />
        </div>
        <div className="p-4 bg-card rounded-md">
          <h3 className="font-medium mb-2">Apex Line (Legend Right)</h3>
          {/* @ts-ignore */}
          <ApexLineChart
            variant="full"
            title="Data Comparison"
            showLegend={true}
            legendPosition="right"
            series={[
              { name: "Dataset 1", data: [10, 20, 18, 24, 30] },
              { name: "Dataset 2", data: [8, 15, 20, 22, 27] },
            ]}
            colors={["#2065D1", "#FFB020"]}
          />
        </div>
        <div className="p-4 bg-card rounded-md">
          <h3 className="font-medium mb-2">Apex Line (Legend Left)</h3>
          {/* @ts-ignore */}
          <ApexLineChart
            variant="full"
            title="Statistics"
            showLegend={true}
            legendPosition="left"
            series={[
              { name: "Metric A", data: [10, 20, 18, 24, 30] },
              { name: "Metric B", data: [12, 18, 15, 21, 26] },
            ]}
            colors={["#8B5CF6", "#10B981"]}
          />
        </div>
        <div className="p-4 bg-card rounded-md">
          <h3 className="font-medium mb-2">Apex Line (With Actions)</h3>
          {/* @ts-ignore */}
          <ApexLineChart
            variant="full"
            title="Chart with Dropdown"
            showLegend={true}
            legendPosition="bottom"
            series={[
              { name: "Series A", data: [10, 20, 18, 24, 30] },
              { name: "Series B", data: [15, 12, 22, 18, 28] },
            ]}
            colors={["#2065D1", "#FFB020"]}
            actions={[
              {
                id: "download",
                label: "Download",
                icon: Download,
                onClick: () => toast.success("Downloading..."),
              },
              {
                id: "share",
                label: "Share",
                icon: Share,
                onClick: () => toast.info("Share dialog opened"),
              },
              {
                id: "export",
                label: "Export Data",
                icon: FileText,
                showDivider: true,
                onClick: () => toast.success("Exporting..."),
              },
            ]}
          />
        </div>
        <div className="p-4 bg-card rounded-md">
          <h3 className="font-medium mb-2">Apex Line (Everything)</h3>
          {/* @ts-ignore */}
          <ApexLineChart
            variant="full"
            title="Complete Example"
            showLegend={true}
            legendPosition="bottom"
            series={[
              { name: "Revenue", data: [10, 20, 18, 24, 30] },
              { name: "Profit", data: [8, 15, 12, 20, 25] },
              { name: "Costs", data: [12, 18, 16, 22, 28] },
            ]}
            colors={["#2065D1", "#10B981", "#EF476F"]}
            className="border-2 border-primary/20"
            actions={[
              {
                id: "download",
                label: "Download",
                icon: Download,
                onClick: () => toast.success("Downloading..."),
              },
              {
                id: "share",
                label: "Share",
                icon: Share,
                onClick: () => toast.info("Share dialog"),
              },
            ]}
          />
        </div>
      </div>

      <h2 className="text-xl font-medium mt-12 mb-4">Other Apex Charts (Simple Mode)</h2>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-card rounded-md">
          <h3 className="font-medium mb-2">Apex Horizontal Bar</h3>
          {/* @ts-ignore */}
          <ApexHorizontalBarChart />
        </div>
        <div className="p-4 bg-card rounded-md">
          <h3 className="font-medium mb-2">Apex Pie</h3>
          {/* @ts-ignore */}
          <ApexPieChart />
        </div>
        <div className="p-4 bg-card rounded-md">
          <h3 className="font-medium mb-2">Apex Filled Pie (Simple)</h3>
          {/* @ts-ignore */}
          <ApexFilledPieChart />
        </div>
        <div className="p-4 bg-card rounded-md">
          {" "}
          <h3 className="font-medium mb-2">
            Apex Spline Area
          </h3>
          {/* @ts-ignore */}
          <ApexSplineAreaChart />
        </div>
        <div className="p-4 bg-card rounded-md">
          {" "}
          <h3 className="font-medium mb-2">Apex Bar</h3>
          {/* @ts-ignore */}
          <ApexBarChart />
        </div>
        <div className="p-4 bg-card rounded-md">
          <h3 className="font-medium mb-2">Apex Stacked Bar</h3>
          {/* @ts-ignore */}
          <ApexStackedBarChart />
        </div>
        <div className="p-4 bg-card rounded-md">
          <h3 className="font-medium mb-2">Apex Stacked Horizontal Bar</h3>
          {/* @ts-ignore */}
          <ApexStackedHorizontalBarChart />
        </div>
        <div className="p-4 bg-card rounded-md">
          <h3 className="font-medium mb-2">Apex Area</h3>
          {/* @ts-ignore */}
          <ApexAreaChart />
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
