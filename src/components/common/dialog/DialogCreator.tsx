"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import type { DialogConfig } from "@/types/dialog";

interface DialogCreatorProps {
  isOpen: boolean;
  config: DialogConfig | null;
  onClose: () => void;
  isLoading?: boolean;
  buttonLoadingStates?: {
    cancel: boolean;
    middle: boolean;
    action: boolean;
  };
}

const sizeMap = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
};

const variantMap = {
  default: "bg-blue-600 hover:bg-blue-700 text-white",
  destructive: "bg-red-600 hover:bg-red-700 text-white",
  outline:
    "border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800",
};

/**
 * DialogCreator Component
 * Renders a shadcn dialog with flexible button configuration
 *
 * @example
 * ```tsx
 * const { isOpen, openDialog, closeDialog, config } = useDialog();
 *
 * return (
 *   <>
 *     <button onClick={() => openDialog({
 *       title: "Confirm",
 *       subtitle: "Are you sure?",
 *       cancelButton: { label: "Cancel" },
 *       actionButton: {
 *         label: "Confirm",
 *         onClick: () => handleConfirm()
 *       }
 *     })}>Open Dialog</button>
 *     <DialogCreator isOpen={isOpen} config={config} onClose={closeDialog} />
 *   </>
 * );
 * ```
 */
export function DialogCreator({
  isOpen,
  config,
  onClose,
  isLoading: externalLoading,
  buttonLoadingStates,
}: DialogCreatorProps) {
  const [internalLoading, setInternalLoading] = useState(false);

  // Use external loading state if provided, otherwise use internal state
  const isLoading =
    externalLoading !== undefined ? externalLoading : internalLoading;

  // Helper to get button loading state
  const getButtonLoading = (
    buttonType: "cancel" | "middle" | "action",
  ): boolean => {
    if (buttonType === "cancel") {
      return config?.cancelButton?.loading !== undefined
        ? config.cancelButton.loading
        : (buttonLoadingStates?.cancel ?? false);
    } else if (buttonType === "middle") {
      return config?.middleButton?.loading !== undefined
        ? config.middleButton.loading
        : (buttonLoadingStates?.middle ?? false);
    } else {
      return config?.actionButton?.loading !== undefined
        ? config.actionButton.loading
        : (buttonLoadingStates?.action ?? false);
    }
  };

  if (!config) return null;

  const handleButtonClick = async (onClick?: () => void | Promise<void>) => {
    if (!onClick) {
      onClose();
      return;
    }

    try {
      if (externalLoading === undefined) {
        setInternalLoading(true);
      }
      const result = onClick();
      if (result instanceof Promise) {
        await result;
      }
      onClose();
    } catch (error) {
      console.error("Dialog action error:", error);
    } finally {
      if (externalLoading === undefined) {
        setInternalLoading(false);
      }
    }
  };

  const handleCancel = async () => {
    if (config.cancelButton?.onClick) {
      await handleButtonClick(config.cancelButton.onClick);
    } else {
      onClose();
    }
  };

  const handleMiddle = async () => {
    if (config.middleButton?.onClick) {
      await handleButtonClick(config.middleButton.onClick);
    }
  };

  const handleAction = async () => {
    if (config.actionButton?.onClick) {
      await handleButtonClick(config.actionButton.onClick);
    } else {
      onClose();
    }
  };

  const size = config.size || "md";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={sizeMap[size as keyof typeof sizeMap]}>
        <DialogHeader>
          <DialogTitle>{config.title}</DialogTitle>
          {config.subtitle && (
            <DialogDescription>{config.subtitle}</DialogDescription>
          )}
        </DialogHeader>

        {config.form && <div className="py-4">{config.form}</div>}

        <DialogFooter className="flex gap-2 justify-end">
          {config.cancelButton && (
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={getButtonLoading("cancel")}
            >
              {config.cancelButton.label}
            </Button>
          )}

          {config.middleButton && (
            <Button
              variant={config.middleButton.variant || "outline"}
              onClick={handleMiddle}
              disabled={getButtonLoading("middle")}
              className="flex items-center gap-2"
            >
              {getButtonLoading("middle") && (
                <Loader2 className="w-4 h-4 animate-spin" />
              )}
              {config.middleButton.label}
            </Button>
          )}

          {config.actionButton && (
            <Button
              variant={config.actionButton.variant || "default"}
              onClick={handleAction}
              disabled={getButtonLoading("action")}
              className="flex items-center gap-2"
            >
              {getButtonLoading("action") && (
                <Loader2 className="w-4 h-4 animate-spin" />
              )}
              {config.actionButton.label}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
