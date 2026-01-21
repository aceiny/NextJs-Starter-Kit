"use client";

import * as React from "react";
import { useThemeMode, getThemeClasses } from "../useThemeMode";

export interface OTPInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  pattern?: string;
  disabled?: boolean;
  className?: string;
  theme?: "light" | "dark";
}

export const OTPInput: React.FC<OTPInputProps> = ({
  value,
  onChange,
  length = 6,
  pattern = "[0-9]*",
  disabled,
  className,
  theme,
}) => {
  const currentTheme = useThemeMode(theme);
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  // Ensure value is always a string with the correct length
  const digits = (value || "").split("");
  while (digits.length < length) {
    digits.push("");
  }

  const handleChange = (index: number, newValue: string) => {
    // Only allow characters matching the pattern
    if (pattern === "[0-9]*" && !/^\d*$/.test(newValue)) {
      return;
    }

    // Only take the last character if multiple are pasted/entered
    const char = newValue.slice(-1);

    const newDigits = [...digits];
    newDigits[index] = char;

    const newOtp = newDigits.join("");
    onChange(newOtp);

    // Auto-focus next input if character was entered
    if (char && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    // Handle backspace
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    // Handle arrow keys
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").slice(0, length);

    if (pattern === "[0-9]*" && !/^\d*$/.test(pastedData)) {
      return;
    }

    onChange(pastedData);

    // Focus the next empty input or the last one
    const nextIndex = Math.min(pastedData.length, length - 1);
    inputRefs.current[nextIndex]?.focus();
  };

  const bgClass = getThemeClasses("bg-white", "bg-gray-950", currentTheme);
  const borderClass = getThemeClasses(
    "border-gray-300",
    "border-gray-700",
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

  return (
    <div
      className={`flex gap-1 sm:gap-1.5 md:gap-2 lg:gap-3 justify-center w-full px-2 ${className || ""}`}
    >
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digits[index] || ""}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          disabled={disabled}
          className={`flex-1 max-w-8 sm:max-w-10 md:max-w-12 lg:max-w-14 aspect-square text-center text-xs sm:text-sm md:text-base lg:text-lg font-semibold ${bgClass} border-2 ${borderClass} ${textClass} rounded-sm sm:rounded-md md:rounded-lg focus:outline-none focus:ring-2 ${ringClass} focus:border-transparent ${disabledBgClass} disabled:cursor-not-allowed disabled:opacity-50 transition-all`}
          autoComplete={index === 0 ? "one-time-code" : "off"}
        />
      ))}
    </div>
  );
};
