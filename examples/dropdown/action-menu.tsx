"use client";

import { useState } from "react";
import {
  Copy,
  Edit,
  Trash2,
  Share,
  Download,
  Star,
  Archive,
  Mail,
  MessageSquare,
  Users,
  Settings,
  LogOut,
  User,
  CreditCard,
  Keyboard,
  Cloud,
  LifeBuoy,
  Plus,
} from "lucide-react";
import { ActionMenu } from "@/components/ActionMenu";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function ActionMenuExamples() {
  const [showStatus, setShowStatus] = useState(true);
  const [showActivity, setShowActivity] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState("system");

  return (
    <div className="space-y-12">
      {/* Basic Action Menu */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
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
                separator: true,
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

          <span className="text-sm text-muted-foreground">
            ← Click the menu icon
          </span>
        </div>
      </div>

      {/* With Menu Label */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
          With Menu Label
        </h3>
        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          Menu with a header label and shortcuts
        </p>
        <ActionMenu
          menuLabel="Actions"
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
        />
      </div>

      {/* Custom Trigger */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
          Custom Trigger
        </h3>
        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          Using a custom button as the trigger
        </p>
        <ActionMenu
          trigger={
            <Button variant="outline" size="sm">
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

      {/* Grouped Items */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
          Grouped Items
        </h3>
        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          Items organized in labeled groups
        </p>
        <ActionMenu
          menuLabel="My Account"
          groups={[
            {
              label: "Profile",
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
              label: "Help",
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
              items: [
                {
                  id: "logout",
                  label: "Log out",
                  icon: LogOut,
                  shortcut: "⇧⌘Q",
                  onClick: () => toast.info("Logged out"),
                },
              ],
            },
          ]}
        />
      </div>

      {/* Checkbox Items */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
          Checkbox Items
        </h3>
        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          Toggle options with checkboxes
        </p>
        <div className="flex items-center gap-4">
          <ActionMenu
            menuLabel="View Options"
            checkboxItems={[
              {
                id: "status",
                label: "Show Status Bar",
                checked: showStatus,
                onCheckedChange: setShowStatus,
              },
              {
                id: "activity",
                label: "Show Activity Log",
                checked: showActivity,
                onCheckedChange: setShowActivity,
              },
            ]}
          />
          <span className="text-sm text-muted-foreground">
            Status: {showStatus ? "On" : "Off"}, Activity:{" "}
            {showActivity ? "On" : "Off"}
          </span>
        </div>
      </div>

      {/* Radio Groups */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
          Radio Groups
        </h3>
        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          Single selection from a list of options
        </p>
        <div className="flex items-center gap-4">
          <ActionMenu
            menuLabel="Appearance"
            radioGroups={[
              {
                label: "Theme",
                value: selectedTheme,
                onValueChange: setSelectedTheme,
                options: [
                  { id: "light", label: "Light" },
                  { id: "dark", label: "Dark" },
                  { id: "system", label: "System" },
                ],
              },
            ]}
          />
          <span className="text-sm text-muted-foreground">
            Selected theme: {selectedTheme}
          </span>
        </div>
      </div>

      {/* With Submenus */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
          With Submenus
        </h3>
        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          Nested dropdown menus
        </p>
        <ActionMenu
          items={[
            {
              id: "new",
              label: "New File",
              icon: Plus,
              onClick: () => toast.info("New file"),
            },
            {
              id: "save",
              label: "Save",
              icon: Download,
              shortcut: "⌘S",
              onClick: () => toast.info("Saved"),
            },
          ]}
          submenus={[
            {
              label: "Share",
              icon: Share,
              items: [
                {
                  id: "email",
                  label: "Email",
                  icon: Mail,
                  onClick: () => toast.info("Share via email"),
                },
                {
                  id: "message",
                  label: "Message",
                  icon: MessageSquare,
                  onClick: () => toast.info("Share via message"),
                },
                {
                  id: "teams",
                  label: "Share with Team",
                  icon: Users,
                  onClick: () => toast.info("Share with team"),
                },
              ],
            },
            {
              label: "More Actions",
              icon: Settings,
              items: [
                {
                  id: "star",
                  label: "Star",
                  icon: Star,
                  onClick: () => toast.info("Starred"),
                },
                {
                  id: "archive",
                  label: "Archive",
                  icon: Archive,
                  onClick: () => toast.info("Archived"),
                },
              ],
            },
          ]}
        />
      </div>

      {/* Custom Header */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
          Custom Header
        </h3>
        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          Using customHeader for complex menu headers with user info
        </p>
        <ActionMenu
          customHeader={
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                JD
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">John Doe</span>
                <span className="text-xs text-muted-foreground">
                  john@example.com
                </span>
              </div>
            </div>
          }
          groups={[
            {
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

      {/* Vertical Trigger Variant */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
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
            <span className="text-xs text-muted-foreground">Horizontal</span>
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
            <span className="text-xs text-muted-foreground">Vertical</span>
          </div>
        </div>
      </div>

      {/* Complex Example */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
          Complete Example
        </h3>
        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          Combining multiple features
        </p>
        <ActionMenu
          menuLabel="File Options"
          buttonVariant="outline"
          buttonSize="sm"
          trigger={
            <Button variant="outline" size="sm">
              <Settings className="mr-2 h-4 w-4" />
              Options
            </Button>
          }
          items={[
            {
              id: "open",
              label: "Open",
              shortcut: "⌘O",
              onClick: () => toast.info("Open"),
            },
            {
              id: "save",
              label: "Save",
              icon: Download,
              shortcut: "⌘S",
              onClick: () => toast.info("Save"),
            },
          ]}
          checkboxItems={[
            {
              id: "autosave",
              label: "Auto-save enabled",
              checked: showStatus,
              onCheckedChange: setShowStatus,
            },
          ]}
          radioGroups={[
            {
              label: "Format",
              value: selectedTheme,
              onValueChange: setSelectedTheme,
              options: [
                { id: "light", label: "JSON" },
                { id: "dark", label: "XML" },
                { id: "system", label: "YAML" },
              ],
            },
          ]}
          submenus={[
            {
              label: "Export As",
              icon: Share,
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
        />
      </div>
    </div>
  );
}

export default ActionMenuExamples;
