"use client";
import {
  Button,
  Card,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Progress,
  cn,
} from "@heroui/react";
import { MenuDots } from "@solar-icons/react-perf/Bold";
import { ServerSquare, SdCard } from "@solar-icons/react-perf/Linear";
import React from "react";
export type StatusCardProps = {
  title: string;
  value: number;
  status: "good" | "warn" | "danger";
  icon?: React.ReactNode;
  onViewDetails?: () => void;
  onExport?: () => void;
};

export default function StatusCard({
  title,
  value,
  status,
  icon,
  onViewDetails,
  onExport,
}: StatusCardProps) {
  return (
    <Card className="dark:border-default-100 flex flex-col border border-transparent p-4">
      <div
        className={cn(
          "flex h-8 mb-2 w-8 items-center justify-center rounded-md border p-0.5",
          {
            "border-success-200 bg-success-50 dark:border-success-100":
              status === "good",
            "border-warning-200 bg-warning-50 dark:border-warning-100":
              status === "warn",
            "border-danger-200 bg-danger-50 dark:border-danger-100":
              status === "danger",
          },
        )}
      >
        {icon ? (
          icon
        ) : status === "good" ? (
          <ServerSquare className="text-success-500" size={20} />
        ) : status === "warn" ? (
          <SdCard className="text-warning-500" size={20} />
        ) : (
          <ServerSquare className="text-danger-500" size={20} />
        )}
      </div>

      <div className="pt-1 flex flex-col items-start ">
        <dt className="text-default-500 my-2 text-sm font-medium">{title}</dt>
        <dd className="text-default-700 text-2xl font-semibold">{value}%</dd>
      </div>

      <Progress
        aria-label="status"
        className="mt-2"
        color={
          status === "good"
            ? "success"
            : status === "warn"
              ? "warning"
              : "danger"
        }
        value={value}
      />

      <Dropdown
        classNames={{ content: "min-w-[120px]" }}
        placement="bottom-end"
      >
        <DropdownTrigger>
          <Button
            isIconOnly
            className="absolute top-2 right-2 w-auto rounded-full"
            size="sm"
            variant="light"
          >
            <MenuDots size={16} />
          </Button>
        </DropdownTrigger>
        <DropdownMenu itemClasses={{ title: "text-tiny" }} variant="flat">
          <DropdownItem key="view-details" onClick={onViewDetails}>
            View Details
          </DropdownItem>
          <DropdownItem key="export-data" onClick={onExport}>
            Export Data
          </DropdownItem>
          <DropdownItem key="set-alert">Set Alert</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </Card>
  );
}
