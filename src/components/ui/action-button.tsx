import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { ButtonConfig } from "@/types/shared/domain/button-config.type";

type ActionButtonProps = {
  btn?: ButtonConfig;
};
const DEFAULT_BTN: Required<Pick<ButtonConfig, "text" | "variant" | "size">> = {
  text: "OK",
  variant: "default",
  size: "default",
};
/**
 * Button component that can function as a link or a 
 * button based on the provided configuration.
 * @param btn @type {ButtonConfig} - Button configuration 
 * @returns 
 */
export function ActionButton({ btn }: ActionButtonProps) {
  const b: ButtonConfig & typeof DEFAULT_BTN = {
    ...DEFAULT_BTN,
    ...(btn ?? {}),
  };

  const buttonEl = (
    <Button
      onClick={b.onClick}
      variant={b.variant as any}
      size={b.size as any}
    >
      {b.text}
    </Button>
  );

  // Link mode (only when no onClick)
  if (b.href && !b.onClick) {
    return <Link href={b.href}>{buttonEl}</Link>;
  }

  // Button mode (or both provided -> prioritize onClick)
  return buttonEl;
}
