"use client";

import { useState } from "react";
import { DialogCreator } from "@/components/shared/DialogCreator";
import { Button } from "@/components/ui/button";
import type { DialogConfig } from "@/types/dialog";

/**
 * Standalone DialogCreator Examples
 *
 * These examples show how to use DialogCreator directly without the useDialog hook.
 * This is useful for:
 * - Simple, one-off dialogs
 * - Custom state management
 * - Integrating with other state management libraries (Redux, Zustand, etc.)
 * - Maximum flexibility and control
 */

export default function StandaloneDialogExamples() {
  // ============================================================
  // EXAMPLE 1: Simple Confirmation Dialog
  // ============================================================
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const confirmConfig: DialogConfig = {
    title: "Confirm Delete",
    subtitle: "Are you sure you want to delete this item?",
    size: "sm",
    cancelButton: {
      label: "Cancel",
    },
    actionButton: {
      label: "Delete",
      variant: "destructive",
      onClick: async () => {
        console.log("Item deleted");
        setIsConfirmOpen(false);
      },
    },
  };

  // ============================================================
  // EXAMPLE 2: Form Dialog with Multiple Actions
  // ============================================================
  const [isFormOpen, setIsFormOpen] = useState(false);

  const formConfig: DialogConfig = {
    title: "Edit User Profile",
    subtitle: "Update your personal information",
    size: "lg",
    form: (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Bio</label>
          <textarea
            placeholder="Tell us about yourself"
            className="w-full px-3 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 resize-none"
            rows={3}
          />
        </div>
      </div>
    ),
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
        setIsFormOpen(false);
      },
    },
  };

  // ============================================================
  // EXAMPLE 3: Dialog with External Loading State Control
  // ============================================================
  const [isLoadingOpen, setIsLoadingOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const loadingConfig: DialogConfig = {
    title: "Processing Payment",
    subtitle: "Please wait while we process your payment",
    size: "md",
    form: (
      <div className="p-4 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          Your transaction is being processed. This may take a few seconds.
        </p>
      </div>
    ),
    actionButton: {
      label: "Complete Payment",
      loading: isProcessing,
      onClick: async () => {
        setIsProcessing(true);
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 2000));
          console.log("Payment processed");
          setIsLoadingOpen(false);
        } finally {
          setIsProcessing(false);
        }
      },
    },
  };

  // ============================================================
  // EXAMPLE 4: Alert Dialog
  // ============================================================
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const alertConfig: DialogConfig = {
    title: "System Alert",
    subtitle: "Important notification",
    size: "sm",
    form: (
      <div className="p-2 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-md">
        <p className="text-sm text-yellow-800 dark:text-yellow-200">
          Your session will expire in 5 minutes due to inactivity.
        </p>
      </div>
    ),
    actionButton: {
      label: "Got it",
      variant: "default",
      onClick: async () => {
        console.log("Alert dismissed");
        setIsAlertOpen(false);
      },
    },
  };

  // ============================================================
  // EXAMPLE 5: Complex Dialog with Multiple States
  // ============================================================
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const checkoutConfig: DialogConfig = {
    title: "Checkout",
    subtitle: "Review and confirm your order",
    size: "lg",
    form: (
      <div className="space-y-4">
        <div className="border-b pb-3">
          <div className="flex justify-between mb-2">
            <span>Product Subtotal</span>
            <span>$99.99</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Shipping</span>
            <span>$10.00</span>
          </div>
          <div className="border-t pt-2 font-semibold flex justify-between">
            <span>Total</span>
            <span>$109.99</span>
          </div>
        </div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
            className="w-4 h-4"
          />
          <span className="text-sm">I agree to the terms and conditions</span>
        </label>
      </div>
    ),
    cancelButton: {
      label: "Cancel Order",
    },
    actionButton: {
      label: "Complete Purchase",
      variant: "default",
      loading: checkoutLoading,
      onClick: async () => {
        if (!agreeTerms) {
          alert("Please agree to the terms and conditions");
          return;
        }
        setCheckoutLoading(true);
        try {
          // Simulate payment API call
          await new Promise((resolve) => setTimeout(resolve, 1500));
          console.log("Order completed");
          setIsCheckoutOpen(false);
        } finally {
          setCheckoutLoading(false);
        }
      },
    },
  };

  return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">
          Standalone DialogCreator Examples
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Using DialogCreator directly without the useDialog hook
        </p>
      </div>

      {/* ============================================================ */}
      {/* EXAMPLE 1: Simple Confirmation */}
      {/* ============================================================ */}
      <div className="border rounded-lg p-6 space-y-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">
            Example 1: Simple Confirmation
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Minimal dialog with just cancel and action buttons
          </p>
        </div>
        <Button onClick={() => setIsConfirmOpen(true)} variant="outline">
          Open Confirmation Dialog
        </Button>
      </div>

      {/* ============================================================ */}
      {/* EXAMPLE 2: Form with Multiple Actions */}
      {/* ============================================================ */}
      <div className="border rounded-lg p-6 space-y-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Example 2: Form Dialog</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Dialog with form and multiple action buttons (Cancel, Save Draft,
            Save Changes)
          </p>
        </div>
        <Button onClick={() => setIsFormOpen(true)} variant="outline">
          Open Form Dialog
        </Button>
      </div>

      {/* ============================================================ */}
      {/* EXAMPLE 3: Loading State Control */}
      {/* ============================================================ */}
      <div className="border rounded-lg p-6 space-y-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">
            Example 3: External Loading Control
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Button loading state controlled by parent component state
            (isProcessing)
          </p>
        </div>
        <Button onClick={() => setIsLoadingOpen(true)} variant="outline">
          Open Loading Dialog
        </Button>
      </div>

      {/* ============================================================ */}
      {/* EXAMPLE 4: Alert Dialog */}
      {/* ============================================================ */}
      <div className="border rounded-lg p-6 space-y-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">
            Example 4: Alert/Notification
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Simple alert dialog with acknowledgement button
          </p>
        </div>
        <Button onClick={() => setIsAlertOpen(true)} variant="outline">
          Open Alert Dialog
        </Button>
      </div>

      {/* ============================================================ */}
      {/* EXAMPLE 5: Complex Checkout */}
      {/* ============================================================ */}
      <div className="border rounded-lg p-6 space-y-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">
            Example 5: Complex Checkout Flow
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Dialog with form, external loading state, and conditional logic
          </p>
        </div>
        <Button onClick={() => setIsCheckoutOpen(true)} variant="outline">
          Open Checkout Dialog
        </Button>
      </div>

      {/* ============================================================ */}
      {/* CODE EXAMPLE SECTION */}
      {/* ============================================================ */}
      <div className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-bold">Basic Usage Pattern</h2>
        <div className="p-4 bg-gray-100 dark:bg-gray-900 rounded-lg">
          <pre className="text-xs overflow-x-auto text-gray-900 dark:text-gray-100">
            {`import { useState } from "react";
import { DialogCreator } from "@/components/DialogCreator";
import type { DialogConfig } from "@/types/dialog";

export default function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  const dialogConfig: DialogConfig = {
    title: "Delete Item",
    subtitle: "Are you sure?",
    cancelButton: { label: "Cancel" },
    actionButton: {
      label: "Delete",
      variant: "destructive",
      onClick: async () => {
        await deleteItem();
        setIsOpen(false);
      }
    }
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Delete
      </button>
      <DialogCreator
        isOpen={isOpen}
        config={dialogConfig}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}`}
          </pre>
        </div>
      </div>

      {/* ============================================================ */}
      {/* DIALOG RENDERERS */}
      {/* ============================================================ */}

      {/* Example 1: Confirmation Dialog */}
      <DialogCreator
        isOpen={isConfirmOpen}
        config={confirmConfig}
        onClose={() => setIsConfirmOpen(false)}
      />

      {/* Example 2: Form Dialog */}
      <DialogCreator
        isOpen={isFormOpen}
        config={formConfig}
        onClose={() => setIsFormOpen(false)}
      />

      {/* Example 3: Loading Dialog */}
      <DialogCreator
        isOpen={isLoadingOpen}
        config={loadingConfig}
        onClose={() => setIsLoadingOpen(false)}
      />

      {/* Example 4: Alert Dialog */}
      <DialogCreator
        isOpen={isAlertOpen}
        config={alertConfig}
        onClose={() => setIsAlertOpen(false)}
      />

      {/* Example 5: Checkout Dialog */}
      <DialogCreator
        isOpen={isCheckoutOpen}
        config={checkoutConfig}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </div>
  );
}
