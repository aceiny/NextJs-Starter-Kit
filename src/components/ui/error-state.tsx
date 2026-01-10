"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  AlertCircle,
  XCircle,
  WifiOff,
  ServerCrash,
  ShieldAlert,
  RefreshCw,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { extractErrorMessage } from "@/lib/utils/error.utils";

export type ErrorStateVariant =
  | "default"
  | "critical"
  | "network"
  | "server"
  | "permission";

const variantConfig: Record<
  ErrorStateVariant,
  { icon: LucideIcon; color: string; bgGradient: string; ringColor: string }
> = {
  default: {
    icon: AlertCircle,
    color: "text-amber-500 dark:text-amber-400",
    bgGradient:
      "from-amber-50 to-amber-100 dark:from-amber-950/40 dark:to-amber-900/30",
    ringColor: "ring-amber-200/50 dark:ring-amber-700/50",
  },
  critical: {
    icon: XCircle,
    color: "text-red-500 dark:text-red-400",
    bgGradient:
      "from-red-50 to-red-100 dark:from-red-950/40 dark:to-red-900/30",
    ringColor: "ring-red-200/50 dark:ring-red-700/50",
  },
  network: {
    icon: WifiOff,
    color: "text-blue-500 dark:text-blue-400",
    bgGradient:
      "from-blue-50 to-blue-100 dark:from-blue-950/40 dark:to-blue-900/30",
    ringColor: "ring-blue-200/50 dark:ring-blue-700/50",
  },
  server: {
    icon: ServerCrash,
    color: "text-purple-500 dark:text-purple-400",
    bgGradient:
      "from-purple-50 to-purple-100 dark:from-purple-950/40 dark:to-purple-900/30",
    ringColor: "ring-purple-200/50 dark:ring-purple-700/50",
  },
  permission: {
    icon: ShieldAlert,
    color: "text-orange-500 dark:text-orange-400",
    bgGradient:
      "from-orange-50 to-orange-100 dark:from-orange-950/40 dark:to-orange-900/30",
    ringColor: "ring-orange-200/50 dark:ring-orange-700/50",
  },
};

export interface ErrorStateProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Custom icon component to display */
  icon?: LucideIcon;
  /** Predefined variant for common error states */
  variant?: ErrorStateVariant;
  /** Main error title */
  title?: string;
  /** Error message/description - will be overridden by parsed error if error prop is provided */
  message?: string;
  /** Error object to parse and display - takes precedence over message prop */
  error?: unknown;
  /** Optional retry callback */
  onRetry?: () => void;
  /** Retry button label */
  retryLabel?: string;
  /** Whether the retry action is loading */
  isRetrying?: boolean;
  /** Optional custom action element */
  action?: React.ReactNode;
  /** Size of the error state */
  size?: "sm" | "md" | "lg";
  /** Enable cursor follow effect */
  enableCursorEffect?: boolean;
}

const sizeClasses = {
  sm: {
    container: "py-6",
    iconWrapper: "h-12 w-12",
    icon: "h-6 w-6",
    title: "text-sm",
    message: "text-xs",
  },
  md: {
    container: "py-10",
    iconWrapper: "h-16 w-16",
    icon: "h-8 w-8",
    title: "text-base",
    message: "text-sm",
  },
  lg: {
    container: "py-16",
    iconWrapper: "h-20 w-20",
    icon: "h-10 w-10",
    title: "text-lg",
    message: "text-base",
  },
};

export function ErrorState({
  icon,
  variant = "default",
  title = "Something went wrong",
  message = "An unexpected error occurred. Please try again.",
  error,
  onRetry,
  retryLabel = "Try again",
  isRetrying = false,
  action,
  size = "md",
  enableCursorEffect = true,
  className,
  ...props
}: ErrorStateProps) {
  const config = variantConfig[variant];
  const IconComponent = icon || config.icon;
  const sizes = sizeClasses[size];
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = React.useState(false);

  // Parse error if provided, otherwise use the message prop
  const displayMessage = React.useMemo(() => {
    if (error) {
      return extractErrorMessage(error, message);
    }
    return message;
  }, [error, message]);

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
            background: `radial-gradient(800px circle at ${mousePosition.x}% ${mousePosition.y}%, ${
              variant === "critical"
                ? "rgba(239, 68, 68, 0.1)"
                : variant === "network"
                  ? "rgba(59, 130, 246, 0.1)"
                  : variant === "server"
                    ? "rgba(168, 85, 247, 0.1)"
                    : variant === "permission"
                      ? "rgba(249, 115, 22, 0.1)"
                      : "rgba(245, 158, 11, 0.1)"
            }, transparent 50%)`,
            opacity: isHovering ? 1 : 0,
          }}
        />
      )}

      {/* Subtle border glow effect */}
      {enableCursorEffect && isHovering && (
        <div
          className="absolute inset-0 rounded-lg pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, ${
              variant === "critical"
                ? "rgba(239, 68, 68, 0.12)"
                : variant === "network"
                  ? "rgba(59, 130, 246, 0.12)"
                  : variant === "server"
                    ? "rgba(168, 85, 247, 0.12)"
                    : variant === "permission"
                      ? "rgba(249, 115, 22, 0.12)"
                      : "rgba(245, 158, 11, 0.12)"
            }, transparent 40%)`,
            opacity: 0.7,
          }}
        />
      )}

      {/* Animated icon container with color-coded styling */}
      <div
        className={cn(
          "relative mb-6 flex items-center justify-center rounded-full transition-all duration-500",
          "bg-gradient-to-br shadow-lg backdrop-blur-sm",
          config.bgGradient,
          "ring-1",
          config.ringColor,
          isHovering && enableCursorEffect && "scale-105 shadow-2xl",
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
            className="absolute inset-0 rounded-full opacity-50 blur-xl transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, ${
                variant === "critical"
                  ? "rgba(239, 68, 68, 0.5)"
                  : variant === "network"
                    ? "rgba(59, 130, 246, 0.5)"
                    : variant === "server"
                      ? "rgba(168, 85, 247, 0.5)"
                      : variant === "permission"
                        ? "rgba(249, 115, 22, 0.5)"
                        : "rgba(245, 158, 11, 0.5)"
              }, transparent 70%)`,
            }}
          />
        )}

        {/* Decorative pulse ring */}
        <div
          className={cn(
            "absolute inset-0 rounded-full opacity-40",
            "animate-pulse bg-gradient-to-tr from-white/30 to-transparent",
          )}
        />

        {/* Enhanced glow effect */}
        <div
          className={cn(
            "absolute -inset-3 rounded-full blur-xl opacity-20 transition-opacity duration-300",
            config.bgGradient,
            isHovering && enableCursorEffect && "opacity-40",
          )}
        />

        <IconComponent
          className={cn(
            "relative z-10 transition-all duration-300",
            config.color,
            sizes.icon,
            isHovering && enableCursorEffect && "scale-110",
          )}
          strokeWidth={1.5}
        />

        {/* Dynamic glow pulse */}
        {enableCursorEffect && isHovering && (
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent blur-md animate-pulse" />
        )}
      </div>

      {/* Title */}
      <h3
        className={cn(
          "mb-2 font-semibold tracking-tight transition-colors duration-300",
          "text-gray-800 dark:text-gray-100",
          isHovering && enableCursorEffect && "text-gray-900 dark:text-white",
          sizes.title,
        )}
      >
        {title}
      </h3>

      {/* Message */}
      <p
        className={cn(
          "max-w-sm text-gray-600 dark:text-gray-400 transition-colors duration-300",
          isHovering &&
            enableCursorEffect &&
            "text-gray-700 dark:text-gray-300",
          sizes.message,
        )}
      >
        {displayMessage}
      </p>

      {/* Actions */}
      {(onRetry || action) && (
        <div className="mt-6 flex items-center gap-3 relative z-10">
          {onRetry && (
            <Button
              variant="outline"
              size="sm"
              onClick={onRetry}
              disabled={isRetrying}
              className="gap-2 transition-all duration-300 hover:scale-105"
            >
              <RefreshCw
                className={cn("h-4 w-4", isRetrying && "animate-spin")}
              />
              {retryLabel}
            </Button>
          )}
          {action}
        </div>
      )}
    </div>
  );
}
