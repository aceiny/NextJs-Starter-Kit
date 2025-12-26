"use client";

import * as React from "react";
import { useState, useMemo, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import {
  EmptyState,
  type EmptyStateVariant,
} from "@/components/ui/empty-state";
import {
  ErrorState,
  type ErrorStateVariant,
} from "@/components/ui/error-state";
import {
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

// ============================================================
// TYPES
// ============================================================

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface HeaderConfig<T = any> {
  /** Display label for the column header */
  label: string;
  /** Key to extract data from the row object (supports nested keys with dot notation) */
  key: string;
  /** Custom render function for cell content */
  render?: (value: unknown, row: T) => React.ReactNode;
  /** Additional className for the column cells */
  className?: string;
  /** Additional className for the header cell */
  headerClassName?: string;
  /** Whether this column is sortable (default: follows table's enableSorting) */
  sortable?: boolean;
  /** Column width (e.g., "100px", "10%") */
  width?: string;
  /** Text alignment */
  align?: "left" | "center" | "right";
}

export interface PaginationConfig {
  /** Current page index (0-based) */
  pageIndex: number;
  /** Number of items per page */
  pageSize: number;
  /** Total number of items */
  totalCount: number;
  /** Available page size options */
  pageSizeOptions?: number[];
  /** Callback when page changes */
  onPageChange: (pageIndex: number) => void;
  /** Callback when page size changes */
  onPageSizeChange?: (pageSize: number) => void;
}

interface SortConfig {
  key: string;
  direction: "asc" | "desc";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ActionsConfig<T = any> {
  /** Render function for the actions cell */
  render: (row: T) => React.ReactNode;
  /** Column header label (default: "Actions") */
  label?: string;
  /** Column width */
  width?: string;
  /** Additional className */
  className?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface SelectionConfig<T = any> {
  /** Currently selected row keys */
  selectedKeys: Set<string | number>;
  /** Callback when selection changes */
  onSelectionChange: (selectedKeys: Set<string | number>) => void;
  /** Callback when a single row is selected/deselected */
  onRowSelect?: (row: T, selected: boolean) => void;
  /** Callback when all rows are selected/deselected */
  onSelectAll?: (selected: boolean, rows: T[]) => void;
  /** Whether to allow multi-selection (default: true) */
  multiSelect?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface DataTableProps<T extends object = any> {
  /** Column configuration */
  headers: HeaderConfig<T>[];
  /** Data array to display */
  data: T[];
  /** Optional key field for row identification (defaults to "id") */
  keyField?: keyof T;
  /** Optional title for the table */
  title?: string;
  /** Show the header section with title and action button */
  showHeader?: boolean;
  /** Optional action button label */
  actionLabel?: string;
  /** Callback when action button is clicked */
  onActionClick?: () => void;
  /** Callback when a row is clicked */
  onRowClick?: (row: T) => void;
  /** Loading state */
  isLoading?: boolean;
  /** Error state (any truthy value triggers error display) */
  error?: unknown;
  /** Error state variant */
  errorVariant?: ErrorStateVariant;
  /** Custom error title */
  errorTitle?: string;
  /** Custom error message */
  errorMessage?: string;
  /** Retry callback for error state */
  onRetry?: () => void;
  /** Empty state variant */
  emptyVariant?: EmptyStateVariant;
  /** Custom empty state title */
  emptyTitle?: string;
  /** Custom empty state description */
  emptyDescription?: string;
  /** Number of skeleton rows to show during loading */
  skeletonRows?: number;
  /** Show dense mode toggle */
  showDenseToggle?: boolean;
  /** Pagination configuration */
  pagination?: PaginationConfig;
  /** Enable client-side sorting (default: true) */
  enableSorting?: boolean;
  /** Controlled sort configuration */
  sortConfig?: SortConfig;
  /** Callback when sort changes (for controlled sorting) */
  onSortChange?: (sortConfig: SortConfig | undefined) => void;
  /** Additional className for the table container */
  className?: string;
  /** Whether to stripe alternate rows */
  striped?: boolean;
  /** Whether rows should highlight on hover */
  hoverable?: boolean;
  /** Actions column configuration */
  actions?: ActionsConfig<T>;
  /** Selection configuration for row checkboxes */
  selection?: SelectionConfig<T>;
}

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Get a nested value from an object using dot notation
 * e.g., getNestedValue({ user: { name: "John" } }, "user.name") => "John"
 */
function getNestedValue(obj: object, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, part) => {
    if (acc && typeof acc === "object" && part in acc) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (acc as any)[part];
    }
    return undefined;
  }, obj);
}

/**
 * Compare two values for sorting
 */
function compareValues(
  a: unknown,
  b: unknown,
  direction: "asc" | "desc",
): number {
  // Handle null/undefined
  if (a == null && b == null) return 0;
  if (a == null) return direction === "asc" ? 1 : -1;
  if (b == null) return direction === "asc" ? -1 : 1;

  // Handle numbers
  if (typeof a === "number" && typeof b === "number") {
    return direction === "asc" ? a - b : b - a;
  }

  // Handle dates
  if (a instanceof Date && b instanceof Date) {
    return direction === "asc"
      ? a.getTime() - b.getTime()
      : b.getTime() - a.getTime();
  }

  // Handle strings
  const strA = String(a).toLowerCase();
  const strB = String(b).toLowerCase();
  const comparison = strA.localeCompare(strB);
  return direction === "asc" ? comparison : -comparison;
}

// ============================================================
// SORTABLE HEADER BUTTON COMPONENT
// ============================================================

interface SortableHeaderProps {
  label: string;
  sortKey: string;
  sortable: boolean;
  sortConfig: SortConfig | undefined;
  onSort: (key: string) => void;
  align?: "left" | "center" | "right";
  className?: string;
}

function SortableHeader({
  label,
  sortKey,
  sortable,
  sortConfig,
  onSort,
  align = "left",
  className,
}: SortableHeaderProps) {
  const isSorted = sortConfig?.key === sortKey;
  const direction = sortConfig?.direction;

  const getSortIcon = () => {
    if (!sortable) return null;

    if (!isSorted) {
      return (
        <ChevronsUpDown className="h-3.5 w-3.5 text-muted-foreground/50" />
      );
    }

    return direction === "asc" ? (
      <ChevronUp className="h-3.5 w-3.5" />
    ) : (
      <ChevronDown className="h-3.5 w-3.5" />
    );
  };

  const alignmentClasses = {
    left: "justify-start text-left",
    center: "justify-center text-center",
    right: "justify-end text-right",
  };

  if (!sortable) {
    return (
      <div
        className={cn(
          "flex items-center gap-1.5",
          alignmentClasses[align],
          className,
        )}
      >
        <span className="font-semibold">{label}</span>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onSort(sortKey)}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-2 py-1 -mx-2 -my-1",
        "font-semibold text-sm",
        "hover:bg-muted/80 dark:hover:bg-muted/50",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
        "transition-colors duration-150",
        "select-none",
        isSorted && "text-foreground",
        !isSorted && "text-muted-foreground hover:text-foreground",
        alignmentClasses[align],
        className,
      )}
    >
      <span>{label}</span>
      {getSortIcon()}
    </button>
  );
}

// ============================================================
// PAGINATION COMPONENT
// ============================================================

interface TablePaginationProps {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  pageSizeOptions: number[];
  onPageChange: (pageIndex: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  selectedCount?: number;
}

function TablePagination({
  pageIndex,
  pageSize,
  totalCount,
  pageSizeOptions,
  onPageChange,
  onPageSizeChange,
  selectedCount,
}: TablePaginationProps) {
  const totalPages = Math.ceil(totalCount / pageSize);
  const startItem = pageIndex * pageSize + 1;
  const endItem = Math.min((pageIndex + 1) * pageSize, totalCount);

  const canGoPrevious = pageIndex > 0;
  const canGoNext = pageIndex < totalPages - 1;

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 text-sm">
      {/* Selection count and Items per page */}
      <div className="flex items-center gap-4">
        {selectedCount !== undefined && selectedCount > 0 && (
          <span className="text-muted-foreground">
            {selectedCount} row{selectedCount !== 1 ? "s" : ""} selected
          </span>
        )}
        {onPageSizeChange && (
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Rows per page:</span>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="h-8 rounded-md border border-input bg-background px-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Page info */}
      <span className="text-muted-foreground">
        {totalCount > 0 ? (
          <>
            {startItem}-{endItem} of {totalCount}
          </>
        ) : (
          "0 items"
        )}
      </span>

      {/* Navigation buttons */}
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="icon-sm"
          onClick={() => onPageChange(0)}
          disabled={!canGoPrevious}
          aria-label="First page"
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon-sm"
          onClick={() => onPageChange(pageIndex - 1)}
          disabled={!canGoPrevious}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="mx-2 text-muted-foreground">
          Page {pageIndex + 1} of {totalPages || 1}
        </span>
        <Button
          variant="outline"
          size="icon-sm"
          onClick={() => onPageChange(pageIndex + 1)}
          disabled={!canGoNext}
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon-sm"
          onClick={() => onPageChange(totalPages - 1)}
          disabled={!canGoNext}
          aria-label="Last page"
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function DataTable<T extends object = any>({
  headers,
  data,
  keyField = "id" as keyof T,
  title,
  showHeader = false,
  actionLabel,
  onActionClick,
  onRowClick,
  isLoading = false,
  error,
  errorVariant = "default",
  errorTitle = "Failed to load data",
  errorMessage = "An error occurred while loading the table data.",
  onRetry,
  emptyVariant = "default",
  emptyTitle = "No data found",
  emptyDescription = "There's no data to display at the moment.",
  skeletonRows = 5,
  showDenseToggle = true,
  pagination,
  enableSorting = true,
  sortConfig: controlledSortConfig,
  onSortChange,
  className,
  striped = false,
  hoverable = true,
  actions,
  selection,
}: DataTableProps<T>) {
  const [dense, setDense] = useState(false);
  const [internalSortConfig, setInternalSortConfig] = useState<
    SortConfig | undefined
  >();

  // Use controlled or internal sort config
  const sortConfig = controlledSortConfig ?? internalSortConfig;
  const setSortConfig = onSortChange ?? setInternalSortConfig;

  // Handle sort click
  const handleSortClick = useCallback(
    (key: string) => {
      if (!enableSorting) return;

      let direction: "asc" | "desc" = "asc";

      if (sortConfig?.key === key) {
        if (sortConfig.direction === "asc") {
          direction = "desc";
        } else {
          // Third click clears sorting
          setSortConfig(undefined);
          return;
        }
      }

      setSortConfig({ key, direction });
    },
    [enableSorting, sortConfig, setSortConfig],
  );

  // Sort data (client-side)
  const sortedData = useMemo(() => {
    if (!sortConfig || !enableSorting) return data;

    return [...data].sort((a, b) => {
      const aValue = getNestedValue(a, sortConfig.key);
      const bValue = getNestedValue(b, sortConfig.key);
      return compareValues(aValue, bValue, sortConfig.direction);
    });
  }, [data, sortConfig, enableSorting]);

  // Get row key helper
  const getRowKey = useCallback(
    (row: T, index: number): string | number => {
      const key = row[keyField];
      return key != null ? (key as string | number) : index;
    },
    [keyField],
  );

  // Selection handlers
  const isAllSelected = useMemo(() => {
    if (!selection || sortedData.length === 0) return false;
    return sortedData.every((row, index) => {
      const key = getRowKey(row, index);
      return selection.selectedKeys.has(key);
    });
  }, [selection, sortedData, getRowKey]);

  const isSomeSelected = useMemo(() => {
    if (!selection || sortedData.length === 0) return false;
    const count = sortedData.filter((row, index) => {
      const key = getRowKey(row, index);
      return selection.selectedKeys.has(key);
    }).length;
    return count > 0 && count < sortedData.length;
  }, [selection, sortedData, getRowKey]);

  const handleSelectAll = useCallback(
    (checked: boolean) => {
      if (!selection) return;

      const newSelectedKeys = new Set(selection.selectedKeys);

      if (checked) {
        sortedData.forEach((row, index) => {
          const key = getRowKey(row, index);
          newSelectedKeys.add(key);
        });
      } else {
        sortedData.forEach((row, index) => {
          const key = getRowKey(row, index);
          newSelectedKeys.delete(key);
        });
      }

      selection.onSelectionChange(newSelectedKeys);
      selection.onSelectAll?.(checked, sortedData);
    },
    [selection, sortedData, getRowKey],
  );

  const handleRowSelect = useCallback(
    (row: T, index: number, checked: boolean) => {
      if (!selection) return;

      const key = getRowKey(row, index);
      const newSelectedKeys = new Set(selection.selectedKeys);

      if (selection.multiSelect === false) {
        // Single select mode
        newSelectedKeys.clear();
        if (checked) {
          newSelectedKeys.add(key);
        }
      } else {
        // Multi select mode
        if (checked) {
          newSelectedKeys.add(key);
        } else {
          newSelectedKeys.delete(key);
        }
      }

      selection.onSelectionChange(newSelectedKeys);
      selection.onRowSelect?.(row, checked);
    },
    [selection, getRowKey],
  );

  // Calculate total columns including selection and actions
  const totalColumns = useMemo(() => {
    let count = headers.length;
    if (selection) count += 1;
    if (actions) count += 1;
    return count;
  }, [headers.length, selection, actions]);

  // Cell padding classes based on dense mode
  const cellPadding = dense ? "px-3 py-2" : "px-4 py-3";

  // Error state
  if (error) {
    return (
      <div
        className={cn(
          "overflow-hidden rounded-lg border border-border bg-card shadow-sm",
          className,
        )}
      >
        {showHeader && (
          <div className="flex items-center justify-between border-b border-border bg-muted/30 px-4 py-3">
            {title && (
              <h3 className="text-sm font-semibold text-foreground">{title}</h3>
            )}
            {actionLabel && (
              <Button size="sm" onClick={onActionClick}>
                {actionLabel}
              </Button>
            )}
          </div>
        )}
        <div className="p-6">
          <ErrorState
            variant={errorVariant}
            title={errorTitle}
            message={errorMessage}
            onRetry={onRetry}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "overflow-hidden rounded-lg border border-border bg-card shadow-sm",
        className,
      )}
    >
      {/* Header section */}
      {showHeader && (
        <div className="flex items-center justify-between border-b border-border bg-muted/30 px-4 py-3">
          <div className="flex items-center gap-3">
            {title && (
              <h3 className="text-sm font-semibold text-foreground">{title}</h3>
            )}
            {selection && selection.selectedKeys.size > 0 && (
              <span className="text-sm text-muted-foreground">
                ({selection.selectedKeys.size} selected)
              </span>
            )}
          </div>
          {actionLabel && (
            <Button size="sm" onClick={onActionClick}>
              {actionLabel}
            </Button>
          )}
        </div>
      )}

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            {/* Selection checkbox header */}
            {selection && (
              <TableHead
                className={cn("w-[50px] whitespace-nowrap", cellPadding)}
              >
                {selection.multiSelect !== false && (
                  <Checkbox
                    checked={isAllSelected}
                    indeterminate={isSomeSelected}
                    onCheckedChange={handleSelectAll}
                    aria-label="Select all"
                    className="translate-y-0.5"
                  />
                )}
              </TableHead>
            )}

            {/* Data headers */}
            {headers.map((header) => {
              const isSortable = enableSorting && header.sortable !== false;

              return (
                <TableHead
                  key={header.key}
                  style={{ width: header.width }}
                  className={cn(
                    "whitespace-nowrap",
                    cellPadding,
                    header.headerClassName,
                  )}
                >
                  <SortableHeader
                    label={header.label}
                    sortKey={header.key}
                    sortable={isSortable}
                    sortConfig={sortConfig}
                    onSort={handleSortClick}
                    align={header.align}
                  />
                </TableHead>
              );
            })}

            {/* Actions header */}
            {actions && (
              <TableHead
                style={{ width: actions.width ?? "100px" }}
                className={cn(
                  "whitespace-nowrap text-right",
                  cellPadding,
                  actions.className,
                )}
              >
                <span className="font-semibold">
                  {actions.label ?? "Actions"}
                </span>
              </TableHead>
            )}
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading ? (
            // Skeleton loading rows
            Array.from({ length: skeletonRows }, (_, index) => (
              <TableRow key={`skeleton-${index}`}>
                {selection && (
                  <TableCell className={cn("whitespace-nowrap", cellPadding)}>
                    <div className="h-4 w-4 animate-pulse rounded bg-muted" />
                  </TableCell>
                )}
                {headers.map((header) => (
                  <TableCell
                    key={header.key}
                    className={cn(
                      "whitespace-nowrap",
                      cellPadding,
                      header.className,
                    )}
                  >
                    <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
                  </TableCell>
                ))}
                {actions && (
                  <TableCell
                    className={cn("whitespace-nowrap text-right", cellPadding)}
                  >
                    <div className="ml-auto h-8 w-8 animate-pulse rounded bg-muted" />
                  </TableCell>
                )}
              </TableRow>
            ))
          ) : sortedData.length > 0 ? (
            // Data rows
            sortedData.map((row, index) => {
              const rowKey = getRowKey(row, index);
              const isSelected = selection?.selectedKeys.has(rowKey) ?? false;

              return (
                <TableRow
                  key={String(rowKey)}
                  onClick={() => onRowClick?.(row)}
                  data-state={isSelected ? "selected" : undefined}
                  className={cn(
                    onRowClick && "cursor-pointer",
                    hoverable && "hover:bg-muted/50",
                    striped && index % 2 === 1 && "bg-muted/20",
                    isSelected && "bg-muted/60",
                  )}
                >
                  {/* Selection checkbox */}
                  {selection && (
                    <TableCell
                      className={cn("whitespace-nowrap", cellPadding)}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={(checked) =>
                          handleRowSelect(row, index, checked as boolean)
                        }
                        aria-label={`Select row ${index + 1}`}
                        className="translate-y-[2px]"
                      />
                    </TableCell>
                  )}

                  {/* Data cells */}
                  {headers.map((header) => {
                    const value = getNestedValue(row, header.key);
                    const alignmentClass =
                      header.align === "center"
                        ? "text-center"
                        : header.align === "right"
                          ? "text-right"
                          : "text-left";

                    return (
                      <TableCell
                        key={header.key}
                        className={cn(
                          "whitespace-nowrap",
                          cellPadding,
                          alignmentClass,
                          header.className,
                        )}
                      >
                        {header.render
                          ? header.render(value, row)
                          : value != null
                            ? String(value)
                            : "-"}
                      </TableCell>
                    );
                  })}

                  {/* Actions cell */}
                  {actions && (
                    <TableCell
                      className={cn(
                        "whitespace-nowrap text-right",
                        cellPadding,
                        actions.className,
                      )}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {actions.render(row)}
                    </TableCell>
                  )}
                </TableRow>
              );
            })
          ) : (
            // Empty state
            <TableRow>
              <TableCell colSpan={totalColumns} className="p-0">
                <EmptyState
                  variant={emptyVariant}
                  title={emptyTitle}
                  description={emptyDescription}
                />
              </TableCell>
            </TableRow>
          )}
        </TableBody>

        {/* Footer with pagination and dense toggle */}
        {(showDenseToggle || pagination) && (
          <TableFooter className="bg-muted/30">
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={totalColumns} className="px-4 py-3">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  {/* Dense toggle */}
                  {showDenseToggle && (
                    <div className="flex items-center gap-2">
                      <Switch
                        id="dense-mode"
                        checked={dense}
                        onCheckedChange={setDense}
                      />
                      <label
                        htmlFor="dense-mode"
                        className="text-sm text-muted-foreground cursor-pointer"
                      >
                        Compact view
                      </label>
                    </div>
                  )}

                  {/* Pagination */}
                  {pagination && (
                    <TablePagination
                      pageIndex={pagination.pageIndex}
                      pageSize={pagination.pageSize}
                      totalCount={pagination.totalCount}
                      pageSizeOptions={
                        pagination.pageSizeOptions ?? [10, 25, 50, 100]
                      }
                      onPageChange={pagination.onPageChange}
                      onPageSizeChange={pagination.onPageSizeChange}
                      selectedCount={selection?.selectedKeys.size}
                    />
                  )}
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </div>
  );
}

export default DataTable;
