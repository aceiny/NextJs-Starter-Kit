"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "default" | "outline" | "ghost";
type Size = "sm" | "default" | "lg" | "icon";

type RippleButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  rippleClassName?: string;
  durationMs?: number;
};

export function RippleButton({
  className,
  children,
  onClick,
  variant = "ghost",
  size = "default",
  rippleClassName,
  durationMs = 2000,
  disabled,
  type = "button",
  ...props
}: RippleButtonProps) {
  const [ripples, setRipples] = React.useState<
    { id: string; x: number; y: number; size: number }[]
  >([]);

  const createRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const sizePx = Math.max(rect.width, rect.height) * 2.8;

    const id = crypto.randomUUID();
    setRipples((prev) => [...prev, { id, x, y, size: sizePx }]);

    window.setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, durationMs);
  };

  const base =
    "relative overflow-hidden select-none rounded-md font-medium transition-all " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 " +
    "dark:focus-visible:ring-neutral-300 " +
    "disabled:pointer-events-none disabled:opacity-50 " +
    "active:scale-[0.98]";

  // Match shadcn/ui button sizes exactly
  const sizes: Record<Size, string> = {
    sm: "h-9 px-3 text-xs",
    default: "h-10 px-4 py-2 text-sm",
    lg: "h-11 px-8 text-base",
    icon: "h-10 w-10",
  };

  const variants: Record<Variant, string> = {
    default:
      "bg-neutral-900 text-neutral-50 hover:bg-neutral-900/90 " +
      "dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/90",
    outline:
      "border border-neutral-200 bg-white hover:bg-neutral-100 hover:text-neutral-900 " +
      "dark:border-neutral-800 dark:bg-neutral-950 dark:hover:bg-neutral-800 dark:hover:text-neutral-50",
    ghost:
      "hover:bg-neutral-100 hover:text-neutral-900 " +
      "dark:hover:bg-neutral-800 dark:hover:text-neutral-50",
  };

  // Auto ripple colors by variant
  const defaultRippleByVariant: Record<Variant, string> = {
    default: "bg-white/35 dark:bg-black/30",
    outline: "bg-black/15 dark:bg-white/40",
    ghost: "bg-black/12 dark:bg-white/40",
  };

  return (
    <button
      type={type}
      {...props}
      disabled={disabled}
      onMouseDown={(e) => {
        createRipple(e);
      }}
      onClick={(e) => {
        onClick?.(e);
      }}
      className={cn(base, sizes[size], variants[variant], className)}
    >
      {children}

      {/* RIPPLE LAYER */}
      <span className="pointer-events-none absolute inset-0">
        {ripples.map((r) => (
          <span
            key={r.id}
            className={cn(
              "absolute rounded-full",
              "motion-reduce:hidden",
              "animate-[ripple_var(--ripple-duration)_cubic-bezier(0.2,0,0,1)]",
              rippleClassName ?? defaultRippleByVariant[variant],
            )}
            style={{
              left: r.x,
              top: r.y,
              width: r.size,
              height: r.size,
              transform: "translate(-50%, -50%) scale(0)",
              ["--ripple-duration" as any]: `${durationMs}ms`,
            }}
          />
        ))}
      </span>
    </button>
  );
}
