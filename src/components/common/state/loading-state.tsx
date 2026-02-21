"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Loader2, type LucideIcon } from "lucide-react";
import { Progress } from "@heroui/react";

export interface LoadingStateProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Custom icon component to display */
  icon?: LucideIcon;
  /** Main title text */
  title?: string;
  /** Description text below the title */
  description?: string;
  /** Optional action element (button, link, etc.) */
  action?: React.ReactNode;
  /** Size of the state */
  size?: "sm" | "md" | "lg";
  /** Whether to show a subtle spinner (inline with icon) */
  showSpinner?: boolean;
  /** Show a progress bar */
  showProgress?: boolean;
  /** Progress value (0-100) */
  progress?: number;
  /** Enable cursor follow / subtle motion effect (keeps consistent with other states) */
  enableCursorEffect?: boolean;
}

const sizeClasses = {
  sm: {
    container: "py-6",
    iconWrapper: "h-12 w-12",
    icon: "h-6 w-6",
    title: "text-sm",
    description: "text-xs",
  },
  md: {
    container: "py-10",
    iconWrapper: "h-16 w-16",
    icon: "h-8 w-8",
    title: "text-base",
    description: "text-sm",
  },
  lg: {
    container: "py-16",
    iconWrapper: "h-20 w-20",
    icon: "h-10 w-10",
    title: "text-lg",
    description: "text-base",
  },
};

export default function LoadingState({
  icon,
  title = "Loading",
  description = "Please wait while we load the data.",
  action,
  size = "md",
  showSpinner = true,
  showProgress = false,
  progress = 0,
  enableCursorEffect = true,
  className,
  ...props
}: LoadingStateProps) {
  const IconComponent = icon || Loader2;
  const sizes = sizeClasses[size];
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = React.useState(false);

  React.useEffect(() => {
    if (!enableCursorEffect) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      setMousePosition({ x, y });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      return () => container.removeEventListener("mousemove", handleMouseMove);
    }
  }, [enableCursorEffect]);

  const progressClamped = Math.max(0, Math.min(100, Number(progress || 0)));

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex flex-col items-center justify-center text-center overflow-hidden rounded-lg",
        enableCursorEffect && "transition-all duration-300",
        sizes.container,
        className,
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      {...props}
    >
      {/* Gradient background with cursor follow effect */}
      {enableCursorEffect && (
        <div
          className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(800px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(100, 116, 139, 0.06), transparent 50%)`,
            opacity: isHovering ? 1 : 0,
          }}
        />
      )}

      {/* Subtle border glow effect */}
      {enableCursorEffect && isHovering && (
        <div
          className="absolute inset-0 rounded-lg pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(148, 163, 184, 0.08), transparent 40%)`,
            opacity: 0.6,
          }}
        />
      )}

      {/* Animated icon wrapper */}
      <div
        className={cn(
          "relative mb-6 flex items-center justify-center rounded-full transition-all duration-500",
          "bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50",
          "shadow-lg shadow-gray-200/50 dark:shadow-gray-950/50",
          "ring-1 ring-gray-200/70 dark:ring-gray-700/50",
          "backdrop-blur-sm",
          isHovering && enableCursorEffect && "scale-105 shadow-xl",
          sizes.iconWrapper,
        )}
        style={
          enableCursorEffect && isHovering
            ? {
                transform: `perspective(1000px) rotateX(${(mousePosition.y - 50) / 10}deg) rotateY(${(mousePosition.x - 50) / 10}deg) scale(1.05)`,
                transition: "transform 0.1s ease-out",
              }
            : undefined
        }
      >
        {/* Spotlight effect following cursor */}
        {enableCursorEffect && isHovering && (
          <div
            className="absolute inset-0 rounded-full opacity-40 blur-xl transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(148, 163, 184, 0.35), transparent 70%)`,
            }}
          />
        )}

        {/* Animated gradient overlay */}
        <div className="absolute inset-0 rounded-full bg-linear-to-tr from-white/30 via-transparent to-gray-200/20 dark:from-gray-700/20 dark:to-gray-800/10" />

        {/* Subtle shimmer effect */}
        <div className="absolute inset-0 rounded-full opacity-0 animate-pulse bg-linear-to-br from-gray-100/40 via-transparent to-gray-200/40 dark:from-gray-700/30 dark:to-gray-600/20" />

        {showSpinner && (
          <div className="absolute inset-0 rounded-full opacity-40 blur-xl" />
        )}

        <IconComponent
          className={cn(
            "relative z-10 text-gray-400 dark:text-gray-500 transition-all duration-300",
            isHovering &&
              enableCursorEffect &&
              "text-gray-500 dark:text-gray-400",
            sizes.icon,
            showSpinner && "animate-spin",
          )}
          strokeWidth={1.5}
        />

        {/* Glow effect */}
        {enableCursorEffect && isHovering && (
          <div className="absolute inset-0 rounded-full bg-linear-to-br from-gray-300/20 to-transparent blur-md animate-pulse" />
        )}
      </div>

      {/* Title */}
      <h3
        className={cn(
          "mb-2 font-semibold tracking-tight transition-colors duration-300",
          "text-gray-700 dark:text-gray-200",
          isHovering &&
            enableCursorEffect &&
            "text-gray-900 dark:text-gray-100",
          sizes.title,
        )}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        className={cn(
          "max-w-sm text-gray-500 dark:text-gray-400 transition-colors duration-300",
          isHovering &&
            enableCursorEffect &&
            "text-gray-600 dark:text-gray-300",
          sizes.description,
        )}
      >
        {description}
      </p>

      {/* Optional progress bar (HeroUI Progress) */}
      {showProgress && (
        <div className="w-full max-w-xs mt-4 px-4 relative z-10">
          {/* Using HeroUI Progress for consistent styling and accessibility */}
          {/* @ts-ignore - HeroUI types are available at runtime */}
          <Progress
            value={progressClamped}
            size="sm"
            color="primary"
            showValueLabel
          />
        </div>
      )}

      {/* Optional action */}
      {action && <div className="mt-6 relative z-10">{action}</div>}
    </div>
  );
}
