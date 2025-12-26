import { ThemeToggle } from "@/components/ThemeToggle";
import { DataTableExamples } from "@/../examples";

export default function DataTableExamplePage() {
  return (
    <div className="container mx-auto my-8 max-w-6xl px-4">
      {/* Page Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            DataTable Component
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Powerful data table with sorting, pagination, selection, and actions
          </p>
        </div>
        <ThemeToggle variant="click-small" />
      </div>

      {/* Documentation Link */}
      <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950/50">
        <p className="text-sm text-blue-700 dark:text-blue-300">
          📚 See{" "}
          <code className="rounded bg-blue-100 px-1.5 py-0.5 font-mono text-xs dark:bg-blue-900">
            docs/DATA_TABLE_DOCUMENTATION.md
          </code>{" "}
          for full documentation
        </p>
      </div>

      {/* Examples */}
      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg transition-colors duration-300 dark:border-gray-800 dark:bg-gray-950">
        <DataTableExamples />
      </section>
    </div>
  );
}
