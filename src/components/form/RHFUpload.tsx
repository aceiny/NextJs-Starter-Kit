"use client";

import * as React from "react";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { FormItem } from "./FormItem";
import { FormLabel } from "./FormLabel";
import { FormDescription } from "./FormDescription";
import { FormMessage } from "./FormMessage";
import { useThemeMode, getThemeClasses } from "./useThemeMode";

/**
 * File metadata interface
 */
interface FileWithPreview extends File {
  preview?: string;
}

/**
 * File validation helper
 */
const validateFile = (
  file: File,
  maxSize?: number,
  accept?: string,
): string | null => {
  // Check file size
  if (maxSize && file.size > maxSize) {
    const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(2);
    return `File size must be less than ${maxSizeMB}MB`;
  }

  // Check file type
  if (accept) {
    const acceptedTypes = accept.split(",").map((type) => type.trim());
    const fileExtension = `.${file.name.split(".").pop()?.toLowerCase()}`;
    const mimeType = file.type;

    const isAccepted = acceptedTypes.some((type) => {
      if (type.startsWith(".")) {
        return fileExtension === type.toLowerCase();
      }
      if (type.endsWith("/*")) {
        const category = type.split("/")[0];
        return mimeType.startsWith(category);
      }
      return mimeType === type;
    });

    if (!isAccepted) {
      return `File type not accepted. Allowed: ${accept}`;
    }
  }

  return null;
};

/**
 * Format file size for display
 */
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
};

/**
 * RHFUpload Component
 * A universal file upload component supporting single and multiple files
 * Automatically integrates with React Hook Form using Controller
 *
 * Note: This component only handles the UI and file selection.
 * Actual file upload to server should be handled in your form submission logic.
 *
 * @example
 * ```tsx
 * // Single file upload
 * <Field.Upload
 *   name="avatar"
 *   label="Profile Picture"
 *   accept="image/*"
 *   maxSize={5 * 1024 * 1024} // 5MB
 *   helperText="Upload a profile picture (max 5MB)"
 * />
 *
 * // Multiple file upload
 * <Field.Upload
 *   name="documents"
 *   label="Documents"
 *   multiple
 *   maxFiles={3}
 *   maxSize={10 * 1024 * 1024} // 10MB per file
 *   accept=".pdf,.doc,.docx"
 *   helperText="Upload up to 3 documents"
 * />
 * ```
 */
interface RHFUploadProps<T extends FieldValues> {
  /** Field name matching your form schema */
  name: Path<T>;
  /** Label text displayed above the upload area */
  label?: string;
  /** Helper text displayed below the upload area */
  helperText?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Whether the field is disabled */
  disabled?: boolean;
  /** Allow multiple file selection */
  multiple?: boolean;
  /** Maximum number of files (only for multiple mode) */
  maxFiles?: number;
  /** Maximum file size in bytes per file */
  maxSize?: number;
  /** Accepted file types (e.g., "image/*", ".pdf,.doc", "image/png,image/jpeg") */
  accept?: string;
  /** Additional CSS classes */
  className?: string;
  /** Show image previews for image files */
  showPreview?: boolean;
  /** Upload style variant: 'default' (drop zone), 'avatar' (circular), 'button' (simple button) */
  uploadStyle?: "default" | "avatar" | "button";
  /** Force a specific theme ('light' | 'dark'). If not provided, uses Next.js theme */
  theme?: "light" | "dark";
  /** Optional side effect callback when files change (field.onChange is handled internally) */
  onChangeSideEffect?: (files: FileList | null) => void;
}

export function RHFUpload<T extends FieldValues>({
  name,
  label,
  helperText,
  required = false,
  disabled = false,
  multiple = false,
  maxFiles,
  maxSize,
  accept,
  className,
  showPreview = true,
  uploadStyle = "default",
  theme,
  onChangeSideEffect,
}: RHFUploadProps<T>) {
  const { control } = useFormContext<T>();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = React.useState(false);
  const currentTheme = useThemeMode(theme);

  // Create preview URLs for images
  const createPreview = (file: File): string | undefined => {
    if (file.type.startsWith("image/")) {
      return URL.createObjectURL(file);
    }
    return undefined;
  };

  // Handle file selection
  const handleFiles = (
    files: FileList | null,
    currentFiles: FileList | null,
    onChange: (files: FileList | null) => void,
  ): string | null => {
    if (!files || files.length === 0) return null;

    const filesArray = Array.from(files);

    // Check max files for multiple mode
    if (multiple && maxFiles) {
      const currentCount = currentFiles ? currentFiles.length : 0;
      const totalCount = currentCount + filesArray.length;

      if (totalCount > maxFiles) {
        return `Maximum ${maxFiles} files allowed`;
      }
    }

    // Validate each file
    for (const file of filesArray) {
      const error = validateFile(file, maxSize, accept);
      if (error) {
        return error;
      }
    }

    // For single file mode, just set the new file
    if (!multiple) {
      onChange(files);
      return null;
    }

    // For multiple mode, append to existing files
    if (currentFiles && currentFiles.length > 0) {
      const dt = new DataTransfer();
      Array.from(currentFiles).forEach((file) => dt.items.add(file));
      filesArray.forEach((file) => dt.items.add(file));
      onChange(dt.files);
    } else {
      onChange(files);
    }

    return null;
  };

  // Remove a file from the list
  const removeFile = (
    index: number,
    currentFiles: FileList | null,
    onChange: (files: FileList | null) => void,
  ) => {
    if (!currentFiles) return;

    const dt = new DataTransfer();
    Array.from(currentFiles).forEach((file, i) => {
      if (i !== index) dt.items.add(file);
    });

    onChange(dt.files.length > 0 ? dt.files : null);
  };

  // Handle drag events
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (
    e: React.DragEvent,
    currentFiles: FileList | null,
    onChange: (files: FileList | null) => void,
    setError: (error: string) => void,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (disabled) return;

    const error = handleFiles(e.dataTransfer.files, currentFiles, onChange);
    if (error) {
      setError(error);
    }
  };

  // Theme-aware classes
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
  const mutedTextClass = getThemeClasses(
    "text-gray-500",
    "text-gray-400",
    currentTheme,
  );
  const hoverBorderClass = getThemeClasses(
    "hover:border-gray-400",
    "hover:border-gray-600",
    currentTheme,
  );
  const dragBgClass = getThemeClasses(
    "bg-gray-50",
    "bg-gray-900",
    currentTheme,
  );
  const dragBorderClass = getThemeClasses(
    "border-gray-900",
    "border-gray-100",
    currentTheme,
  );
  const cardBgClass = getThemeClasses(
    "bg-gray-50",
    "bg-gray-900",
    currentTheme,
  );
  const iconBgClass = getThemeClasses(
    "bg-gray-200",
    "bg-gray-800",
    currentTheme,
  );
  const iconTextClass = getThemeClasses(
    "text-gray-400",
    "text-gray-600",
    currentTheme,
  );

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const hasError = !!error;
        const files = field.value as FileList | null;
        const fileCount = files ? files.length : 0;

        const [validationError, setValidationError] = React.useState<
          string | null
        >(null);

        return (
          <FormItem name={name}>
            {label && <FormLabel required={required}>{label}</FormLabel>}

            <div className={className}>
              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept={accept}
                multiple={multiple}
                disabled={disabled}
                onChange={(e) => {
                  const error = handleFiles(
                    e.target.files,
                    files,
                    (newFiles) => {
                      field.onChange(newFiles);
                      onChangeSideEffect?.(newFiles);
                    },
                  );
                  if (error) {
                    setValidationError(error);
                  } else {
                    setValidationError(null);
                  }
                }}
                className="hidden"
              />

              {/* Upload UI - varies by style */}
              {uploadStyle === "avatar" ? (
                // Avatar style - circular with centered preview
                <div className="flex flex-col items-center">
                  <div
                    onClick={() => {
                      if (!disabled) fileInputRef.current?.click();
                    }}
                    className={`relative w-32 h-32 rounded-full border-2 ${
                      hasError || validationError
                        ? getThemeClasses(
                            "border-red-500",
                            "border-red-400",
                            currentTheme,
                          )
                        : borderClass
                    } ${bgClass} cursor-pointer overflow-hidden transition-all ${hoverBorderClass} ${
                      disabled ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {fileCount > 0 && files && createPreview(files[0]) ? (
                      <img
                        src={createPreview(files[0])}
                        alt="Avatar preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full">
                        <svg
                          className={`w-12 h-12 ${iconTextClass}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                    )}
                    {fileCount > 0 && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFile(0, files, (newFiles) => {
                            field.onChange(newFiles);
                            onChangeSideEffect?.(newFiles);
                          });
                          setValidationError(null);
                        }}
                        disabled={disabled}
                        className={`absolute top-2 right-2 p-1 rounded-full ${getThemeClasses("bg-red-500 text-white", "bg-red-400 text-gray-900", currentTheme)} hover:${getThemeClasses("bg-red-600", "bg-red-300", currentTheme)} cursor-pointer transition-colors`}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                  <p className={`mt-2 text-xs ${mutedTextClass}`}>
                    {accept && `${accept}`}
                    {maxSize && ` • Max ${formatFileSize(maxSize)}`}
                  </p>
                </div>
              ) : uploadStyle === "button" ? (
                // Button style - simple button trigger
                <div className="flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      if (!disabled) fileInputRef.current?.click();
                    }}
                    disabled={disabled}
                    className={`px-4 py-2 ${bgClass} border ${
                      hasError || validationError
                        ? getThemeClasses(
                            "border-red-500",
                            "border-red-400",
                            currentTheme,
                          )
                        : borderClass
                    } ${textClass} rounded-lg ${hoverBorderClass} cursor-pointer transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      Choose File{multiple ? "s" : ""}
                    </span>
                  </button>
                  {fileCount > 0 && (
                    <div className={`text-sm ${textClass}`}>
                      {fileCount} file{fileCount > 1 ? "s" : ""} selected
                    </div>
                  )}
                </div>
              ) : (
                // Default style - full drop zone
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={(e) =>
                    handleDrop(
                      e,
                      files,
                      (newFiles) => {
                        field.onChange(newFiles);
                        onChangeSideEffect?.(newFiles);
                      },
                      setValidationError,
                    )
                  }
                  onClick={() => {
                    if (!disabled) fileInputRef.current?.click();
                  }}
                  className={`
                    relative border-2 border-dashed rounded-lg p-8
                    transition-all cursor-pointer ${bgClass}
                    ${
                      dragActive
                        ? `${dragBorderClass} ${dragBgClass}`
                        : hasError || validationError
                          ? getThemeClasses(
                              "border-red-500 bg-red-50",
                              "border-red-400 bg-red-950/20",
                              currentTheme,
                            )
                          : `${getThemeClasses("border-gray-300", "border-gray-700", currentTheme)} ${hoverBorderClass}`
                    }
                    ${disabled ? "opacity-50 cursor-not-allowed" : ""}
                  `}
                >
                  <div className="flex flex-col items-center justify-center text-center">
                    <svg
                      className={`w-12 h-12 mb-4 ${iconTextClass}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <p
                      className={`mb-2 text-sm ${getThemeClasses("text-gray-700", "text-gray-300", currentTheme)}`}
                    >
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className={`text-xs ${mutedTextClass}`}>
                      {accept && `Accepted: ${accept}`}
                      {maxSize &&
                        ` • Max size: ${formatFileSize(maxSize)} per file`}
                      {multiple && maxFiles && ` • Max ${maxFiles} files`}
                    </p>
                  </div>
                </div>
              )}

              {/* File list - only for default and button styles (avatar shows inline) */}
              {fileCount > 0 && uploadStyle !== "avatar" && (
                <div className="mt-4 space-y-2">
                  {Array.from(files!).map((file, index) => {
                    const preview = showPreview
                      ? createPreview(file)
                      : undefined;

                    return (
                      <div
                        key={index}
                        className={`flex items-center gap-3 p-3 border ${borderClass} rounded-lg ${cardBgClass}`}
                      >
                        {preview && (
                          <img
                            src={preview}
                            alt={file.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                        )}
                        {!preview && (
                          <div
                            className={`w-12 h-12 flex items-center justify-center ${iconBgClass} rounded`}
                          >
                            <svg
                              className={`w-6 h-6 ${iconTextClass}`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p
                            className={`text-sm font-medium ${textClass} truncate`}
                          >
                            {file.name}
                          </p>
                          <p className={`text-xs ${mutedTextClass}`}>
                            {formatFileSize(file.size)}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFile(index, files, (newFiles) => {
                              field.onChange(newFiles);
                              onChangeSideEffect?.(newFiles);
                            });
                            setValidationError(null);
                          }}
                          disabled={disabled}
                          className={`p-1 ${getThemeClasses("text-red-500 hover:text-red-700 hover:bg-red-100", "text-red-400 hover:text-red-300 hover:bg-red-950", currentTheme)} rounded cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {helperText && !error && !validationError && (
              <FormDescription>{helperText}</FormDescription>
            )}
            {validationError && (
              <p
                className={`text-sm font-medium ${getThemeClasses("text-red-500", "text-red-400", currentTheme)}`}
              >
                {validationError}
              </p>
            )}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
