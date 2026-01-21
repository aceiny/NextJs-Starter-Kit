"use client";
import * as React from "react";
import { getThemeClasses, useThemeMode } from "../useThemeMode";
import { Eye, EyeClosed } from "@solar-icons/react-perf/BoldDuotone";
import { RippleButton } from "../ripple-button";

export interface PasswordInputProps {
  value?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  showToggle?: boolean;
  theme?: "light" | "dark";
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  value = "",
  onChange,
  disabled,
  placeholder,
  className,
  showToggle = true,
  theme,
}) => {
  const currentTheme = useThemeMode(theme);
  const [visible, setVisible] = React.useState(false);

  const bgClass = getThemeClasses("bg-white", "bg-gray-950", currentTheme);
  const borderClass = getThemeClasses(
    "border-gray-200",
    "border-gray-800",
    currentTheme,
  );
  const textClass = getThemeClasses(
    "text-gray-900",
    "text-gray-100",
    currentTheme,
  );
  const ringClass = getThemeClasses(
    "focus:ring-gray-900",
    "focus:ring-gray-100",
    currentTheme,
  );
  const disabledBgClass = getThemeClasses(
    "disabled:bg-gray-50",
    "disabled:bg-gray-900",
    currentTheme,
  );
  const iconColor = getThemeClasses(
    "text-gray-500",
    "text-gray-400",
    currentTheme,
  );
  const hoverIconColor = getThemeClasses(
    "hover:text-gray-700",
    "hover:text-gray-300",
    currentTheme,
  );

  return (
    <div className={`relative ${className || ""}`}>
      <input
        type={visible ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        className={`w-full px-3 py-2.5 ${bgClass} border ${borderClass} ${textClass} rounded-lg focus:outline-none focus:ring-2 ${ringClass} focus:border-transparent ${disabledBgClass} disabled:cursor-not-allowed disabled:opacity-50 transition-all`}
      />
      {showToggle && (
        <RippleButton
          type="button"
          variant="ghost"
          onClick={() => setVisible((v) => !v)}
          className={`absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center p-1 ${iconColor} ${hoverIconColor} transition-colors focus:outline-none`}
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? <Eye fontSize={26} /> : <EyeClosed fontSize={26} />}
        </RippleButton>
      )}
    </div>
  );
};
