"use client";

import * as React from "react";
import { MoreHorizontal, MoreVertical, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuGroup,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

// ============================================================
// TYPES
// ============================================================

export interface ActionMenuItem {
  /** Unique identifier for the item */
  id: string;
  /** Display label */
  label: string;
  /** Icon component */
  icon?: LucideIcon;
  /** Click handler */
  onClick?: () => void;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Keyboard shortcut display (e.g., "⌘K") */
  shortcut?: string;
  /** Destructive/danger styling */
  variant?: "default" | "destructive";
  /** Whether to show a separator after this item */
  separator?: boolean;
}

export interface ActionMenuCheckboxItem {
  /** Unique identifier */
  id: string;
  /** Display label */
  label: string;
  /** Whether checked */
  checked: boolean;
  /** Change handler */
  onCheckedChange: (checked: boolean) => void;
  /** Whether the item is disabled */
  disabled?: boolean;
  /** Icon component */
  icon?: LucideIcon;
}

export interface ActionMenuRadioGroup {
  /** Group label */
  label?: string;
  /** Current value */
  value: string;
  /** Change handler */
  onValueChange: (value: string) => void;
  /** Radio options */
  options: {
    id: string;
    label: string;
    icon?: LucideIcon;
    disabled?: boolean;
  }[];
}

export interface ActionMenuSubmenu {
  /** Submenu trigger label */
  label: string;
  /** Icon for the trigger */
  icon?: LucideIcon;
  /** Submenu items */
  items: ActionMenuItem[];
}

export interface ActionMenuGroup {
  /** Optional group label */
  label?: string;
  /** Items in the group */
  items: ActionMenuItem[];
}

export interface ActionMenuProps {
  /** Simple action items */
  items?: ActionMenuItem[];
  /** Grouped action items */
  groups?: ActionMenuGroup[];
  /** Checkbox items */
  checkboxItems?: ActionMenuCheckboxItem[];
  /** Radio groups */
  radioGroups?: ActionMenuRadioGroup[];
  /** Submenus */
  submenus?: ActionMenuSubmenu[];
  /** Menu label displayed at the top */
  menuLabel?: string;
  /** Trigger icon style */
  triggerVariant?: "horizontal" | "vertical";
  /** Custom trigger element */
  trigger?: React.ReactNode;
  /** Trigger button variant */
  buttonVariant?: "default" | "ghost" | "outline" | "secondary";
  /** Trigger button size */
  buttonSize?: "default" | "sm" | "lg" | "icon" | "icon-sm";
  /** Alignment of the dropdown */
  align?: "start" | "center" | "end";
  /** Side of the trigger to display on */
  side?: "top" | "right" | "bottom" | "left";
  /** Additional className for the content */
  contentClassName?: string;
  /** Additional className for the trigger */
  triggerClassName?: string;
  /** Whether the menu is disabled */
  disabled?: boolean;
}

// ============================================================
// COMPONENT
// ============================================================

export function ActionMenu({
  items,
  groups,
  checkboxItems,
  radioGroups,
  submenus,
  menuLabel,
  triggerVariant = "horizontal",
  trigger,
  buttonVariant = "ghost",
  buttonSize = "icon-sm",
  align = "end",
  side = "bottom",
  contentClassName,
  triggerClassName,
  disabled = false,
}: ActionMenuProps) {
  const TriggerIcon =
    triggerVariant === "vertical" ? MoreVertical : MoreHorizontal;

  const renderItem = (item: ActionMenuItem) => (
    <React.Fragment key={item.id}>
      <DropdownMenuItem
        onClick={item.onClick}
        disabled={item.disabled}
        variant={item.variant}
        className={cn(
          "cursor-pointer",
          item.variant === "destructive" &&
            "text-destructive focus:text-destructive",
        )}
      >
        {item.icon && <item.icon className="mr-2 h-4 w-4" />}
        <span>{item.label}</span>
        {item.shortcut && (
          <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>
        )}
      </DropdownMenuItem>
      {item.separator && <DropdownMenuSeparator />}
    </React.Fragment>
  );

  const renderCheckboxItem = (item: ActionMenuCheckboxItem) => (
    <DropdownMenuCheckboxItem
      key={item.id}
      checked={item.checked}
      onCheckedChange={item.onCheckedChange}
      disabled={item.disabled}
    >
      {item.icon && <item.icon className="mr-2 h-4 w-4" />}
      {item.label}
    </DropdownMenuCheckboxItem>
  );

  const renderRadioGroup = (group: ActionMenuRadioGroup, index: number) => (
    <React.Fragment key={`radio-group-${index}`}>
      {group.label && <DropdownMenuLabel>{group.label}</DropdownMenuLabel>}
      <DropdownMenuRadioGroup
        value={group.value}
        onValueChange={group.onValueChange}
      >
        {group.options.map((option) => (
          <DropdownMenuRadioItem
            key={option.id}
            value={option.id}
            disabled={option.disabled}
          >
            {option.icon && <option.icon className="mr-2 h-4 w-4" />}
            {option.label}
          </DropdownMenuRadioItem>
        ))}
      </DropdownMenuRadioGroup>
      {index < (radioGroups?.length ?? 0) - 1 && <DropdownMenuSeparator />}
    </React.Fragment>
  );

  const renderSubmenu = (submenu: ActionMenuSubmenu, index: number) => (
    <React.Fragment key={`submenu-${index}`}>
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>
          {submenu.icon && <submenu.icon className="mr-2 h-4 w-4" />}
          <span>{submenu.label}</span>
        </DropdownMenuSubTrigger>
        <DropdownMenuSubContent>
          {submenu.items.map(renderItem)}
        </DropdownMenuSubContent>
      </DropdownMenuSub>
    </React.Fragment>
  );

  const renderGroup = (group: ActionMenuGroup, index: number) => (
    <React.Fragment key={`group-${index}`}>
      <DropdownMenuGroup>
        {group.label && <DropdownMenuLabel>{group.label}</DropdownMenuLabel>}
        {group.items.map(renderItem)}
      </DropdownMenuGroup>
      {index < (groups?.length ?? 0) - 1 && <DropdownMenuSeparator />}
    </React.Fragment>
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={disabled}>
        {trigger ? (
          <span className={triggerClassName}>{trigger}</span>
        ) : (
          <Button
            variant={buttonVariant}
            size={buttonSize}
            className={cn("h-8 w-8 p-0", triggerClassName)}
            disabled={disabled}
          >
            <span className="sr-only">Open menu</span>
            <TriggerIcon className="h-4 w-4" />
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={align}
        side={side}
        className={cn("w-56", contentClassName)}
      >
        {/* Menu label */}
        {menuLabel && (
          <>
            <DropdownMenuLabel>{menuLabel}</DropdownMenuLabel>
            <DropdownMenuSeparator />
          </>
        )}

        {/* Simple items */}
        {items && items.length > 0 && items.map(renderItem)}

        {/* Grouped items */}
        {groups && groups.length > 0 && (
          <>
            {items && items.length > 0 && <DropdownMenuSeparator />}
            {groups.map(renderGroup)}
          </>
        )}

        {/* Checkbox items */}
        {checkboxItems && checkboxItems.length > 0 && (
          <>
            {((items && items.length > 0) || (groups && groups.length > 0)) && (
              <DropdownMenuSeparator />
            )}
            {checkboxItems.map(renderCheckboxItem)}
          </>
        )}

        {/* Radio groups */}
        {radioGroups && radioGroups.length > 0 && (
          <>
            {((items && items.length > 0) ||
              (groups && groups.length > 0) ||
              (checkboxItems && checkboxItems.length > 0)) && (
              <DropdownMenuSeparator />
            )}
            {radioGroups.map(renderRadioGroup)}
          </>
        )}

        {/* Submenus */}
        {submenus && submenus.length > 0 && (
          <>
            {((items && items.length > 0) ||
              (groups && groups.length > 0) ||
              (checkboxItems && checkboxItems.length > 0) ||
              (radioGroups && radioGroups.length > 0)) && (
              <DropdownMenuSeparator />
            )}
            {submenus.map(renderSubmenu)}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ActionMenu;
