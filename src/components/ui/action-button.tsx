"use client";

import Link from "next/link";
import type { ButtonConfig } from "@/types/shared/domain/button-config.type";
import { Button as RippleButton } from "@heroui/button";

type ActionButtonProps = {
  btn?: ButtonConfig;
};

const DEFAULT_BTN: Required<Pick<ButtonConfig, "text" | "variant" | "size">> = {
  text: "OK",
  variant: "default",
  size: "default",
};

export function ActionButton({ btn }: ActionButtonProps) {
  const b: ButtonConfig & typeof DEFAULT_BTN = {
    ...DEFAULT_BTN,
    ...(btn ?? {}),
  };

  const buttonEl = (
    <RippleButton
      type="button"
      onClick={b.onClick}
      variant={b.variant as any}
      size={b.size as any}
    >
      {b.text}
    </RippleButton>
  );

  // Link mode (only when no onClick)
  if (b.href && !b.onClick) {
    return <Link href={b.href}>{buttonEl}</Link>;
  }

  return buttonEl;
}
