import { ThemeToggle } from "@/components/ThemeToggle";
import { SonnerTypes, TooltipExamples } from "@/../examples";

export default function ToastExamplePage() {
  return (
    <div className="container mx-auto my-8 max-w-6xl px-4">
      {/* Page Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Toast & Tooltip
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Toast notifications and customizable tooltips
          </p>
        </div>
        <ThemeToggle variant="click-small" />
      </div>

      {/* Toast Section */}
      <section className="mb-12">
        <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
          Toast Notifications
        </h2>
        <div className="mb-4 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950/50">
          <p className="text-sm text-blue-700 dark:text-blue-300">
            📚 Powered by{" "}
            <a
              href="https://sonner.emilkowal.ski/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:no-underline"
            >
              Sonner
            </a>
            {" - "}an opinionated toast component for React
          </p>
        </div>
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg transition-colors duration-300 dark:border-gray-800 dark:bg-gray-950">
          <SonnerTypes />
        </div>
      </section>

      {/* Tooltip Section */}
      <section>
        <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
          Custom Tooltips
        </h2>
        <div className="mb-4 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950/50">
          <p className="text-sm text-blue-700 dark:text-blue-300">
            📚 Built on{" "}
            <a
              href="https://www.radix-ui.com/primitives/docs/components/tooltip"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:no-underline"
            >
              Radix UI Tooltip
            </a>{" "}
            with custom variants, sizes, and styling options
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg transition-colors duration-300 dark:border-gray-800 dark:bg-gray-950">
          <TooltipExamples />
        </div>
      </section>
    </div>
  );
}
