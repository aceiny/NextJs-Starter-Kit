"use client";;
import { Card, Chip, cn } from "@heroui/react";
import { ArrowRightUp } from '@solar-icons/react-perf/Linear';
import { ArrowRight } from '@solar-icons/react-perf/Linear';
import { ArrowRightDown } from '@solar-icons/react-perf/Linear';
export type TrendCardProps = {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "neutral" | "negative";
  trendType?: "up" | "neutral" | "down";
  trendChipPosition?: "top" | "bottom";
  trendChipVariant?: "flat" | "light";
};

export default function TrendCard({
  title,
  value,
  change,
  changeType,
  trendType = "up",
  trendChipPosition = "bottom",
  trendChipVariant = "light",
}: TrendCardProps) {
  return (
    <Card className="dark:border-default-100 border border-transparent">
      <div className="flex p-4">
        <div className="flex flex-col gap-y-2">
          <dt className="text-small text-default-500 font-medium">{title}</dt>
          <dd className="text-default-700 text-2xl font-semibold">{value}</dd>
        </div>

        <Chip
          className={cn("absolute right-4", {
            "top-4": trendChipPosition === "top",
            "bottom-4": trendChipPosition === "bottom",
          })}
          classNames={{ content: "font-medium text-[0.65rem]" }}
          color={
            changeType === "positive" ? "success" : changeType === "neutral" ? "warning" : "danger"
          }
          radius="sm"
          size="sm"
          startContent={
            trendType === "up" ? (
              <ArrowRightUp size={12} />
            ) : trendType === "neutral" ? (
              <ArrowRight size={12} />
            ) : (
              <ArrowRightDown size={12} />
            )
          }
          variant={trendChipVariant}
        >
          {change}
        </Chip>
      </div>
    </Card>
  );
}
