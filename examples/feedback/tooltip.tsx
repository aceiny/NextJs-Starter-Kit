"use client";

import { Button } from "@/components/ui/button";
import {
  CustomTooltip,
  InfoTooltip,
  SuccessTooltip,
  WarningTooltip,
  ErrorTooltip,
} from "@/components/shared/CustomTooltip";
import {
  Info,
  CheckCircle,
  AlertTriangle,
  XCircle,
  HelpCircle,
  Settings,
  Copy,
  Trash2,
} from "lucide-react";

export function TooltipExamples() {
  return (
    <div className="space-y-12">
      {/* Basic Tooltips */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
          Basic Tooltips
        </h3>
        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          Simple tooltips with different positions
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <CustomTooltip content="Tooltip on top" side="top">
            <Button variant="outline">Top</Button>
          </CustomTooltip>

          <CustomTooltip content="Tooltip on right" side="right">
            <Button variant="outline">Right</Button>
          </CustomTooltip>

          <CustomTooltip content="Tooltip on bottom" side="bottom">
            <Button variant="outline">Bottom</Button>
          </CustomTooltip>

          <CustomTooltip content="Tooltip on left" side="left">
            <Button variant="outline">Left</Button>
          </CustomTooltip>
        </div>
      </div>

      {/* Tooltip Variants */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
          Tooltip Variants
        </h3>
        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          Color-coded tooltips for different contexts
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <CustomTooltip content="Default tooltip style" variant="default">
            <Button variant="outline">Default</Button>
          </CustomTooltip>

          <InfoTooltip content="This is informational">
            <Button variant="outline" className="text-blue-600">
              <Info className="mr-2 h-4 w-4" />
              Info
            </Button>
          </InfoTooltip>

          <SuccessTooltip content="Action completed successfully!">
            <Button variant="outline" className="text-green-600">
              <CheckCircle className="mr-2 h-4 w-4" />
              Success
            </Button>
          </SuccessTooltip>

          <WarningTooltip content="Please proceed with caution">
            <Button variant="outline" className="text-amber-600">
              <AlertTriangle className="mr-2 h-4 w-4" />
              Warning
            </Button>
          </WarningTooltip>

          <ErrorTooltip content="An error occurred">
            <Button variant="outline" className="text-red-600">
              <XCircle className="mr-2 h-4 w-4" />
              Error
            </Button>
          </ErrorTooltip>
        </div>
      </div>

      {/* Tooltip Sizes */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
          Tooltip Sizes
        </h3>
        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          Different sizes for various use cases
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <CustomTooltip content="Small tooltip" size="sm">
            <Button variant="outline" size="sm">
              Small
            </Button>
          </CustomTooltip>

          <CustomTooltip content="Medium tooltip (default)" size="md">
            <Button variant="outline">Medium</Button>
          </CustomTooltip>

          <CustomTooltip content="Large tooltip" size="lg">
            <Button variant="outline" size="lg">
              Large
            </Button>
          </CustomTooltip>
        </div>
      </div>

      {/* Long Content */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
          Long Content & Max Width
        </h3>
        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          Tooltips with longer content are automatically wrapped
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <CustomTooltip
            content="This is a longer tooltip message that demonstrates how the content wraps when it exceeds the maximum width."
            maxWidth={200}
          >
            <Button variant="outline">Max 200px</Button>
          </CustomTooltip>

          <CustomTooltip
            content="This tooltip has a wider maximum width, allowing more content to be displayed on a single line before wrapping."
            maxWidth={400}
          >
            <Button variant="outline">Max 400px</Button>
          </CustomTooltip>
        </div>
      </div>

      {/* Delay Duration */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
          Delay Duration
        </h3>
        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          Control how long before the tooltip appears
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <CustomTooltip content="Instant (0ms)" delayDuration={0}>
            <Button variant="outline">Instant</Button>
          </CustomTooltip>

          <CustomTooltip content="Fast (200ms)" delayDuration={200}>
            <Button variant="outline">Fast</Button>
          </CustomTooltip>

          <CustomTooltip content="Normal (500ms)" delayDuration={500}>
            <Button variant="outline">Normal</Button>
          </CustomTooltip>

          <CustomTooltip content="Slow (1000ms)" delayDuration={1000}>
            <Button variant="outline">Slow</Button>
          </CustomTooltip>
        </div>
      </div>

      {/* Without Arrow */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
          Arrow Options
        </h3>
        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          Show or hide the tooltip arrow
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <CustomTooltip content="With arrow (default)" showArrow={true}>
            <Button variant="outline">With Arrow</Button>
          </CustomTooltip>

          <CustomTooltip content="Without arrow" showArrow={false}>
            <Button variant="outline">No Arrow</Button>
          </CustomTooltip>
        </div>
      </div>

      {/* Icon Buttons */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
          Icon Button Tooltips
        </h3>
        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          Common use case: tooltips on icon-only buttons
        </p>
        <div className="flex items-center gap-2">
          <CustomTooltip content="Help">
            <Button variant="ghost" size="icon">
              <HelpCircle className="h-5 w-5" />
            </Button>
          </CustomTooltip>

          <CustomTooltip content="Settings">
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </CustomTooltip>

          <CustomTooltip content="Copy to clipboard">
            <Button variant="ghost" size="icon">
              <Copy className="h-5 w-5" />
            </Button>
          </CustomTooltip>

          <ErrorTooltip content="Delete item">
            <Button
              variant="ghost"
              size="icon"
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          </ErrorTooltip>
        </div>
      </div>

      {/* Rich Content */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
          Rich Content
        </h3>
        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          Tooltips can contain any React content
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <CustomTooltip
            content={
              <div className="space-y-1">
                <p className="font-semibold">Keyboard Shortcuts</p>
                <p className="text-xs opacity-80">⌘ + C to copy</p>
                <p className="text-xs opacity-80">⌘ + V to paste</p>
              </div>
            }
            maxWidth={200}
          >
            <Button variant="outline">
              <HelpCircle className="mr-2 h-4 w-4" />
              Shortcuts
            </Button>
          </CustomTooltip>

          <InfoTooltip
            content={
              <div className="flex items-center gap-2">
                <Info className="h-4 w-4" />
                <span>This feature is in beta</span>
              </div>
            }
          >
            <Button variant="outline">With Icon</Button>
          </InfoTooltip>
        </div>
      </div>

      {/* Alignment */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
          Alignment
        </h3>
        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          Control the alignment of the tooltip
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <CustomTooltip content="Aligned to start" side="bottom" align="start">
            <Button variant="outline">Align Start</Button>
          </CustomTooltip>

          <CustomTooltip
            content="Aligned to center"
            side="bottom"
            align="center"
          >
            <Button variant="outline">Align Center</Button>
          </CustomTooltip>

          <CustomTooltip content="Aligned to end" side="bottom" align="end">
            <Button variant="outline">Align End</Button>
          </CustomTooltip>
        </div>
      </div>
    </div>
  );
}

export default TooltipExamples;
