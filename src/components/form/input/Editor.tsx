"use client";

import * as React from "react";
import { useThemeMode, getThemeClasses } from "../useThemeMode";

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  theme?: "light" | "dark";
}

export const Editor: React.FC<EditorProps> = ({
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
            {" "}
            <span className="font-bold text-base">H1</span>{" "}
          </ToolbarButton>
          <ToolbarButton
            onClick={() => execCommand("formatBlock", "h2")}
            title="Heading 2"
            isActive={activeFormats.has("h2")}
          >
            {" "}
            <span className="font-bold text-sm">H2</span>{" "}
          </ToolbarButton>
          <ToolbarButton
            onClick={() => execCommand("formatBlock", "h3")}
            title="Heading 3"
            isActive={activeFormats.has("h3")}
          >
            {" "}
            <span className="font-bold text-xs">H3</span>{" "}
          </ToolbarButton>
          <ToolbarButton
            onClick={() => execCommand("formatBlock", "p")}
            title="Paragraph"
          >
            {" "}
            <span className="text-xs">P</span>{" "}
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
            {" "}
            <span className="text-xs">⇤</span>{" "}
          </ToolbarButton>
          <ToolbarButton
            onClick={() => execCommand("justifyCenter")}
            title="Align Center"
            isActive={activeFormats.has("center")}
          >
            {" "}
            <span className="text-xs">⇥</span>{" "}
          </ToolbarButton>
          <ToolbarButton
            onClick={() => execCommand("justifyRight")}
            title="Align Right"
            isActive={activeFormats.has("right")}
          >
            {" "}
            <span className="text-xs">⇥</span>{" "}
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
            {" "}
            <span className="text-xs">✕</span>{" "}
          </ToolbarButton>

          {/* Info */}
          <div className="ml-auto flex items-center">
            {" "}
            <span className={`text-xs ${textClass} opacity-60`}>
              {" "}
              HTML Editor
            </span>{" "}
          </div>
        </div>

        {/* Link Input UI */}
        {showLinkInput && (
          <div
            className={`flex items-center gap-2 px-3 py-2 border-b ${borderClass}`}
          >
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {" "}
              URL:{" "}
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
              {" "}
              Insert
            </button>
            <button
              type="button"
              onClick={() => {
                setShowLinkInput(false);
                setLinkUrl("https://");
                savedSelectionRef.current = null;
              }}
              className={` px-3 py-1 text-sm rounded ${toolbarBgClass} ${textClass} ${hoverClass} transition-colors `}
            >
              {" "}
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
