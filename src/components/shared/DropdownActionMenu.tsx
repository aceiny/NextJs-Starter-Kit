"use client";

import * as React from "react";
import { type LucideIcon, MoreHorizontal, MoreVertical } from "lucide-react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
  Button,
  type PopoverProps,
} from "@heroui/react";
import { cn } from "@/lib/utils";

// ============================================================
// TYPES
// ============================================================

export interface ActionMenuItem {
  /** Unique identifier for the item */
  id: string;
  /** Display label */
  label: string;
  /** Optional title (separate from label) */
  title?: string;
  /** Icon component */
  icon?: LucideIcon;
  /** Click handler */
  onClick?: () => void;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Keyboard shortcut display (e.g., "⌘K") */
  shortcut?: string | React.ReactNode;
  /** Description text */
  description?: string | React.ReactNode;
  /** Destructive/danger styling */
  variant?: "default" | "destructive";
  /** Color for the item */
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  /** Whether to show a separator after this item */
  showDivider?: boolean;
  /** Start content (icon/element on the left) */
  startContent?: React.ReactNode;
  /** End content (element on the right) */
  endContent?: React.ReactNode;
  /** Hide the selected icon */
  hideSelectedIcon?: boolean;
  /** Link properties */
  href?: string;
  target?: string;
  /** Custom className */
  className?: string;
}

export interface ActionMenuSection {
  /** Section identifier */
  id: string;
  /** Section title */
  title?: string;
  /** Items in the section */
  items: ActionMenuItem[];
  /** Whether to show a divider after the section */
  showDivider?: boolean;
  /** Hide selected icon for all items in section */
  hideSelectedIcon?: boolean;
  /** Custom classNames for section */
  classNames?: Partial<
    Record<"base" | "heading" | "group" | "divider", string>
  >;
}

export interface ActionMenuProps {
  /** Simple action items (flat list) */
  items?: ActionMenuItem[];
  /** Sectioned/grouped items */
  sections?: ActionMenuSection[];

  // Selection
  /** Selection mode */
  selectionMode?: "none" | "single" | "multiple";
  /** Selected keys */
  selectedKeys?: "all" | Iterable<React.Key>;
  /** Default selected keys */
  defaultSelectedKeys?: "all" | Iterable<React.Key>;
  /** Disabled keys */
  disabledKeys?: Iterable<React.Key>;
  /** Disallow empty selection */
  disallowEmptySelection?: boolean;

  // Appearance
  /** Menu variant */
  variant?: "solid" | "bordered" | "light" | "flat" | "faded" | "shadow";
  /** Menu color */
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  /** Menu label displayed at the top */
  menuLabel?: string;
  /** Custom header content (JSX) */
  customHeader?: React.ReactNode;
  /** Top content for menu */
  topContent?: React.ReactNode;
  /** Bottom content for menu */
  bottomContent?: React.ReactNode;
  /** Empty state content */
  emptyContent?: React.ReactNode;
  /** Hide empty content */
  hideEmptyContent?: boolean;
  /** Hide selected icon globally */
  hideSelectedIcon?: boolean;

  // Trigger
  /** Trigger icon style */
  triggerVariant?: "horizontal" | "vertical";
  /** Custom trigger element */
  trigger?: React.ReactNode;
  /** Trigger button variant */
  buttonVariant?:
    | "solid"
    | "bordered"
    | "light"
    | "flat"
    | "faded"
    | "shadow"
    | "ghost";
  /** Trigger button color */
  buttonColor?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  /** Trigger button size */
  buttonSize?: "sm" | "md" | "lg";
  /** Trigger button radius */
  buttonRadius?: "none" | "sm" | "md" | "lg" | "full";

  // Dropdown/Popover behavior
  /** Alignment of the dropdown */
  placement?:
    | "top"
    | "bottom"
    | "right"
    | "left"
    | "top-start"
    | "top-end"
    | "bottom-start"
    | "bottom-end"
    | "left-start"
    | "left-end"
    | "right-start"
    | "right-end";
  /** Trigger type */
  triggerType?: "press" | "longPress";
  /** Whether the menu is disabled */
  isDisabled?: boolean;
  /** Close on select */
  closeOnSelect?: boolean;
  /** Should block scroll */
  shouldBlockScroll?: boolean;
  /** Auto focus behavior */
  autoFocus?: boolean | "first" | "last";
  /** Should focus wrap */
  shouldFocusWrap?: boolean;
  /** Disable animation */
  disableAnimation?: boolean;

  // Popover props
  /** Backdrop type */
  backdrop?: "transparent" | "opaque" | "blur";
  /** Popover props to pass through */
  popoverProps?: Partial<PopoverProps>;

  // Styling
  /** Additional className for the menu content */
  menuClassName?: string;
  /** Additional className for the trigger */
  triggerClassName?: string;
  /** ClassNames for dropdown menu */
  menuClassNames?: Partial<Record<"base" | "list" | "emptyContent", string>>;
  /** Item class names (applied to all items) */
  itemClassNames?: Partial<
    Record<
      | "base"
      | "wrapper"
      | "title"
      | "description"
      | "shortcut"
      | "selectedIcon",
      string
    >
  >;

  // Events
  /** Action handler (fired when item is clicked) */
  onAction?: (key: React.Key) => void;
  /** Selection change handler */
  onSelectionChange?: (keys: "all" | Set<React.Key>) => void;
  /** Open change handler */
  onOpenChange?: (isOpen: boolean) => void;
  /** Close handler */
  onClose?: () => void;
}

// ============================================================
// COMPONENT
// ============================================================

export function ActionMenu({
  // Items
  items,
  sections,

  // Selection
  selectionMode = "none",
  selectedKeys,
  defaultSelectedKeys,
  disabledKeys,
  disallowEmptySelection = false,

  // Appearance
  variant = "flat",
  color = "default",
  menuLabel,
  customHeader,
  topContent,
  bottomContent,
  emptyContent,
  hideEmptyContent = false,
  hideSelectedIcon = false,

  // Trigger
  triggerVariant = "horizontal",
  trigger,
  buttonVariant = "light",
  buttonColor = "default",
  buttonSize = "sm",
  buttonRadius = "md",

  // Dropdown behavior
  placement = "bottom-end",
  triggerType = "press",
  isDisabled = false,
  closeOnSelect = true,
  shouldBlockScroll = true,
  autoFocus = false,
  shouldFocusWrap = false,
  disableAnimation = false,

  // Popover
  backdrop,
  popoverProps,

  // Styling
  menuClassName,
  triggerClassName,
  menuClassNames,
  itemClassNames,

  // Events
  onAction,
  onSelectionChange,
  onOpenChange,
  onClose,
}: ActionMenuProps) {
  const TriggerIcon =
    triggerVariant === "vertical" ? MoreVertical : MoreHorizontal;

  const renderItem = (item: ActionMenuItem) => {
    const Icon = item.icon;
    const itemColor = item.variant === "destructive" ? "danger" : item.color;

    return (
      <DropdownItem
        key={item.id}
        textValue={item.label}
        description={item.description}
        shortcut={item.shortcut}
        startContent={
          item.startContent || (Icon && <Icon className="w-4 h-4" />)
        }
        endContent={item.endContent}
        isDisabled={item.disabled}
        showDivider={item.showDivider}
        hideSelectedIcon={item.hideSelectedIcon}
        href={item.href}
        target={item.target}
        color={itemColor}
        className={item.className}
        classNames={itemClassNames}
        onPress={item.onClick}
      >
        {item.title || item.label}
      </DropdownItem>
    );
  };

  const renderSection = (section: ActionMenuSection) => (
    <DropdownSection
      key={section.id}
      title={section.title}
      showDivider={section.showDivider}
      hideSelectedIcon={section.hideSelectedIcon}
      classNames={section.classNames}
      items={section.items}
    >
      {section.items.map(renderItem)}
    </DropdownSection>
  );

  // Prepare top content with custom header or menu label
  const finalTopContent = React.useMemo(() => {
    if (customHeader) {
      return <div className="px-1 py-2">{customHeader}</div>;
    }
    if (menuLabel) {
      return (
        <div className="px-1 py-2 font-semibold text-small">{menuLabel}</div>
      );
    }
    return topContent;
  }, [customHeader, menuLabel, topContent]);

  return (
    <Dropdown
      type={selectionMode === "none" ? "menu" : "listbox"}
      trigger={triggerType}
      isDisabled={isDisabled}
      closeOnSelect={closeOnSelect}
      shouldBlockScroll={shouldBlockScroll}
      onOpenChange={onOpenChange}
      onClose={onClose}
      backdrop={backdrop}
      placement={placement}
      {...popoverProps}
    >
      <DropdownTrigger>
        {trigger || (
          <Button
            variant={buttonVariant}
            color={buttonColor}
            size={buttonSize}
            radius={buttonRadius}
            isIconOnly
            className={cn("min-w-8 w-8 h-8", triggerClassName)}
            isDisabled={isDisabled}
          >
            <TriggerIcon className="w-4 h-4" />
          </Button>
        )}
      </DropdownTrigger>

      <DropdownMenu
        aria-label={menuLabel || "Actions"}
        variant={variant}
        color={color}
        selectionMode={selectionMode}
        selectedKeys={selectedKeys as any}
        defaultSelectedKeys={defaultSelectedKeys as any}
        disabledKeys={disabledKeys as any}
        disallowEmptySelection={disallowEmptySelection}
        topContent={finalTopContent}
        bottomContent={bottomContent}
        emptyContent={emptyContent}
        hideEmptyContent={hideEmptyContent}
        hideSelectedIcon={hideSelectedIcon}
        autoFocus={autoFocus}
        shouldFocusWrap={shouldFocusWrap}
        closeOnSelect={closeOnSelect}
        disableAnimation={disableAnimation}
        classNames={menuClassNames}
        itemClasses={itemClassNames}
        className={cn("min-w-[200px]", menuClassName)}
        onAction={onAction}
        onSelectionChange={onSelectionChange}
        onClose={onClose}
      >
        {sections && sections.length > 0
          ? sections.map(renderSection)
          : (items || []).map(renderItem)}
      </DropdownMenu>
    </Dropdown>
  );
}

export default ActionMenu;
