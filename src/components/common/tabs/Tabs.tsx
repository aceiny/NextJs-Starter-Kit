"use client";

import * as React from "react";
import { Tabs as HeroTabs, Tab } from "@heroui/react";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================================
// TYPES
// ============================================================

export interface TabItem {
  /** Unique identifier for the tab */
  key: string;
  /** Display title */
  title: React.ReactNode;
  /** Tab content */
  content: React.ReactNode;
  /** Text value for accessibility */
  titleValue?: string;
  /** Icon component */
  icon?: LucideIcon;
  /** Whether the tab is disabled */
  disabled?: boolean;
  /** Link properties */
  href?: string;
  target?: string;
  rel?: string;
  download?: boolean | string;
  /** Custom className for this tab */
  className?: string;
  /** Start content (icon/element on the left) */
  startContent?: React.ReactNode;
  /** End content (element on the right) */
  endContent?: React.ReactNode;
}

export interface TabsComponentProps {
  /** Tab items to render */
  items: TabItem[];
  /** Default selected tab key */
  defaultSelectedKey?: string;
  /** Controlled selected tab key */
  selectedKey?: string;
  /** Disabled tab keys */
  disabledKeys?: string[];
  /** Whether all tabs are disabled */
  isDisabled?: boolean;
  /** Aria label for the tabs */
  ariaLabel?: string;

  // Appearance
  /** Tab variant */
  variant?: "solid" | "bordered" | "light" | "underlined";
  /** Tab color */
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  /** Tab size */
  size?: "sm" | "md" | "lg";
  /** Tab radius */
  radius?: "none" | "sm" | "md" | "lg" | "full";
  /** Whether tabs should take full width */
  fullWidth?: boolean;

  // Layout
  /** Placement of tabs */
  placement?: "top" | "bottom" | "start" | "end";
  /** Whether tabs are vertical */
  isVertical?: boolean;
  /** Destroy inactive tab panels (unmount when not selected) */
  destroyInactiveTabPanel?: boolean;

  // Behavior
  /** Keyboard activation mode */
  keyboardActivation?: "automatic" | "manual";
  /** Whether to select on press up */
  shouldSelectOnPressUp?: boolean;
  /** Disable cursor animation */
  disableCursorAnimation?: boolean;
  /** Disable all animations */
  disableAnimation?: boolean;

  // Styling
  /** Additional className for the tabs container */
  className?: string;
  /** Class names for different slots */
  classNames?: Partial<
    Record<
      | "base"
      | "tabList"
      | "tab"
      | "tabContent"
      | "cursor"
      | "panel"
      | "tabWrapper",
      string
    >
  >;

  // Events
  /** Called when the selected tab changes */
  onSelectionChange?: (key: string) => void;
}

// ============================================================
// COMPONENT
// ============================================================

export function TabsComponent({
  items,
  defaultSelectedKey,
  selectedKey,
  disabledKeys,
  isDisabled = false,
  ariaLabel = "Tabs",

  // Appearance
  variant = "solid",
  color = "default",
  size = "md",
  radius,
  fullWidth = false,

  // Layout
  placement = "top",
  isVertical = false,
  destroyInactiveTabPanel = true,

  // Behavior
  keyboardActivation = "automatic",
  shouldSelectOnPressUp = true,
  disableCursorAnimation = false,
  disableAnimation = false,

  // Styling
  className,
  classNames,

  // Events
  onSelectionChange,
}: TabsComponentProps) {
  // Determine if we're in controlled mode
  const isControlled = selectedKey !== undefined;

  return (
    <HeroTabs
      aria-label={ariaLabel}
      items={items}
      variant={variant}
      color={color}
      size={size}
      radius={radius}
      fullWidth={fullWidth}
      placement={placement}
      isVertical={isVertical}
      destroyInactiveTabPanel={destroyInactiveTabPanel}
      keyboardActivation={keyboardActivation}
      shouldSelectOnPressUp={shouldSelectOnPressUp}
      disableCursorAnimation={disableCursorAnimation}
      disableAnimation={disableAnimation}
      isDisabled={isDisabled}
      disabledKeys={disabledKeys}
      {...(isControlled
        ? { selectedKey }
        : defaultSelectedKey
          ? { defaultSelectedKey }
          : {})}
      onSelectionChange={(key) => onSelectionChange?.(key as string)}
      className={cn(className)}
      classNames={classNames}
    >
      {items.map((item) => {
        const Icon = item.icon;
        const startContent =
          item.startContent || (Icon && <Icon className="w-4 h-4" />);

        return (
          <Tab
            key={item.key}
            title={item.title}
            titleValue={item.titleValue}
            href={item.href}
            target={item.target}
            rel={item.rel}
            download={item.download}
            className={item.className}
            {...(startContent && { startContent })}
            {...(item.endContent && { endContent: item.endContent })}
          >
            {item.content}
          </Tab>
        );
      })}
    </HeroTabs>
  );
}

export default TabsComponent;
