"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import SlideThemeSwitch from "./ui/slide-theme-switcher";
import ClickThemeToggleSmall from "./ui/click-theme-switcher-small";

/**
 * Theme Toggle Component
 * Allows users to switch between light and dark modes
 */
interface ThemeToggleProps {
  variant?: "slide" | "click-small";
}
export function ThemeToggle({ variant = "click-small" }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  switch (variant) {
    case "click-small":
      return (
        <ClickThemeToggleSmall
          checked={theme === "dark"}
          onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
        />
      );
    case "slide":
      return (
        <SlideThemeSwitch
          checked={theme === "dark"}
          onToggle={() => setTheme(theme === "dark" ? "light" : "dark")}
        />
      );
    default:
  }
}
