"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "default" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

type RippleButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  rippleClassName?: string; // override if you want
  durationMs?: number;
};

export function RippleButton({
  className,
  children,
  onClick,
  variant = "ghost",
  size = "md",
  rippleClassName,
  durationMs = 600,
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

    // strong coverage (a bit larger than the button)
    const sizePx = Math.max(rect.width, rect.height) * 2.8;

    const id = crypto.randomUUID();
    setRipples((prev) => [...prev, { id, x, y, size: sizePx }]);

    window.setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, durationMs);
  };

  const base =
    "relative overflow-hidden select-none rounded-lg shadow-sm transition-all " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400/40 " +
    "active:scale-[0.98]";

  const sizes: Record<Size, string> = {
    sm: "px-2.5 py-1.5 text-xs",
    md: "px-3 py-2 text-sm",
    lg: "px-4 py-2.5 text-sm",
  };

  const variants: Record<Variant, string> = {
    default:
      // good defaults for both themes
      "bg-neutral-900 text-white hover:bg-neutral-800 " +
      "dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200",
    outline:
      "border border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-50 " +
      "dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100 dark:hover:bg-neutral-900",
    ghost:
      "bg-transparent text-neutral-900 hover:bg-neutral-100/70 " +
      "dark:text-neutral-100 dark:hover:bg-white/10",
  };

  const disabledCls =
    "disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none disabled:active:scale-100";

  // Auto ripple for theme:
  // - on dark surface: white ripple
  // - on light surface: black ripple
  const defaultRippleByVariant: Record<Variant, string> = {
    default: "bg-white/35 dark:bg-black/15",
    outline: "bg-black/15 dark:bg-white/20",
    ghost: "bg-black/12 dark:bg-white/18",
  };

  return (
    <button
      type={type}
      {...props}
      disabled={disabled}
      onClick={(e) => {
        createRipple(e);
        onClick?.(e);
      }}
      className={cn(
        base,
        sizes[size],
        variants[variant],
        disabledCls,
        className,
      )}
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
