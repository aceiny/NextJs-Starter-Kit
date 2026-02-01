"use client";

import { useState } from "react";
import { DataTable, type HeaderConfig } from "@/components/shared/DataTable";
import { ActionMenu } from "@/components/shared/DropdownActionMenu";
import { Button } from "@/components/ui/button";
import { EmptyState, ErrorState, LoadingState } from "@/components/state";
import { Edit, Trash2, Eye, Copy, Mail } from "lucide-react";
import { addToast } from "@heroui/react";

// ============================================================
// SAMPLE DATA
// ============================================================

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive" | "pending";
  department: string;
  joinDate: string;
  salary: number;
}

const sampleUsers: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Admin",
    status: "active",
    department: "Engineering",
    joinDate: "2023-01-15",
    salary: 95000,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "Developer",
    status: "active",
    department: "Engineering",
    joinDate: "2023-03-22",
    salary: 85000,
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    role: "Designer",
    status: "inactive",
    department: "Design",
    joinDate: "2022-11-08",
    salary: 75000,
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice.brown@example.com",
    role: "Manager",
    status: "active",
    department: "Product",
    joinDate: "2021-06-30",
    salary: 110000,
  },
  {
    id: 5,
    name: "Charlie Wilson",
    email: "charlie.wilson@example.com",
    role: "Developer",
    status: "pending",
    department: "Engineering",
    joinDate: "2024-01-10",
    salary: 80000,
  },
  {
    id: 6,
    name: "Diana Miller",
    email: "diana.miller@example.com",
    role: "QA Engineer",
    status: "active",
    department: "Quality",
    joinDate: "2023-07-19",
    salary: 72000,
  },
  {
    id: 7,
    name: "Edward Davis",
    email: "edward.davis@example.com",
    role: "DevOps",
    status: "active",
    department: "Infrastructure",
    joinDate: "2022-09-05",
    salary: 92000,
  },
  {
    id: 8,
    name: "Fiona Garcia",
    email: "fiona.garcia@example.com",
    role: "Developer",
    status: "inactive",
    department: "Engineering",
    joinDate: "2023-04-12",
    salary: 88000,
  },
];

// ============================================================
// STATUS BADGE COMPONENT
// ============================================================

function StatusBadge({
  status,
}: {
  status: "active" | "inactive" | "pending";
}) {
  const styles = {
    active:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    inactive: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
    pending:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[status]}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

// ============================================================
// HEADERS CONFIGURATION
// ============================================================

const userHeaders: HeaderConfig<User>[] = [
  {
    key: "name",
    label: "Name",
    className: "font-medium text-foreground",
    // sortable: true (default)
  },
  {
    key: "email",
    label: "Email",
    sortable: false, // Email column is not sortable
  },
  {
    key: "role",
    label: "Role",
  },
  {
    key: "department",
    label: "Department",
  },
  {
    key: "status",
    label: "Status",
    sortable: false, // Status column is not sortable
    render: (value) => <StatusBadge status={value as User["status"]} />,
  },
  {
    key: "salary",
    label: "Salary",
    align: "right",
    render: (value) => {
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(value as number);
      return <span className="font-medium">{formatted}</span>;
    },
  },
  {
    key: "joinDate",
    label: "Join Date",
    render: (value) => {
      const date = new Date(value as string);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    },
  },
];

// ============================================================
// MAIN EXAMPLE COMPONENT
// ============================================================

export function DataTableExamples() {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [showLoading, setShowLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showEmpty, setShowEmpty] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<Set<string | number>>(
    new Set(),
  );

  // Simulate loading
  const handleToggleLoading = () => {
    setShowLoading(true);
    setShowError(false);
    setShowEmpty(false);
    setTimeout(() => setShowLoading(false), 2000);
  };

  // Get display data based on state
  const displayData = showEmpty ? [] : sampleUsers;
  const paginatedData = displayData.slice(
    pageIndex * pageSize,
    (pageIndex + 1) * pageSize,
  );

  // Handle bulk actions
  const handleBulkDelete = () => {
    addToast({
      title: `Deleted ${selectedKeys.size} user(s)`,
      color: "danger",
    });
    setSelectedKeys(new Set());
  };

  const handleBulkEmail = () => {
    addToast({
      title: `Sending email to ${selectedKeys.size} user(s)`,
      color: "primary",
    });
    setSelectedKeys(new Set());
  };

  return (
    <div className="space-y-12 p-4">
      {/* Section: Full-Featured DataTable */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-2xl font-bold text-foreground">
            Full-Featured DataTable
          </h2>
        </div>
        <p className="text-muted-foreground">
          Complete data table with selection checkboxes, actions dropdown,
          sorting, and pagination. Note: Email and Status columns are not
          sortable.
        </p>

        {/* State toggle buttons */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleToggleLoading}
            disabled={showLoading}
          >
            {showLoading ? "Loading..." : "Simulate Loading"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setShowError(!showError);
              setShowEmpty(false);
            }}
          >
            {showError ? "Hide Error" : "Show Error State"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setShowEmpty(!showEmpty);
              setShowError(false);
            }}
          >
            {showEmpty ? "Show Data" : "Show Empty State"}
          </Button>

          {/* Bulk action buttons (shown when rows are selected) */}
          {selectedKeys.size > 0 && (
            <>
              <div className="h-6 w-px bg-border" />
              <Button variant="outline" size="sm" onClick={handleBulkEmail}>
                <Mail className="mr-2 h-4 w-4" />
                Email ({selectedKeys.size})
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleBulkDelete}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete ({selectedKeys.size})
              </Button>
            </>
          )}
        </div>

        {/* Main DataTable with Selection and Actions */}
        <DataTable<User>
          headers={userHeaders}
          data={paginatedData}
          title="Team Members"
          showHeader
          actionLabel="Add Member"
          onActionClick={() => addToast({ title: "Add member clicked!", color: "primary" })}
          isLoading={showLoading}
          error={showError ? new Error("Sample error") : undefined}
          errorTitle="Failed to load team members"
          errorMessage="There was a problem fetching the team data. Please try again."
          onRetry={() => setShowError(false)}
          emptyTitle="No team members"
          emptyDescription="Start by adding your first team member."
          emptyVariant="folder"
          pagination={{
            pageIndex,
            pageSize,
            totalCount: displayData.length,
            onPageChange: setPageIndex,
            onPageSizeChange: setPageSize,
          }}
          selection={{
            selectedKeys,
            onSelectionChange: setSelectedKeys,
            onRowSelect: (row, selected) => {
              console.log(
                `Row ${row.name} ${selected ? "selected" : "deselected"}`,
              );
            },
            onSelectAll: (selected, rows) => {
              console.log(
                `${selected ? "Selected" : "Deselected"} all ${rows.length} rows`,
              );
            },
          }}
          actions={{
            label: "Actions",
            width: "80px",
            render: (row) => (
              <ActionMenu
                triggerVariant="horizontal"
                placement="bottom-end"
                items={[
                  {
                    id: "view",
                    label: "View Profile",
                    icon: Eye,
                    onClick: () => addToast({ title: `Viewing ${row.name}'s profile`, color: "primary" }),
                  },
                  {
                    id: "edit",
                    label: "Edit",
                    icon: Edit,
                    onClick: () => addToast({ title: `Editing ${row.name}`, color: "primary" }),
                  },
                  {
                    id: "copy",
                    label: "Copy Email",
                    icon: Copy,
                    onClick: () => {
                      navigator.clipboard.writeText(row.email);
                      addToast({ title: "Email copied to clipboard", color: "success" });
                    },
                    showDivider: true,
                  },
                  {
                    id: "delete",
                    label: "Delete",
                    icon: Trash2,
                    variant: "destructive",
                    onClick: () => addToast({ title: `Deleted ${row.name}`, color: "danger" }),
                  },
                ]}
              />
            ),
          }}
          striped
        />
      </section>

      {/* Section: Minimal DataTable */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">Minimal Table</h2>
        <p className="text-muted-foreground">
          A simple table without header, pagination, selection, or actions.
        </p>

        <DataTable<User>
          headers={userHeaders.slice(0, 4)}
          data={sampleUsers.slice(0, 3)}
          showDenseToggle={false}
          enableSorting={false}
        />
      </section>

      {/* Section: Single Selection Mode */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">
          Single Selection Mode
        </h2>
        <p className="text-muted-foreground">
          Radio-button style selection where only one row can be selected at a
          time.
        </p>

        <SingleSelectExample />
      </section>

      {/* Section: Loading State Variants */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">
          Loading State Variants
        </h2>
        <p className="text-muted-foreground">
          Loading states with spinner, progress, and actions.
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="mb-4 text-sm font-medium text-muted-foreground">
              Default
            </h3>
            <LoadingState size="sm" />
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="mb-4 text-sm font-medium text-muted-foreground">
              With progress
            </h3>
            <LoadingState showProgress progress={45} />
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="mb-4 text-sm font-medium text-muted-foreground">
              With action
            </h3>
            <LoadingState
              title="Loading data"
              description="Fetching records..."
              action={<Button size="sm">Cancel</Button>}
            />
          </div>
        </div>
      </section>

      {/* Section: EmptyState Variants */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">
          Empty State Variants
        </h2>
        <p className="text-muted-foreground">
          Beautiful empty states with different variants and customizable
          content.
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="mb-4 text-sm font-medium text-muted-foreground">
              Default
            </h3>
            <EmptyState
              title="No items found"
              description="Your collection is empty."
              size="sm"
            />
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="mb-4 text-sm font-medium text-muted-foreground">
              Search
            </h3>
            <EmptyState
              variant="search"
              title="No results"
              description="Try adjusting your search terms."
              size="sm"
            />
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="mb-4 text-sm font-medium text-muted-foreground">
              Folder
            </h3>
            <EmptyState
              variant="folder"
              title="No files"
              description="Upload your first file to get started."
              size="sm"
            />
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="mb-4 text-sm font-medium text-muted-foreground">
              File
            </h3>
            <EmptyState
              variant="file"
              title="No documents"
              description="Create a new document to begin."
              size="sm"
            />
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="mb-4 text-sm font-medium text-muted-foreground">
              Database
            </h3>
            <EmptyState
              variant="database"
              title="No records"
              description="Add data to your database."
              size="sm"
            />
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="mb-4 text-sm font-medium text-muted-foreground">
              With Action
            </h3>
            <EmptyState
              variant="folder"
              title="No projects"
              description="Create your first project."
              size="sm"
              action={<Button size="sm">Create Project</Button>}
            />
          </div>
        </div>
      </section>

      {/* Section: ErrorState Variants */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-foreground">
          Error State Variants
        </h2>
        <p className="text-muted-foreground">
          Elegant error states with retry functionality and color-coded
          variants.
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="mb-4 text-sm font-medium text-muted-foreground">
              Default
            </h3>
            <ErrorState
              title="Something went wrong"
              message="Please try again later."
              size="sm"
              onRetry={() => addToast({ title: "Retrying...", color: "primary" })}
            />
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="mb-4 text-sm font-medium text-muted-foreground">
              Critical
            </h3>
            <ErrorState
              variant="critical"
              title="Critical error"
              message="Unable to process your request."
              size="sm"
              onRetry={() => addToast({ title: "Retrying...", color: "primary" })}
            />
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="mb-4 text-sm font-medium text-muted-foreground">
              Network
            </h3>
            <ErrorState
              variant="network"
              title="Connection lost"
              message="Check your internet connection."
              size="sm"
              onRetry={() => addToast({ title: "Retrying...", color: "primary" })}
            />
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="mb-4 text-sm font-medium text-muted-foreground">
              Server
            </h3>
            <ErrorState
              variant="server"
              title="Server error"
              message="The server is temporarily unavailable."
              size="sm"
              onRetry={() => addToast({ title: "Retrying...", color: "primary" })}
            />
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="mb-4 text-sm font-medium text-muted-foreground">
              Permission
            </h3>
            <ErrorState
              variant="permission"
              title="Access denied"
              message="You don't have permission to view this."
              size="sm"
            />
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="mb-4 text-sm font-medium text-muted-foreground">
              Custom Action
            </h3>
            <ErrorState
              variant="network"
              title="Offline mode"
              message="Some features are unavailable."
              size="sm"
              action={
                <Button size="sm" variant="outline">
                  Learn More
                </Button>
              }
            />
          </div>
        </div>
      </section>
    </div>
  );
}

// ============================================================
// SINGLE SELECT EXAMPLE COMPONENT
// ============================================================

function SingleSelectExample() {
  const [selectedKeys, setSelectedKeys] = useState<Set<string | number>>(
    new Set(),
  );

  const selectedUser = sampleUsers.find((u) => selectedKeys.has(u.id));

  return (
    <div className="space-y-4">
      {selectedUser && (
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950/50">
          <p className="text-sm text-blue-700 dark:text-blue-300">
            Selected: <strong>{selectedUser.name}</strong> ({selectedUser.email}
            )
          </p>
        </div>
      )}

      <DataTable<User>
        headers={userHeaders.slice(0, 5)}
        data={sampleUsers.slice(0, 4)}
        showDenseToggle={false}
        selection={{
          selectedKeys,
          onSelectionChange: setSelectedKeys,
          multiSelect: false,
        }}
      />
    </div>
  );
}

export default DataTableExamples;
