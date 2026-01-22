"use client";

import { useState } from "react";
import { useDialog } from "@/hooks/use-dialog";
import { DialogCreator } from "@/components/shared/DialogCreator";
import { Button } from "@/components/ui/button";
import type { DialogConfig } from "@/types/dialog";

/**
 * Dialog Examples with useDialog Hook
 * Demonstrates various use cases for:
 * - useDialog Hook (Recommended when you need automatic state management)
 * - DialogCreator Component (For direct usage without hooks)
 * - Per-button loading states (Internal and External)
 * - Advanced configurations and customizations
 *
 * NOTE: For standalone DialogCreator examples (without any hook),
 * see examples/dialog/standalone.tsx
 */
export default function DialogExamples() {
  // ============================================================
  // HOOK-BASED EXAMPLES (Recommended)
  // ============================================================

  // Example 1: Simple confirmation dialog
  const confirmDialog = useDialog({
    title: "Confirm Action",
    subtitle: "Are you sure you want to proceed?",
    size: "sm",
    cancelButton: {
      label: "Cancel",
    },
    actionButton: {
      label: "Confirm",
      variant: "default",
      onClick: async () => {
        console.log("Action confirmed");
      },
    },
  });

  // Example 2: Delete dialog
  const deleteUserDialog = useDialog({
    title: "Delete User",
    subtitle:
      "Are you sure you want to delete this user? This action cannot be undone.",
    size: "md",
    cancelButton: {
      label: "Cancel",
    },
    actionButton: {
      label: "Delete User",
      variant: "destructive",
      onClick: async () => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("User deleted");
      },
    },
  });

  // Example 3: Edit dialog with form
  const editProfileDialog = useDialog({
    title: "Edit Profile",
    subtitle: "Update your profile information",
    form: (
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Name</label>
          <input
            type="text"
            placeholder="Enter name"
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            placeholder="Enter email"
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
      </div>
    ),
    size: "md",
    cancelButton: {
      label: "Cancel",
    },
    middleButton: {
      label: "Save Draft",
      variant: "secondary",
      onClick: async () => {
        console.log("Draft saved");
      },
    },
    actionButton: {
      label: "Save Changes",
      variant: "default",
      onClick: async () => {
        console.log("Changes saved");
      },
    },
  });

  // Example 4: Multi-action dialog
  const multiActionDialog = useDialog({
    title: "Choose Action",
    subtitle: "What would you like to do?",
    size: "sm",
    cancelButton: {
      label: "Cancel",
    },
    middleButton: {
      label: "Save as Draft",
      variant: "outline",
      onClick: async () => {
        console.log("Saved as draft");
      },
    },
    actionButton: {
      label: "Publish",
      variant: "default",
      onClick: async () => {
        console.log("Published");
      },
    },
  });

  // Example 5: Dialog with Per-Button Loading States (Mixed)
  const [submitLoading, setSubmitLoading] = useState(false);

  const settingsDialog = useDialog({
    title: "User Settings",
    subtitle: "Configure your preferences",
    size: "lg",
    cancelButton: {
      label: "Cancel",
    },
    middleButton: {
      label: "Reset to Defaults",
      variant: "outline",
      // Internal loading - auto-managed
      onClick: async () => {
        await new Promise((resolve) => setTimeout(resolve, 800));
        console.log("Settings reset");
      },
    },
    actionButton: {
      label: "Save Settings",
      variant: "default",
      loading: submitLoading, // External loading state
      onClick: async () => {
        setSubmitLoading(true);
        try {
          await new Promise((resolve) => setTimeout(resolve, 1200));
          console.log("Settings saved");
        } finally {
          setSubmitLoading(false);
        }
      },
    },
  });

  // ============================================================
  // DIRECT COMPONENT USAGE EXAMPLES (No Hook)
  // ============================================================

  const [isSimpleDialogOpen, setIsSimpleDialogOpen] = useState(false);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [isLoadingDialogOpen, setIsLoadingDialogOpen] = useState(false);
  const [directLoadingState, setDirectLoadingState] = useState(false);

  // Simple dialog config for direct component usage
  const simpleDialogConfig: DialogConfig = {
    title: "Simple Dialog",
    subtitle: "Using DialogCreator directly without hook",
    size: "sm",
    cancelButton: {
      label: "Cancel",
    },
    actionButton: {
      label: "Proceed",
      onClick: async () => {
        await new Promise((resolve) => setTimeout(resolve, 600));
        setIsSimpleDialogOpen(false);
        console.log("Simple dialog action completed");
      },
    },
  };

  // Form dialog config for direct component usage
  const formDialogConfig: DialogConfig = {
    title: "Edit Information",
    subtitle: "Direct component usage with form",
    form: (
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
          />
        </div>
      </div>
    ),
    size: "lg",
    cancelButton: {
      label: "Cancel",
    },
    actionButton: {
      label: "Save",
      onClick: async () => {
        await new Promise((resolve) => setTimeout(resolve, 800));
        setIsFormDialogOpen(false);
        console.log("Form saved");
      },
    },
  };

  // Dialog with external loading control (direct component)
  const loadingDialogConfig: DialogConfig = {
    title: "Processing",
    subtitle: "Dialog with external loading state control",
    size: "md",
    cancelButton: {
      label: "Cancel",
    },
    actionButton: {
      label: "Process",
      variant: "default",
      loading: directLoadingState, // External state control
      onClick: async () => {
        setDirectLoadingState(true);
        try {
          await new Promise((resolve) => setTimeout(resolve, 1500));
          console.log("Processing complete");
          setIsLoadingDialogOpen(false);
        } finally {
          setDirectLoadingState(false);
        }
      },
    },
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Dialog Examples</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Complete examples using useDialog hook and DialogCreator component
          directly
        </p>
      </div>

      {/* ============================================================ */}
      {/* HOOK-BASED EXAMPLES SECTION */}
      {/* ============================================================ */}

      <div className="space-y-4">
        <h3 className="text-xl font-bold">Hook-Based Examples (Recommended)</h3>
        <p className="text-sm text-gray-500">
          Using useDialog hook for automatic state management
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <h4 className="font-semibold">Simple Confirmation</h4>
            <Button
              onClick={() =>
                confirmDialog.openDialog({
                  title: "Confirm Action Override",
                })
              }
              variant="outline"
              className="w-full"
            >
              Open Confirm Dialog
            </Button>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold">Delete Action (Destructive)</h4>
            <Button
              onClick={() => deleteUserDialog.openDialog()}
              variant="destructive"
              className="w-full"
            >
              Open Delete Dialog
            </Button>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold">Edit with Form</h4>
            <Button
              onClick={() => editProfileDialog.openDialog()}
              variant="outline"
              className="w-full"
            >
              Open Form Dialog
            </Button>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold">Multiple Actions</h4>
            <Button
              onClick={() => multiActionDialog.openDialog()}
              variant="outline"
              className="w-full"
            >
              Open Multi-Action Dialog
            </Button>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold">Per-Button Loading (Mixed)</h4>
            <p className="text-xs text-gray-500 mb-2">
              Middle button: auto-loading | Action button: external control
            </p>
            <Button
              onClick={() => settingsDialog.openDialog()}
              variant="outline"
              className="w-full"
            >
              Open Settings Dialog
            </Button>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* DIRECT COMPONENT USAGE SECTION */}
      {/* ============================================================ */}

      <div className="space-y-4 border-t pt-8">
        <h3 className="text-xl font-bold">
          Direct Component Usage (DialogCreator)
        </h3>
        <p className="text-sm text-gray-500">
          Using DialogCreator component directly without hook
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <h4 className="font-semibold">Simple Dialog</h4>
            <p className="text-xs text-gray-500 mb-2">
              Lightweight, direct state management
            </p>
            <Button
              onClick={() => setIsSimpleDialogOpen(true)}
              variant="outline"
              className="w-full"
            >
              Open Simple Dialog
            </Button>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold">Form Dialog</h4>
            <p className="text-xs text-gray-500 mb-2">
              Direct component with form content
            </p>
            <Button
              onClick={() => setIsFormDialogOpen(true)}
              variant="outline"
              className="w-full"
            >
              Open Form Dialog
            </Button>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold">External Loading Control</h4>
            <p className="text-xs text-gray-500 mb-2">
              Manage loading state from parent
            </p>
            <Button
              onClick={() => setIsLoadingDialogOpen(true)}
              variant="outline"
              className="w-full"
              disabled={directLoadingState}
            >
              Open Loading Dialog
            </Button>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* CODE EXAMPLES */}
      {/* ============================================================ */}

      <div className="space-y-4 border-t pt-8">
        <h3 className="text-xl font-bold">Code Examples</h3>

        <div className="space-y-4">
          <div className="p-4 bg-gray-100 dark:bg-gray-900 rounded-lg">
            <h4 className="font-semibold mb-2">
              Hook-Based Pattern (Recommended)
            </h4>
            <pre className="text-xs overflow-x-auto bg-white dark:bg-gray-800 p-3 rounded max-h-64">
              {`const dialog = useDialog({
  title: "Delete User",
  subtitle: "Are you sure?",
  size: "md",
  cancelButton: { label: "Cancel" },
  actionButton: {
    label: "Delete",
    variant: "destructive",
    onClick: async () => await deleteUser()
  }
});

// Usage
<button onClick={dialog.openDialog}>Delete</button>
{dialog.dialog}`}
            </pre>
          </div>

          <div className="p-4 bg-gray-100 dark:bg-gray-900 rounded-lg">
            <h4 className="font-semibold mb-2">Direct Component Pattern</h4>
            <pre className="text-xs overflow-x-auto bg-white dark:bg-gray-800 p-3 rounded max-h-64">
              {`const [isOpen, setIsOpen] = useState(false);

const config: DialogConfig = {
  title: "Delete User",
  size: "md",
  cancelButton: { label: "Cancel" },
  actionButton: {
    label: "Delete",
    onClick: async () => {
      await deleteUser();
      setIsOpen(false);
    }
  }
};

// Usage
<button onClick={() => setIsOpen(true)}>Delete</button>
<DialogCreator 
  isOpen={isOpen} 
  config={config} 
  onClose={() => setIsOpen(false)} 
/>`}
            </pre>
          </div>

          <div className="p-4 bg-gray-100 dark:bg-gray-900 rounded-lg">
            <h4 className="font-semibold mb-2">Per-Button Loading States</h4>
            <pre className="text-xs overflow-x-auto bg-white dark:bg-gray-800 p-3 rounded max-h-64">
              {`const [submitLoading, setSubmitLoading] = useState(false);

const dialog = useDialog({
  actionButton: {
    label: "Save",
    loading: submitLoading,  // External state
    onClick: async () => {
      setSubmitLoading(true);
      try {
        await save();
      } finally {
        setSubmitLoading(false);
      }
    }
  },
  middleButton: {
    label: "Draft",
    // No loading param = internal auto-loading
    onClick: async () => await saveDraft()
  }
});`}
            </pre>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* HOOK-BASED DIALOGS - RENDERING */}
      {/* ============================================================ */}

      {/* Hook-based dialogs */}
      {confirmDialog.dialog}
      {deleteUserDialog.dialog}
      {editProfileDialog.dialog}
      {multiActionDialog.dialog}
      {settingsDialog.dialog}

      {/* ============================================================ */}
      {/* DIRECT COMPONENT DIALOGS - RENDERING */}
      {/* ============================================================ */}

      {/* Direct component usage dialogs */}
      <DialogCreator
        isOpen={isSimpleDialogOpen}
        config={simpleDialogConfig}
        onClose={() => setIsSimpleDialogOpen(false)}
      />

      <DialogCreator
        isOpen={isFormDialogOpen}
        config={formDialogConfig}
        onClose={() => setIsFormDialogOpen(false)}
      />

      <DialogCreator
        isOpen={isLoadingDialogOpen}
        config={loadingDialogConfig}
        onClose={() => setIsLoadingDialogOpen(false)}
        buttonLoadingStates={{
          cancel: false,
          middle: false,
          action: directLoadingState,
        }}
      />
    </div>
  );
}
