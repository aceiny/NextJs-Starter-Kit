"use client";
import { Card, Chip, cn, Button } from "@heroui/react";
import { ArrowRightUp } from "@solar-icons/react-perf/Linear";
import { ArrowRight } from "@solar-icons/react-perf/Linear";
import { ArrowRightDown } from "@solar-icons/react-perf/Linear";
import React from "react";
export type MetricCardProps = {
  title: string;
  value: string;
  change?: string;
  changeType?: "positive" | "neutral" | "negative";
  icon?: React.ReactNode;
  trendChipPosition?: "top" | "bottom";
  onActionClick?: () => void;
  actionLabel?: string;
};

export default function MetricCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon,
  trendChipPosition = "top",
  onActionClick,
  actionLabel = "View All",
}: MetricCardProps) {
  return (
    <Card className="dark:border-default-100 border border-transparent">
      <div className="flex items-start gap-4 p-4">
        <div
          className={cn(
            "mt-1 flex h-8 w-8 items-center justify-center rounded-md",
            {
              "bg-success-50": changeType === "positive",
              "bg-warning-50": changeType === "neutral",
              "bg-danger-50": changeType === "negative",
            },
          )}
        >
          {icon &&
            (React.isValidElement(icon)
              ? React.cloneElement(
                  icon as React.ReactElement<any>,
                  {
                    className: cn(
                      (icon as any)?.props?.className ?? undefined,
                      {
                        "text-success": changeType === "positive",
                        "text-warning": changeType === "neutral",
                        "text-danger": changeType === "negative",
                      },
                    ),
                    width: (icon as any)?.props?.width ?? 20,
                    height: (icon as any)?.props?.height ?? 20,
                  } as any,
                )
              : icon)}
        </div>

        <div className="flex flex-col gap-y-2 ">
          <dt className="text-small text-default-500 font-medium">{title}</dt>
          <dd className="text-default-700 text-2xl font-semibold">{value}</dd>
        </div>

        {change && (
          <Chip
            className={cn("absolute right-4", {
              "top-4": trendChipPosition === "top",
              "bottom-4": trendChipPosition === "bottom",
            })}
            classNames={{ content: "font-semibold text-[0.65rem]" }}
            color={
              changeType === "positive"
                ? "success"
                : changeType === "neutral"
                  ? "warning"
                  : "danger"
            }
            radius="sm"
            size="sm"
            startContent={
              changeType === "positive" ? (
                <ArrowRightUp size={12} />
              ) : changeType === "neutral" ? (
                <ArrowRight size={12} />
              ) : (
                <ArrowRightDown size={12} />
              )
            }
            variant="flat"
          >
            {change}
          </Chip>
        )}
      </div>

      <div className="bg-default-100 rounded-b-md overflow-hidden">
        <Button
          fullWidth
          className="text-default-500 flex justify-start text-xs data-pressed:scale-100"
          radius="none"
          variant="light"
          onClick={onActionClick}
        >
          {actionLabel}
        </Button>
      </div>
    </Card>
  );
}
