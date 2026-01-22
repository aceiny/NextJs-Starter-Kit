export type ButtonConfig = {
  text?: string;
  href?: string;
  onClick?: () => void;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "solid"
    | "faded"
    | "bordered"
    | "light"
    | "flat"
    | "ghost"
    | "shadow";
  size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg";
  ripple?: boolean;
};
