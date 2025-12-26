/**
 * Dialog System Types
 * Shared types used by both useDialog hook and DialogCreator component
 * These types are intentionally separated from implementation to ensure
 * DialogCreator can be used independently
 */

export interface DialogButton {
  label: string;
  onClick?: () => void | Promise<void>;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost";
  loading?: boolean;
}

export interface DialogConfig {
  title: string;
  subtitle?: string;
  form?: React.ReactNode;
  cancelButton?: DialogButton & { label: string };
  middleButton?: DialogButton & { label: string };
  actionButton?: DialogButton & { label: string };
  onClose?: () => void;
  size?: "sm" | "md" | "lg" | "xl";
}
