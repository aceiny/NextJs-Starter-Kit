"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Tooltip as TooltipPrimitive,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// ============================================================
// TYPES
// ============================================================

export type TooltipVariant =
  | "default"
  | "info"
  | "success"
  | "warning"
  | "error";
export type TooltipSize = "sm" | "md" | "lg";

export interface CustomTooltipProps {
  /** The content to display in the tooltip */
  content: React.ReactNode;
  /** The element that triggers the tooltip */
  children: React.ReactNode;
  /** The side of the trigger to display the tooltip on */
  side?: "top" | "right" | "bottom" | "left";
  /** The alignment of the tooltip relative to the trigger */
  align?: "start" | "center" | "end";
  /** The delay before the tooltip appears (in ms) */
  delayDuration?: number;
  /** The offset from the trigger (in px) */
  sideOffset?: number;
  /** The variant/style of the tooltip */
  variant?: TooltipVariant;
  /** The size of the tooltip */
  size?: TooltipSize;
  /** Whether the tooltip is disabled */
  disabled?: boolean;
  /** Additional className for the tooltip content */
  className?: string;
  /** Whether to show an arrow */
  showArrow?: boolean;
  /** Maximum width of the tooltip */
  maxWidth?: number | string;
}

// ============================================================
// VARIANT STYLES
// ============================================================

const variantStyles: Record<TooltipVariant, string> = {
  default: "bg-foreground text-background",
  info: "bg-blue-600 text-white dark:bg-blue-500",
  success: "bg-green-600 text-white dark:bg-green-500",
  warning: "bg-amber-500 text-white dark:bg-amber-400 dark:text-gray-900",
  error: "bg-red-600 text-white dark:bg-red-500",
};

const arrowStyles: Record<TooltipVariant, string> = {
  default: "fill-foreground",
  info: "fill-blue-600 dark:fill-blue-500",
  success: "fill-green-600 dark:fill-green-500",
  warning: "fill-amber-500 dark:fill-amber-400",
  error: "fill-red-600 dark:fill-red-500",
};

const sizeStyles: Record<TooltipSize, string> = {
  sm: "text-xs px-2 py-1",
  md: "text-sm px-3 py-1.5",
  lg: "text-base px-4 py-2",
};

// ============================================================
// COMPONENT
// ============================================================

export function CustomTooltip({
  content,
  children,
  side = "top",
  align = "center",
  delayDuration = 200,
  sideOffset = 4,
  variant = "default",
  size = "md",
  disabled = false,
  className,
  showArrow = true,
  maxWidth = 300,
}: CustomTooltipProps) {
  if (disabled) {
    return <>{children}</>;
  }

  return (
    <TooltipPrimitive delayDuration={delayDuration}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent
        side={side}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "z-50 rounded-md shadow-md",
          "animate-in fade-in-0 zoom-in-95",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          "data-[side=bottom]:slide-in-from-top-2",
          "data-[side=left]:slide-in-from-right-2",
          "data-[side=right]:slide-in-from-left-2",
          "data-[side=top]:slide-in-from-bottom-2",
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        style={{
          maxWidth: typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth,
        }}
      >
        {content}
        {showArrow && (
          <div
            className={cn(
              "absolute size-2.5 rotate-45 rounded-[2px]",
              arrowStyles[variant],
              // Position arrow based on side
              side === "top" &&
                "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",
              side === "bottom" &&
                "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2",
              side === "left" &&
                "right-0 top-1/2 translate-x-1/2 -translate-y-1/2",
              side === "right" &&
                "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2",
            )}
          />
        )}
      </TooltipContent>
    </TooltipPrimitive>
  );
}

// ============================================================
// CONVENIENCE COMPONENTS
// ============================================================

export function InfoTooltip(props: Omit<CustomTooltipProps, "variant">) {
  return <CustomTooltip {...props} variant="info" />;
}

export function SuccessTooltip(props: Omit<CustomTooltipProps, "variant">) {
  return <CustomTooltip {...props} variant="success" />;
}

export function WarningTooltip(props: Omit<CustomTooltipProps, "variant">) {
  return <CustomTooltip {...props} variant="warning" />;
}

export function ErrorTooltip(props: Omit<CustomTooltipProps, "variant">) {
  return <CustomTooltip {...props} variant="error" />;
}

export default CustomTooltip;
