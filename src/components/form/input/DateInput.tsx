"use client";

import * as React from "react";
import { getThemeClasses, useThemeMode } from "../useThemeMode";
import { CalendarMark } from "@solar-icons/react-perf/BoldDuotone";

export interface DateInputProps {
  value?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  theme?: "light" | "dark";
}

export const DateInput: React.FC<DateInputProps> = ({
  value = "",
  onChange,
  disabled,
  placeholder = "YYYY-MM-DD",
  className,
  theme,
}) => {
  const currentTheme = useThemeMode(theme);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const bgClass = getThemeClasses("bg-white", "bg-gray-950", currentTheme);
  const borderClass = getThemeClasses("border-gray-200", "border-gray-800", currentTheme);
  const textClass = getThemeClasses("text-gray-900", "text-gray-100", currentTheme);
  const ringClass = getThemeClasses("focus:ring-gray-900", "focus:ring-gray-100", currentTheme);
  const disabledBgClass = getThemeClasses("disabled:bg-gray-50", "disabled:bg-gray-900", currentTheme);
  const iconColor = getThemeClasses("text-gray-400", "text-gray-500", currentTheme);
  const hoverBgClass = getThemeClasses("hover:bg-gray-100/50", "hover:bg-gray-800/50", currentTheme);

  const handleIconClick = () => {
    if (!disabled && inputRef.current) {
      inputRef.current.showPicker();
    }
  };

  return (
    <div className={`relative ${className || ""}`}>
      <style>{`
        input[type="date"]::-webkit-calendar-picker-indicator {
          display: none;
        }
        input[type="date"]::-webkit-inner-spin-button,
        input[type="date"]::-webkit-clear-button {
          display: none;
        }
      `}</style>
      <input
        ref={inputRef}
        type="date"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        className={`w-full px-3 py-2.5 pr-12 ${bgClass} border ${borderClass} ${textClass} rounded-lg focus:outline-none focus:ring-2 ${ringClass} focus:border-transparent ${disabledBgClass} disabled:cursor-not-allowed disabled:opacity-50 transition-all`}
      />
      <span 
        onClick={handleIconClick}
        className={`absolute right-3 top-1/2 -translate-y-1/2 ${hoverBgClass} p-1 rounded-xl cursor-pointer duration-300 transition-colors ${iconColor} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <CalendarMark size={26} />
      </span>
    </div>
  );
};