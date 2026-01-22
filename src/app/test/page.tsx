import AnalyticsWidgetSummary from "@/components/ui/analytics-widget-summary";
import { Podcast, Users } from "lucide-react";
import {
  HorizontalBarChart,
  AreaChart,
  PieChart,
  ApexLineChart,
  ApexHorizontalBarChart,
  ApexPieChart,
  ApexBarChart,
  ApexStackedBarChart,
  ApexAreaChart,
  ApexStackedHorizontalBarChart,
} from "@/components/chart";
import { Button as Bb } from '@heroui/button';

export default function page() {
  return (
    <div className=" container p-6">
      <div className="mb-21">
        <Bb>Hero Button</Bb>

      </div>
      <div className="flex flex-row gap-4">
        <AnalyticsWidgetSummary title="User" total={18765} percent={2.6} />
        <AnalyticsWidgetSummary
          title="User"
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
            { label: "Sat", visits: 75 },
            { label: "Sun", visits: 65 },
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
            { label: "Sat", visits: 75 },
            { label: "Sun", visits: 65 },
          ]}
          dataKey="visits"
        />
        <AnalyticsWidgetSummary
          title="Sessions"
          total={52300}
          percent={3.2}
          color="#C7F9CC"
          icon={<Users />}
        />
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-card rounded-md">
          <h3 className="font-medium mb-2">Nivo Area</h3>
          <AreaChart />
        </div>
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

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-card rounded-md">
          <h3 className="font-medium mb-2">Apex Line (minimal)</h3>
          {/* @ts-ignore */}
          <ApexLineChart />
        </div>
        <div className="p-4 bg-card rounded-md">
          <h3 className="font-medium mb-2">Apex Horizontal Bar (minimal)</h3>
          {/* @ts-ignore */}
          <ApexHorizontalBarChart />
        </div>
        <div className="p-4 bg-card rounded-md">
          <h3 className="font-medium mb-2">Apex Pie (minimal)</h3>
          {/* @ts-ignore */}
          <ApexPieChart />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-card rounded-md">
          <h3 className="font-medium mb-2">Apex Bar (minimal)</h3>
          {/* @ts-ignore */}
          <ApexBarChart />
        </div>
        <div className="p-4 bg-card rounded-md">
          <h3 className="font-medium mb-2">Apex Stacked Bar (minimal)</h3>
          {/* @ts-ignore */}
          <ApexStackedBarChart />
        </div>
        <div className="p-4 bg-card rounded-md">
          <h3 className="font-medium mb-2">
            Apex Stacked Horizontal Bar (minimal)
          </h3>
          {/* @ts-ignore */}
          <ApexStackedHorizontalBarChart />
        </div>
        <div className="p-4 bg-card rounded-md">
          <h3 className="font-medium mb-2">Apex Area (minimal)</h3>
          {/* @ts-ignore */}
          <ApexAreaChart />
        </div>
      </div>
    </div>
  );
}
