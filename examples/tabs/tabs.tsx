"use client";

import { TabsComponent } from "@/components/shared/Tabs";
import { Camera, Music, Video } from "lucide-react";
import { useState } from "react";

export default function TabsExample() {
  const [selectedTab, setSelectedTab] = useState("overview");

  // Basic tabs example
  const basicTabs = [
    {
      key: "photos",
      title: "Photos",
      content: (
        <div className="p-4">
          <p className="text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
      ),
    },
    {
      key: "music",
      title: "Music",
      content: (
        <div className="p-4">
          <p className="text-sm">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>
        </div>
      ),
    },
    {
      key: "videos",
      title: "Videos",
      content: (
        <div className="p-4">
          <p className="text-sm">
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.
          </p>
        </div>
      ),
    },
  ];

  // Tabs with icons
  const tabsWithIcons = [
    {
      key: "photos",
      title: "Photos",
      icon: Camera,
      content: (
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">Photo Gallery</h3>
          <p className="text-sm text-gray-600">
            Browse through your photo collection.
          </p>
        </div>
      ),
    },
    {
      key: "music",
      title: "Music",
      icon: Music,
      content: (
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">Music Library</h3>
          <p className="text-sm text-gray-600">
            Listen to your favorite tracks.
          </p>
        </div>
      ),
    },
    {
      key: "videos",
      title: "Videos",
      icon: Video,
      content: (
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">Video Collection</h3>
          <p className="text-sm text-gray-600">Watch your saved videos.</p>
        </div>
      ),
    },
  ];

  // Tabs with badges
  const tabsWithBadges = [
    {
      key: "photos",
      title: "Photos",
      endContent: (
        <span className="text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full">
          9
        </span>
      ),
      content: (
        <div className="p-4">
          <p className="text-sm">You have 9 photos in your collection.</p>
        </div>
      ),
    },
    {
      key: "music",
      title: "Music",
      endContent: (
        <span className="text-xs bg-success-100 text-success-700 px-2 py-0.5 rounded-full">
          3
        </span>
      ),
      content: (
        <div className="p-4">
          <p className="text-sm">You have 3 music tracks.</p>
        </div>
      ),
    },
    {
      key: "videos",
      title: "Videos",
      endContent: (
        <span className="text-xs bg-warning-100 text-warning-700 px-2 py-0.5 rounded-full">
          1
        </span>
      ),
      content: (
        <div className="p-4">
          <p className="text-sm">You have 1 video.</p>
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-8">Tabs Component Examples</h1>
      </div>

      {/* Basic Example */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Basic Tabs</h2>
        <TabsComponent items={basicTabs} defaultSelectedKey="photos" />
      </section>

      {/* Different Variants */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Variants</h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-2">Solid (default)</p>
            <TabsComponent
              items={basicTabs}
              variant="solid"
              defaultSelectedKey="photos"
            />
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Bordered</p>
            <TabsComponent
              items={basicTabs}
              variant="bordered"
              defaultSelectedKey="photos"
            />
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Light</p>
            <TabsComponent
              items={basicTabs}
              variant="light"
              defaultSelectedKey="photos"
            />
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Underlined</p>
            <TabsComponent
              items={basicTabs}
              variant="underlined"
              defaultSelectedKey="photos"
            />
          </div>
        </div>
      </section>

      {/* Different Colors */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Colors</h2>
        <div className="space-y-4">
          <TabsComponent
            items={basicTabs}
            color="primary"
            defaultSelectedKey="photos"
          />
          <TabsComponent
            items={basicTabs}
            color="secondary"
            defaultSelectedKey="photos"
          />
          <TabsComponent
            items={basicTabs}
            color="success"
            defaultSelectedKey="photos"
          />
          <TabsComponent
            items={basicTabs}
            color="warning"
            defaultSelectedKey="photos"
          />
          <TabsComponent
            items={basicTabs}
            color="danger"
            defaultSelectedKey="photos"
          />
        </div>
      </section>

      {/* Different Sizes */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Sizes</h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-2">Small</p>
            <TabsComponent
              items={basicTabs}
              size="sm"
              defaultSelectedKey="photos"
            />
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Medium (default)</p>
            <TabsComponent
              items={basicTabs}
              size="md"
              defaultSelectedKey="photos"
            />
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Large</p>
            <TabsComponent
              items={basicTabs}
              size="lg"
              defaultSelectedKey="photos"
            />
          </div>
        </div>
      </section>

      {/* With Icons */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">With Icons</h2>
        <TabsComponent
          items={tabsWithIcons}
          defaultSelectedKey="photos"
          color="primary"
        />
      </section>

      {/* With Badges */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">With Badges</h2>
        <TabsComponent
          items={tabsWithBadges}
          defaultSelectedKey="photos"
          variant="underlined"
        />
      </section>

      {/* Controlled Example */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Controlled Tabs</h2>
        <p className="text-sm text-gray-600">
          Currently selected: <strong>{selectedTab}</strong>
        </p>
        <TabsComponent
          items={basicTabs}
          selectedKey={selectedTab}
          onSelectionChange={setSelectedTab}
          color="primary"
        />
      </section>

      {/* Disabled Tabs */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Disabled Tabs</h2>
        <TabsComponent
          items={basicTabs}
          disabledKeys={["music"]}
          defaultSelectedKey="photos"
        />
      </section>

      {/* Full Width */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Full Width</h2>
        <TabsComponent
          items={basicTabs}
          fullWidth
          defaultSelectedKey="photos"
        />
      </section>

      {/* Different Placements */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Placement</h2>
        <div className="space-y-6">
          <div>
            <p className="text-sm text-gray-600 mb-2">Top (default)</p>
            <TabsComponent
              items={basicTabs}
              placement="top"
              defaultSelectedKey="photos"
            />
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Bottom</p>
            <TabsComponent
              items={basicTabs}
              placement="bottom"
              defaultSelectedKey="photos"
            />
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Start</p>
            <TabsComponent
              items={basicTabs}
              placement="start"
              defaultSelectedKey="photos"
              className="h-64"
            />
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">End</p>
            <TabsComponent
              items={basicTabs}
              placement="end"
              defaultSelectedKey="photos"
              className="h-64"
            />
          </div>
        </div>
      </section>

      {/* Vertical */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Vertical Tabs</h2>
        <TabsComponent
          items={tabsWithIcons}
          isVertical
          defaultSelectedKey="photos"
          className="h-64"
        />
      </section>

      {/* Custom Styles */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Custom Styles</h2>
        <TabsComponent
          items={tabsWithBadges}
          defaultSelectedKey="photos"
          variant="underlined"
          classNames={{
            tabList: "gap-6",
            cursor: "w-full bg-gradient-to-r from-primary to-secondary",
            tab: "max-w-fit px-0 h-12",
            tabContent: "group-data-[selected=true]:text-primary",
          }}
        />
      </section>
    </div>
  );
}
