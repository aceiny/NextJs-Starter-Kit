"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

/**
 * Hook to get the current theme mode
 * @param forcedTheme - Optional theme override ('light' | 'dark')
 * @returns The current theme mode ('light' or 'dark')
 */
export function useThemeMode(forcedTheme?: "light" | "dark"): "light" | "dark" {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // If theme is forced, use that
  if (forcedTheme) {
    return forcedTheme;
  }

  // Return light until mounted to avoid hydration mismatch
  if (!mounted) {
    return "light";
  }

  // Otherwise use the resolved theme from next-themes
  return (resolvedTheme as "light" | "dark") || "light";
}

/**
 * Get theme-aware classes
 * @param lightClass - Classes for light mode
 * @param darkClass - Classes for dark mode
 * @param currentTheme - Current theme mode
 * @returns The appropriate classes for the current theme
 */
export function getThemeClasses(
  lightClass: string,
  darkClass: string,
  currentTheme: "light" | "dark",
): string {
  return currentTheme === "dark" ? darkClass : lightClass;
}
