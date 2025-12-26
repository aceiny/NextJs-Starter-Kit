"use client";

import * as React from "react";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { FormItem } from "./FormItem";
import { FormLabel } from "./FormLabel";
import { FormControl } from "./FormControl";
import { FormDescription } from "./FormDescription";
import { FormMessage } from "./FormMessage";
import { useThemeMode, getThemeClasses } from "./useThemeMode";

/**
 * Universal Input Types
 * Supports standard HTML inputs, OTP, textarea, and rich text editor
 */
type UniversalInputType =
  | "text"
  | "password"
  | "email"
  | "phone"
  | "number"
  | "date"
  | "search"
  | "url"
  | "datetime-local"
  | "otp"
  | "textarea"
  | "editor";

/**
 * OTP Input Component
 * Individual character inputs that auto-focus next on entry (shadcn style)
 */
interface OTPInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  pattern?: string;
  disabled?: boolean;
  className?: string;
}

interface OTPInputPropsExtended extends OTPInputProps {
  theme?: "light" | "dark";
}

const OTPInput: React.FC<OTPInputPropsExtended> = ({
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

/**
 * Rich Text Editor Component with HTML output
 * A contentEditable-based editor that stores HTML
 */
interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  theme?: "light" | "dark";
}

const Editor: React.FC<EditorProps> = ({
  value,
  onChange,
  disabled,
  placeholder,
  className,
  theme,
}) => {
  const currentTheme = useThemeMode(theme);
  const editorRef = React.useRef<HTMLDivElement>(null);
  const [activeFormats, setActiveFormats] = React.useState<Set<string>>(
    new Set(),
  );
  const [showLinkInput, setShowLinkInput] = React.useState(false);
  const [linkUrl, setLinkUrl] = React.useState("https://");
  const linkInputRef = React.useRef<HTMLInputElement>(null);
  const savedSelectionRef = React.useRef<Range | null>(null);

  const borderClass = getThemeClasses(
    "border-gray-200",
    "border-gray-800",
    currentTheme,
  );
  const bgClass = getThemeClasses("bg-white", "bg-gray-950", currentTheme);
  const toolbarBgClass = getThemeClasses(
    "bg-gray-50",
    "bg-gray-900",
    currentTheme,
  );
  const textClass = getThemeClasses(
    "text-gray-700",
    "text-gray-300",
    currentTheme,
  );
  const hoverClass = getThemeClasses(
    "hover:bg-gray-200",
    "hover:bg-gray-700",
    currentTheme,
  );
  const activeClass = getThemeClasses(
    "bg-gray-900 text-white",
    "bg-gray-100 text-gray-900",
    currentTheme,
  );
  const mainTextClass = getThemeClasses(
    "text-gray-900",
    "text-gray-100",
    currentTheme,
  );
  const disabledBgClass = getThemeClasses(
    "disabled:bg-gray-50",
    "disabled:bg-gray-900",
    currentTheme,
  );

  // Initialize editor content
  React.useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || "";
    }
  }, [value]);

  // Update active formats based on cursor position
  const updateActiveFormats = () => {
    const formats = new Set<string>();

    if (document.queryCommandState("bold")) formats.add("bold");
    if (document.queryCommandState("italic")) formats.add("italic");
    if (document.queryCommandState("underline")) formats.add("underline");
    if (document.queryCommandState("strikeThrough"))
      formats.add("strikethrough");
    if (document.queryCommandState("insertUnorderedList")) formats.add("ul");
    if (document.queryCommandState("insertOrderedList")) formats.add("ol");
    if (document.queryCommandState("justifyLeft")) formats.add("left");
    if (document.queryCommandState("justifyCenter")) formats.add("center");
    if (document.queryCommandState("justifyRight")) formats.add("right");

    const block = document.queryCommandValue("formatBlock").toLowerCase();
    if (block === "h1") formats.add("h1");
    if (block === "h2") formats.add("h2");
    if (block === "h3") formats.add("h3");

    setActiveFormats(formats);
  };

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
    updateActiveFormats();
  };

  const handleSelectionChange = () => {
    updateActiveFormats();
  };

  React.useEffect(() => {
    document.addEventListener("selectionchange", handleSelectionChange);
    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
    };
  }, []);

  const execCommand = (command: string, value?: string) => {
    if (disabled) return;
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    handleInput();
  };

  const handleLinkCreate = () => {
    const trimmedUrl = linkUrl.trim();

    // Validate URL is not empty and not just the default 'https://'
    if (!trimmedUrl || trimmedUrl === "https://" || trimmedUrl === "http://") {
      return; // Don't insert invalid URLs
    }

    // Basic URL validation
    try {
      new URL(trimmedUrl);

      // Restore the saved selection before creating the link
      if (savedSelectionRef.current) {
        const selection = window.getSelection();
        if (selection) {
          selection.removeAllRanges();
          selection.addRange(savedSelectionRef.current);
        }
      }

      execCommand("createLink", trimmedUrl);
      setShowLinkInput(false);
      setLinkUrl("https://");
      savedSelectionRef.current = null;
    } catch {
      // Invalid URL format, don't insert
      return;
    }
  };

  React.useEffect(() => {
    if (showLinkInput && linkInputRef.current) {
      linkInputRef.current.focus();
      // Select all text so user can start typing immediately
      linkInputRef.current.select();
    }
  }, [showLinkInput]);

  const ToolbarButton: React.FC<{
    onClick: () => void;
    children: React.ReactNode;
    title: string;
    isActive?: boolean;
  }> = ({ onClick, children, title, isActive = false }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      disabled={disabled}
      className={`w-8 h-8 flex items-center justify-center text-sm font-medium rounded transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
        isActive ? activeClass : `${textClass} ${hoverClass}`
      }`}
    >
      {children}
    </button>
  );

  return (
    <div
      className={`border ${borderClass} ${bgClass} rounded-lg ${className || ""}`}
    >
      <div
        className={`${toolbarBgClass} px-3 py-2 border-b ${borderClass} rounded-t-lg`}
      >
        <div className="flex flex-wrap gap-1">
          {/* Text Formatting */}
          <ToolbarButton
            onClick={() => execCommand("bold")}
            title="Bold (Ctrl+B)"
            isActive={activeFormats.has("bold")}
          >
            <strong>B</strong>
          </ToolbarButton>
          <ToolbarButton
            onClick={() => execCommand("italic")}
            title="Italic (Ctrl+I)"
            isActive={activeFormats.has("italic")}
          >
            <em>I</em>
          </ToolbarButton>
          <ToolbarButton
            onClick={() => execCommand("underline")}
            title="Underline (Ctrl+U)"
            isActive={activeFormats.has("underline")}
          >
            <u>U</u>
          </ToolbarButton>
          <ToolbarButton
            onClick={() => execCommand("strikeThrough")}
            title="Strikethrough"
            isActive={activeFormats.has("strikethrough")}
          >
            <s>S</s>
          </ToolbarButton>

          {/* Divider */}
          <div className={`w-px ${borderClass} mx-1 my-1`} />

          {/* Headings */}
          <ToolbarButton
            onClick={() => execCommand("formatBlock", "h1")}
            title="Heading 1"
            isActive={activeFormats.has("h1")}
          >
            <span className="font-bold text-base">H1</span>
          </ToolbarButton>
          <ToolbarButton
            onClick={() => execCommand("formatBlock", "h2")}
            title="Heading 2"
            isActive={activeFormats.has("h2")}
          >
            <span className="font-bold text-sm">H2</span>
          </ToolbarButton>
          <ToolbarButton
            onClick={() => execCommand("formatBlock", "h3")}
            title="Heading 3"
            isActive={activeFormats.has("h3")}
          >
            <span className="font-bold text-xs">H3</span>
          </ToolbarButton>
          <ToolbarButton
            onClick={() => execCommand("formatBlock", "p")}
            title="Paragraph"
          >
            <span className="text-xs">P</span>
          </ToolbarButton>

          {/* Divider */}
          <div className={`w-px ${borderClass} mx-1 my-1`} />

          {/* Lists */}
          <ToolbarButton
            onClick={() => execCommand("insertUnorderedList")}
            title="Bullet List"
            isActive={activeFormats.has("ul")}
          >
            <span className="text-base">•</span>
          </ToolbarButton>
          <ToolbarButton
            onClick={() => execCommand("insertOrderedList")}
            title="Numbered List"
            isActive={activeFormats.has("ol")}
          >
            <span className="text-xs font-semibold">1.</span>
          </ToolbarButton>

          {/* Divider */}
          <div className={`w-px ${borderClass} mx-1 my-1`} />

          {/* Alignment */}
          <ToolbarButton
            onClick={() => execCommand("justifyLeft")}
            title="Align Left"
            isActive={activeFormats.has("left")}
          >
            <span className="text-xs">⇤</span>
          </ToolbarButton>
          <ToolbarButton
            onClick={() => execCommand("justifyCenter")}
            title="Align Center"
            isActive={activeFormats.has("center")}
          >
            <span className="text-xs">⇥</span>
          </ToolbarButton>
          <ToolbarButton
            onClick={() => execCommand("justifyRight")}
            title="Align Right"
            isActive={activeFormats.has("right")}
          >
            <span className="text-xs">⇥</span>
          </ToolbarButton>

          {/* Divider */}
          <div className={`w-px ${borderClass} mx-1 my-1`} />

          {/* Link */}
          <ToolbarButton
            onClick={() => {
              const selection = window.getSelection();
              if (!selection || selection.rangeCount === 0) return;

              const selectedText = selection.toString();
              if (!selectedText) {
                return;
              }

              // Save the current selection so we can restore it later
              savedSelectionRef.current = selection.getRangeAt(0).cloneRange();
              setShowLinkInput(true);
            }}
            title="Insert Link (Select text first)"
          >
            <span className="text-xs">🔗</span>
          </ToolbarButton>

          {/* Remove Formatting */}
          <ToolbarButton
            onClick={() => execCommand("removeFormat")}
            title="Clear Formatting"
          >
            <span className="text-xs">✕</span>
          </ToolbarButton>

          {/* Info */}
          <div className="ml-auto flex items-center">
            <span className={`text-xs ${textClass} opacity-60`}>
              HTML Editor
            </span>
          </div>
        </div>

        {/* Link Input UI */}
        {showLinkInput && (
          <div
            className={`flex items-center gap-2 px-3 py-2 border-b ${borderClass}`}
          >
            <span className="text-sm text-gray-600 dark:text-gray-400">
              URL:
            </span>
            <input
              ref={linkInputRef}
              type="text"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleLinkCreate();
                } else if (e.key === "Escape") {
                  setShowLinkInput(false);
                  setLinkUrl("https://");
                }
              }}
              className={`
                flex-1 px-2 py-1 text-sm rounded border outline-none
                ${borderClass}
                ${bgClass}
                ${mainTextClass}
                focus:ring-2 focus:ring-blue-500
              `}
              placeholder="https://example.com"
            />
            <button
              type="button"
              onClick={handleLinkCreate}
              className={`
                px-3 py-1 text-sm rounded
                bg-blue-600 text-white hover:bg-blue-700
                transition-colors
              `}
            >
              Insert
            </button>
            <button
              type="button"
              onClick={() => {
                setShowLinkInput(false);
                setLinkUrl("https://");
                savedSelectionRef.current = null;
              }}
              className={`
                px-3 py-1 text-sm rounded
                ${toolbarBgClass}
                ${textClass}
                ${hoverClass}
                transition-colors
              `}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
      <div
        ref={editorRef}
        contentEditable={!disabled}
        onInput={handleInput}
        onClick={(e) => {
          // Make links clickable with Ctrl/Cmd + Click
          const target = e.target as HTMLElement;
          if (target.tagName === "A" && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            const href = target.getAttribute("href");
            if (href) {
              window.open(href, "_blank", "noopener,noreferrer");
            }
          }
        }}
        className={`w-full px-3 py-2 min-h-[200px] ${bgClass} ${mainTextClass} focus:outline-none rounded-b-lg ${disabledBgClass} ${disabled ? "cursor-not-allowed opacity-50" : ""} transition-colors overflow-auto`}
        suppressContentEditableWarning
        data-placeholder={placeholder || "Start typing..."}
        style={{
          wordBreak: "break-word",
          overflowWrap: "break-word",
        }}
      />
      <style
        dangerouslySetInnerHTML={{
          __html: `
        [contenteditable][data-placeholder]:empty:before {
          content: attr(data-placeholder);
          color: ${currentTheme === "dark" ? "#6b7280" : "#9ca3af"};
          pointer-events: none;
        }
        [contenteditable] a {
          color: ${currentTheme === "dark" ? "#60a5fa" : "#2563eb"} !important;
          text-decoration: underline !important;
          cursor: pointer !important;
          font-weight: 500 !important;
          text-decoration-thickness: 2px !important;
          text-underline-offset: 2px !important;
          background-color: ${currentTheme === "dark" ? "rgba(96, 165, 250, 0.15)" : "rgba(37, 99, 235, 0.1)"} !important;
          padding: 2px 4px !important;
          border-radius: 3px !important;
        }
        [contenteditable] a:hover {
          color: ${currentTheme === "dark" ? "#93c5fd" : "#1e40af"} !important;
          background-color: ${currentTheme === "dark" ? "rgba(96, 165, 250, 0.25)" : "rgba(37, 99, 235, 0.2)"} !important;
        }
      `,
        }}
      />
    </div>
  );
};

/**
 * RHFUniversalInput Component
 * A comprehensive input component that handles all input types through a single interface
 * Automatically integrates with React Hook Form using Controller
 *
 * @example
 * ```tsx
 * // Text input
 * <Field.Input
 *   name="email"
 *   type="email"
 *   label="Email Address"
 *   required
 *   helperText="We'll never share your email"
 * />
 *
 * // OTP input
 * <Field.Input
 *   name="otp"
 *   type="otp"
 *   label="Verification Code"
 *   maxLength={6}
 *   pattern="[0-9]*"
 * />
 *
 * // Textarea
 * <Field.Input
 *   name="description"
 *   type="textarea"
 *   label="Description"
 *   rows={4}
 * />
 *
 * // Rich text editor
 * <Field.Input
 *   name="content"
 *   type="editor"
 *   label="Article Content"
 * />
 * ```
 */
interface RHFUniversalInputProps<T extends FieldValues> {
  /** Field name matching your form schema */
  name: Path<T>;
  /** Input type - determines which input component to render */
  type?: UniversalInputType;
  /** Label text displayed above the input */
  label?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Helper text displayed below the input */
  helperText?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Whether the field is disabled */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** For textarea: number of rows */
  rows?: number;
  /** For OTP: number of characters/digits (default: 6) */
  otpLength?: number;
  /** For OTP: validation pattern */
  pattern?: string;
  /** For number inputs: min value */
  min?: number;
  /** For number inputs: max value */
  max?: number;
  /** For number inputs: step value */
  step?: number;
  /** Label mode: 'floating' (default) or 'static' */
  labelMode?: "floating" | "static";
  /** Force a specific theme ('light' | 'dark'). If not provided, uses Next.js theme */
  theme?: "light" | "dark";
  /** For password inputs: show/hide password toggle button (default: true) */
  showPasswordToggle?: boolean;
  /** Optional side effect callback when value changes (field.onChange is handled internally) */
  onChangeSideEffect?: (value: any) => void;
}

export function RHFUniversalInput<T extends FieldValues>({
  name,
  type = "text",
  label,
  placeholder,
  helperText,
  required = false,
  disabled = false,
  className,
  rows = 4,
  otpLength = 6,
  pattern,
  min,
  max,
  step,
  labelMode = "floating",
  theme,
  showPasswordToggle = true,
  onChangeSideEffect,
}: RHFUniversalInputProps<T>) {
  const { control } = useFormContext<T>();
  const currentTheme = useThemeMode(theme);
  const [showPassword, setShowPassword] = React.useState(false);

  // If placeholder is supplied, force floating label mode
  // OTP and Editor always use static label mode
  const isFloating =
    type === "otp" || type === "editor"
      ? false
      : placeholder
        ? true
        : labelMode === "floating";

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const hasError = !!error;

        // Check if field has value for floating label
        // For date inputs, always float the label
        // If placeholder is supplied, always float the label (to show placeholder)
        // For other inputs, check if value exists and is not the placeholder format
        const hasValue =
          type === "date" ||
          type === "datetime-local" ||
          !!placeholder ||
          (field.value !== undefined &&
            field.value !== null &&
            field.value !== "" &&
            field.value !== "mm/dd/yyyy");

        // Theme-aware classes
        const bgClass = getThemeClasses(
          "bg-white",
          "bg-gray-950",
          currentTheme,
        );
        const borderClass = hasError
          ? getThemeClasses("border-red-500", "border-red-400", currentTheme)
          : getThemeClasses("border-gray-200", "border-gray-800", currentTheme);
        const textClass = getThemeClasses(
          "text-gray-900",
          "text-gray-100",
          currentTheme,
        );
        const placeholderClass = getThemeClasses(
          "placeholder:text-gray-400",
          "placeholder:text-gray-600",
          currentTheme,
        );
        const ringClass = hasError
          ? getThemeClasses(
              "focus:ring-red-500",
              "focus:ring-red-400",
              currentTheme,
            )
          : getThemeClasses(
              "focus:ring-gray-900",
              "focus:ring-gray-100",
              currentTheme,
            );
        const disabledBgClass = getThemeClasses(
          "disabled:bg-gray-50",
          "disabled:bg-gray-900",
          currentTheme,
        );

        const baseInputClasses = `w-full px-3 py-2.5 ${bgClass} border ${borderClass} ${textClass} ${
          isFloating ? `peer ${placeholderClass}` : placeholderClass
        } rounded-lg focus:outline-none focus:ring-2 ${ringClass} focus:border-transparent ${disabledBgClass} disabled:cursor-not-allowed disabled:opacity-50 transition-all`;

        // Render different input types
        const renderInput = () => {
          switch (type) {
            case "otp":
              return (
                <FormControl>
                  <OTPInput
                    value={field.value || ""}
                    onChange={(value) => {
                      field.onChange(value);
                      onChangeSideEffect?.(value);
                    }}
                    length={otpLength}
                    pattern={pattern}
                    disabled={disabled}
                    className={hasError ? "border-red-500" : ""}
                    theme={theme}
                  />
                </FormControl>
              );

            case "textarea":
              return (
                <FormControl>
                  <textarea
                    {...field}
                    value={field.value || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value);
                      onChangeSideEffect?.(value);
                    }}
                    rows={rows}
                    disabled={disabled}
                    placeholder={placeholder}
                    className={`${baseInputClasses} resize-y ${className || ""}`}
                  />
                </FormControl>
              );

            case "editor":
              return (
                <FormControl>
                  <Editor
                    value={field.value || ""}
                    onChange={(value) => {
                      field.onChange(value);
                      onChangeSideEffect?.(value);
                    }}
                    disabled={disabled}
                    placeholder={placeholder}
                    className={hasError ? "border-red-500" : ""}
                    theme={theme}
                  />
                </FormControl>
              );

            case "number":
              return (
                <FormControl>
                  <input
                    {...field}
                    type="number"
                    value={field.value ?? ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      const numValue = value === "" ? undefined : Number(value);
                      field.onChange(numValue);
                      onChangeSideEffect?.(numValue);
                    }}
                    disabled={disabled}
                    placeholder={placeholder}
                    min={min}
                    max={max}
                    step={step}
                    className={`${baseInputClasses} ${className || ""}`}
                  />
                </FormControl>
              );

            case "phone":
              return (
                <FormControl>
                  <input
                    {...field}
                    type="tel"
                    value={field.value || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value);
                      onChangeSideEffect?.(value);
                    }}
                    disabled={disabled}
                    placeholder={placeholder}
                    className={`${baseInputClasses} ${className || ""}`}
                  />
                </FormControl>
              );

            default:
              // Handle password type with toggle
              if (type === "password" && showPasswordToggle) {
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
                  <FormControl>
                    <div className="relative">
                      <input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        value={field.value || ""}
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(value);
                          onChangeSideEffect?.(value);
                        }}
                        disabled={disabled}
                        placeholder={placeholder}
                        className={`${baseInputClasses} pr-10 ${className || ""}`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className={`absolute right-3 top-1/2 -translate-y-1/2 ${iconColor} ${hoverIconColor} transition-colors focus:outline-none`}
                        tabIndex={-1}
                      >
                        {showPassword ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                  </FormControl>
                );
              }

              return (
                <FormControl>
                  <input
                    {...field}
                    type={type}
                    value={field.value || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value);
                      onChangeSideEffect?.(value);
                    }}
                    disabled={disabled}
                    placeholder={placeholder}
                    className={`${baseInputClasses} ${className || ""}`}
                  />
                </FormControl>
              );
          }
        };

        // Theme-aware label background
        const labelBg = getThemeClasses(
          "bg-white",
          "bg-gray-950",
          currentTheme,
        );
        const labelFocusedColor =
          currentTheme === "dark" ? "text-gray-100" : "text-gray-900";
        const labelUnfocusedColor =
          currentTheme === "dark" ? "text-gray-300" : "text-gray-900";

        return (
          <FormItem name={name}>
            {isFloating ? (
              <div className="relative">
                {renderInput()}
                {label && (
                  <FormLabel
                    required={required}
                    className={`absolute left-3 ${labelBg} px-1 font-medium transition-all duration-200 pointer-events-none ${
                      hasValue
                        ? `-top-2.5 text-xs ${labelFocusedColor}`
                        : `top-1/2 -translate-y-1/2 text-sm ${labelUnfocusedColor} peer-focus:-top-2.5 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:${labelFocusedColor}`
                    }`}
                  >
                    {label}
                  </FormLabel>
                )}
              </div>
            ) : (
              <div className="space-y-1">
                {label && <FormLabel required={required}>{label}</FormLabel>}
                {renderInput()}
              </div>
            )}
            {helperText && !error && (
              <FormDescription>{helperText}</FormDescription>
            )}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
