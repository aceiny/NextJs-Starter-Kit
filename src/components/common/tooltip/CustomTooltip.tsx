"use client";

import * as React from "react";
import { Tooltip } from "@heroui/react";

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
// VARIANT TO COLOR MAPPING
// ============================================================

const variantToColor = {
  default: "default" as const,
  info: "primary" as const,
  success: "success" as const,
  warning: "warning" as const,
  error: "danger" as const,
};

// ============================================================
// PLACEMENT MAPPING
// ============================================================

const placementMap = {
  top: "top",
  bottom: "bottom",
  left: "left",
  right: "right",
} as const;

// ============================================================
// COMPONENT
// ============================================================

export function CustomTooltip({
  content,
  children,
  side = "top",
  delayDuration = 200,
  sideOffset = 7,
  variant = "default",
  size = "md",
  disabled = false,
  className,
  showArrow = false,
}: CustomTooltipProps) {
  if (disabled) {
    return <>{children}</>;
  }

  return (
    <Tooltip
      content={content}
      placement={placementMap[side]}
      delay={delayDuration}
      offset={sideOffset}
      color={variantToColor[variant]}
      size={size}
      showArrow={showArrow}
      classNames={{
        base: className,
      }}
    >
      {children}
    </Tooltip>
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
