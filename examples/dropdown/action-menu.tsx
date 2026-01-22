"use client";

import { useState } from "react";
import {
  Copy,
  Edit,
  Trash2,
  Share,
  Download,
  Archive,
  Users,
  Settings,
  LogOut,
  User,
  CreditCard,
  Keyboard,
  Cloud,
  LifeBuoy,
  Plus,
  Sun,
  Moon,
  Monitor,
  FileText,
  Image as ImageIcon,
  Video,
  Music,
} from "lucide-react";
import { Button, Avatar } from "@heroui/react";
import { toast } from "sonner";
import ActionMenu from "@/components/shared/DropdownActionMenu";

export function ActionMenuExamples() {
  const [selectedTheme, setSelectedTheme] = useState("system");
  const [selectedFormat, setSelectedFormat] = useState("json");
  const [selectedFiles, setSelectedFiles] = useState<Set<React.Key>>(new Set());
  const [autoSave, setAutoSave] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-gray-100">
            HeroUI Action Menu Examples
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Comprehensive dropdown menu component built with HeroUI
          </p>
        </div>

        <div className="space-y-12">
          {/* Basic Action Menu */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-800">
            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
              Basic Action Menu
            </h3>
            <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
              Simple dropdown with action items
            </p>
            <div className="flex items-center gap-4">
              <ActionMenu
                items={[
                  {
                    id: "copy",
                    label: "Copy",
                    icon: Copy,
                    onClick: () => toast.info("Copied!"),
                  },
                  {
                    id: "edit",
                    label: "Edit",
                    icon: Edit,
                    onClick: () => toast.info("Edit clicked"),
                  },
                  {
                    id: "share",
                    label: "Share",
                    icon: Share,
                    onClick: () => toast.info("Share clicked"),
                  },
                  {
                    id: "download",
                    label: "Download",
                    icon: Download,
                    onClick: () => toast.info("Download clicked"),
                    showDivider: true,
                  },
                  {
                    id: "delete",
                    label: "Delete",
                    icon: Trash2,
                    variant: "destructive",
                    onClick: () => toast.error("Deleted!"),
                  },
                ]}
              />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                ← Click the menu icon
              </span>
            </div>
          </div>

          {/* With Menu Label & Shortcuts */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-800">
            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
              With Menu Label & Shortcuts
            </h3>
            <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
              Menu with a header label and keyboard shortcuts
            </p>
            <ActionMenu
              menuLabel="Edit Actions"
              items={[
                {
                  id: "copy",
                  label: "Copy",
                  icon: Copy,
                  shortcut: "⌘C",
                  onClick: () => toast.info("Copied!"),
                },
                {
                  id: "paste",
                  label: "Paste",
                  icon: Edit,
                  shortcut: "⌘V",
                  onClick: () => toast.info("Pasted!"),
                },
                {
                  id: "cut",
                  label: "Cut",
                  icon: Trash2,
                  shortcut: "⌘X",
                  onClick: () => toast.info("Cut!"),
                },
              ]}
              variant="bordered"
            />
          </div>

          {/* Custom Trigger */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-800">
            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
              Custom Trigger
            </h3>
            <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
              Using a custom button as the trigger
            </p>
            <ActionMenu
              trigger={
                <Button variant="bordered" size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New
                </Button>
              }
              items={[
                {
                  id: "user",
                  label: "New User",
                  icon: User,
                  onClick: () => toast.info("New user"),
                },
                {
                  id: "team",
                  label: "New Team",
                  icon: Users,
                  onClick: () => toast.info("New team"),
                },
                {
                  id: "project",
                  label: "New Project",
                  icon: Archive,
                  onClick: () => toast.info("New project"),
                },
              ]}
            />
          </div>

          {/* Grouped/Sectioned Items */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-800">
            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
              Grouped/Sectioned Items
            </h3>
            <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
              Items organized in labeled sections
            </p>
            <ActionMenu
              menuLabel="My Account"
              sections={[
                {
                  id: "profile-section",
                  title: "Profile",
                  items: [
                    {
                      id: "profile",
                      label: "View Profile",
                      icon: User,
                      onClick: () => toast.info("Profile"),
                    },
                    {
                      id: "billing",
                      label: "Billing",
                      icon: CreditCard,
                      onClick: () => toast.info("Billing"),
                    },
                    {
                      id: "settings",
                      label: "Settings",
                      icon: Settings,
                      shortcut: "⌘S",
                      onClick: () => toast.info("Settings"),
                    },
                    {
                      id: "shortcuts",
                      label: "Keyboard Shortcuts",
                      icon: Keyboard,
                      shortcut: "⌘K",
                      onClick: () => toast.info("Shortcuts"),
                    },
                  ],
                },
                {
                  id: "help-section",
                  title: "Help",
                  showDivider: true,
                  items: [
                    {
                      id: "support",
                      label: "Support",
                      icon: LifeBuoy,
                      onClick: () => toast.info("Support"),
                    },
                    {
                      id: "api",
                      label: "API",
                      icon: Cloud,
                      onClick: () => toast.info("API"),
                    },
                  ],
                },
                {
                  id: "logout-section",
                  showDivider: true,
                  items: [
                    {
                      id: "logout",
                      label: "Log out",
                      icon: LogOut,
                      shortcut: "⇧⌘Q",
                      variant: "destructive",
                      onClick: () => toast.info("Logged out"),
                    },
                  ],
                },
              ]}
              variant="shadow"
            />
          </div>

          {/* Single Selection (Radio) */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-800">
            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
              Single Selection (Radio)
            </h3>
            <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
              Single selection from a list of options
            </p>
            <div className="flex items-center gap-4">
              <ActionMenu
                menuLabel="Theme"
                selectionMode="single"
                selectedKeys={new Set([selectedTheme])}
                onSelectionChange={(keys: any) => {
                  const selected = Array.from(keys)[0];
                  if (selected) {
                    setSelectedTheme(String(selected));
                    toast.success(`Theme changed to ${selected}`);
                  }
                }}
                items={[
                  { id: "light", label: "Light", icon: Sun },
                  { id: "dark", label: "Dark", icon: Moon },
                  { id: "system", label: "System", icon: Monitor },
                ]}
                variant="flat"
                color="primary"
              />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Selected: <strong>{selectedTheme}</strong>
              </span>
            </div>
          </div>

          {/* Selection with Custom Trigger Showing Selected Value */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-800">
            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
              Selection with Value in Trigger
            </h3>
            <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
              Display the selected value in the trigger button
            </p>
            <ActionMenu
              trigger={<Button variant="bordered">{selectedTheme}</Button>}
              selectionMode="single"
              selectedKeys={new Set([selectedTheme])}
              onSelectionChange={(keys: any) => {
                const selected = Array.from(keys)[0];
                if (selected) {
                  setSelectedTheme(String(selected));
                  toast.success(`Theme changed to ${selected}`);
                }
              }}
              items={[
                { id: "light", label: "Light", icon: Sun },
                { id: "dark", label: "Dark", icon: Moon },
                { id: "system", label: "System", icon: Monitor },
              ]}
            />
          </div>

          {/* Multiple Selection with Count in Trigger */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-800">
            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
              Multiple Selection with Count in Trigger
            </h3>
            <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
              Show selected count in the trigger button
            </p>
            <ActionMenu
              trigger={
                <Button variant="bordered">
                  {selectedFiles.size === 0 ? (
                    <>
                      <FileText className="w-4 h-4 mr-2" />
                      Select Files
                    </>
                  ) : (
                    <>
                      <FileText className="w-4 h-4 mr-2" />
                      {selectedFiles.size} Selected
                    </>
                  )}
                </Button>
              }
              selectionMode="multiple"
              selectedKeys={selectedFiles}
              onSelectionChange={(keys: any) => {
                setSelectedFiles(keys as Set<React.Key>);
                toast.info(`${(keys as Set<React.Key>).size} items selected`);
              }}
              items={[
                { id: "images", label: "Images", icon: ImageIcon },
                { id: "videos", label: "Videos", icon: Video },
                { id: "audio", label: "Audio", icon: Music },
                { id: "documents", label: "Documents", icon: FileText },
              ]}
            />
          </div>

          {/* Multiple Selection */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-800">
            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
              Multiple Selection
            </h3>
            <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
              Select multiple items at once
            </p>
            <div className="flex items-center gap-4">
              <ActionMenu
                menuLabel="Select File Types"
                selectionMode="multiple"
                selectedKeys={selectedFiles}
                onSelectionChange={(keys: any) => {
                  setSelectedFiles(keys as Set<React.Key>);
                  toast.info(`${(keys as Set<React.Key>).size} items selected`);
                }}
                items={[
                  { id: "images", label: "Images", icon: ImageIcon },
                  { id: "videos", label: "Videos", icon: Video },
                  { id: "audio", label: "Audio", icon: Music },
                  { id: "documents", label: "Documents", icon: FileText },
                ]}
                variant="bordered"
              />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Selected: <strong>{selectedFiles.size} items</strong>
              </span>
            </div>
          </div>

          {/* With Descriptions */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-800">
            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
              With Descriptions
            </h3>
            <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
              Menu items with helpful descriptions
            </p>
            <ActionMenu
              items={[
                {
                  id: "download",
                  label: "Download",
                  description: "Save file to your device",
                  icon: Download,
                  onClick: () => toast.info("Download started"),
                },
                {
                  id: "share",
                  label: "Share",
                  description: "Share with your team",
                  icon: Share,
                  onClick: () => toast.info("Share dialog opened"),
                },
                {
                  id: "archive",
                  label: "Archive",
                  description: "Move to archive folder",
                  icon: Archive,
                  onClick: () => toast.info("Archived"),
                },
              ]}
              variant="faded"
            />
          </div>

          {/* Custom Header */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-800">
            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
              Custom Header
            </h3>
            <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
              Using customHeader for complex headers with user info
            </p>
            <ActionMenu
              customHeader={
                <div className="flex items-center gap-3 px-1 py-2">
                  <Avatar
                    src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                    size="md"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold">John Doe</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      john@example.com
                    </span>
                  </div>
                </div>
              }
              sections={[
                {
                  id: "account",
                  items: [
                    {
                      id: "profile",
                      label: "View Profile",
                      icon: User,
                      onClick: () => toast.info("Profile"),
                    },
                    {
                      id: "settings",
                      label: "Settings",
                      icon: Settings,
                      onClick: () => toast.info("Settings"),
                    },
                  ],
                },
                {
                  id: "logout",
                  showDivider: true,
                  items: [
                    {
                      id: "logout",
                      label: "Log out",
                      icon: LogOut,
                      variant: "destructive",
                      onClick: () => toast.info("Logged out"),
                    },
                  ],
                },
              ]}
            />
          </div>

          {/* Trigger Variants */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-800">
            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
              Trigger Variants
            </h3>
            <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
              Horizontal vs Vertical dot menu triggers
            </p>
            <div className="flex items-center gap-8">
              <div className="flex flex-col items-center gap-2">
                <ActionMenu
                  triggerVariant="horizontal"
                  items={[
                    {
                      id: "edit",
                      label: "Edit",
                      icon: Edit,
                      onClick: () => toast.info("Edit"),
                    },
                    {
                      id: "delete",
                      label: "Delete",
                      icon: Trash2,
                      variant: "destructive",
                      onClick: () => toast.error("Delete"),
                    },
                  ]}
                />
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Horizontal
                </span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <ActionMenu
                  triggerVariant="vertical"
                  items={[
                    {
                      id: "edit",
                      label: "Edit",
                      icon: Edit,
                      onClick: () => toast.info("Edit"),
                    },
                    {
                      id: "delete",
                      label: "Delete",
                      icon: Trash2,
                      variant: "destructive",
                      onClick: () => toast.error("Delete"),
                    },
                  ]}
                />
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Vertical
                </span>
              </div>
            </div>
          </div>

          {/* Different Colors & Variants */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-800">
            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
              Colors & Variants
            </h3>
            <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
              Different visual styles
            </p>
            <div className="flex items-center gap-4 flex-wrap">
              <ActionMenu
                variant="solid"
                color="primary"
                buttonColor="primary"
                items={[
                  { id: "edit", label: "Edit", icon: Edit },
                  { id: "delete", label: "Delete", icon: Trash2 },
                ]}
              />
              <ActionMenu
                variant="bordered"
                color="success"
                buttonColor="success"
                items={[
                  { id: "edit", label: "Edit", icon: Edit },
                  { id: "delete", label: "Delete", icon: Trash2 },
                ]}
              />
              <ActionMenu
                variant="flat"
                color="warning"
                buttonColor="warning"
                items={[
                  { id: "edit", label: "Edit", icon: Edit },
                  { id: "delete", label: "Delete", icon: Trash2 },
                ]}
              />
              <ActionMenu
                variant="shadow"
                color="danger"
                buttonColor="danger"
                items={[
                  { id: "edit", label: "Edit", icon: Edit },
                  { id: "delete", label: "Delete", icon: Trash2 },
                ]}
              />
            </div>
          </div>

          {/* Complex Combined Example */}
          <div className=" dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-lg p-6 border border-blue-200 dark:border-gray-700">
            <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
              Complete Example
            </h3>
            <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
              Combining multiple features: sections, selections, custom trigger
            </p>
            <ActionMenu
              trigger={
                <Button variant="shadow" color="primary" size="md">
                  <Settings className="mr-2 h-4 w-4" />
                  File Options
                </Button>
              }
              sections={[
                {
                  id: "actions",
                  title: "Actions",
                  items: [
                    {
                      id: "open",
                      label: "Open",
                      shortcut: "⌘O",
                      icon: FileText,
                      onClick: () => toast.info("Open"),
                    },
                    {
                      id: "save",
                      label: "Save",
                      icon: Download,
                      shortcut: "⌘S",
                      onClick: () => toast.info("Save"),
                    },
                  ],
                },
                {
                  id: "format",
                  title: "Export Format",
                  showDivider: true,
                  items: [
                    {
                      id: "pdf",
                      label: "PDF",
                      onClick: () => toast.info("Export as PDF"),
                    },
                    {
                      id: "csv",
                      label: "CSV",
                      onClick: () => toast.info("Export as CSV"),
                    },
                    {
                      id: "xlsx",
                      label: "Excel",
                      onClick: () => toast.info("Export as Excel"),
                    },
                  ],
                },
              ]}
              variant="shadow"
              placement="bottom-start"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActionMenuExamples;
