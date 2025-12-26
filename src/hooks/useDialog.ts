"use client";

import { useState, useCallback } from "react";
import React from "react";
import { DialogCreator } from "@/components/DialogCreator";
import type { DialogConfig } from "@/types/dialog";

interface UseDialogReturn {
  dialog: React.ReactNode;
  isOpen: boolean;
  isLoading: boolean;
  openDialog: (overrideConfig?: Partial<DialogConfig>) => void;
  closeDialog: () => void;
  setLoading: (loading: boolean) => void;
}

export function useDialog(initialConfig?: DialogConfig): UseDialogReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dialogConfig, setDialogConfig] = useState<DialogConfig | null>(
    initialConfig || null,
  );
  const [buttonLoadingStates, setButtonLoadingStates] = useState({
    cancel: false,
    middle: false,
    action: false,
  });

  const openDialog = useCallback(
    (overrideConfig?: Partial<DialogConfig>) => {
      if (initialConfig) {
        // Merge initial config with overrides
        setDialogConfig({
          ...initialConfig,
          ...overrideConfig,
        });
      } else if (overrideConfig) {
        // Use override config if no initial config
        setDialogConfig(overrideConfig as DialogConfig);
      }
      setIsOpen(true);
    },
    [initialConfig],
  );

  const closeDialog = useCallback(() => {
    setIsOpen(false);
    // Reset config and loading after animation completes
    setTimeout(() => {
      setDialogConfig(initialConfig || null);
      setIsLoading(false);
      setButtonLoadingStates({ cancel: false, middle: false, action: false });
    }, 300);
  }, [initialConfig]);

  // Wrap button handlers to manage per-button loading state
  const wrapButtonHandler = (
    buttonType: "cancel" | "middle" | "action",
    handler?: () => void | Promise<void>,
  ) => {
    return async () => {
      if (!handler) return;

      // Use external loading state if provided, otherwise use internal state
      const hasExternalLoading =
        buttonType === "cancel"
          ? dialogConfig?.cancelButton?.loading !== undefined
          : buttonType === "middle"
            ? dialogConfig?.middleButton?.loading !== undefined
            : dialogConfig?.actionButton?.loading !== undefined;

      if (!hasExternalLoading) {
        setButtonLoadingStates((prev) => ({ ...prev, [buttonType]: true }));
      }

      try {
        const result = handler();
        if (result instanceof Promise) {
          await result;
        }
      } finally {
        if (!hasExternalLoading) {
          setButtonLoadingStates((prev) => ({ ...prev, [buttonType]: false }));
        }
      }
    };
  };

  // Create enriched config with wrapped handlers
  const enrichedConfig = dialogConfig
    ? {
        ...dialogConfig,
        cancelButton: dialogConfig.cancelButton
          ? {
              ...dialogConfig.cancelButton,
              onClick: () => closeDialog(),
            }
          : undefined,
        middleButton: dialogConfig.middleButton
          ? {
              ...dialogConfig.middleButton,
              onClick: wrapButtonHandler(
                "middle",
                dialogConfig.middleButton.onClick,
              ),
            }
          : undefined,
        actionButton: dialogConfig.actionButton
          ? {
              ...dialogConfig.actionButton,
              onClick: wrapButtonHandler(
                "action",
                dialogConfig.actionButton.onClick,
              ),
            }
          : undefined,
      }
    : null;

  // Dialog component that renders the DialogCreator with enriched config and button states
  const dialog = React.createElement(DialogCreator, {
    isOpen,
    config: enrichedConfig,
    onClose: closeDialog,
    isLoading,
    buttonLoadingStates,
  });

  return {
    dialog,
    isOpen,
    isLoading,
    openDialog,
    closeDialog,
    setLoading: setIsLoading,
  };
}
