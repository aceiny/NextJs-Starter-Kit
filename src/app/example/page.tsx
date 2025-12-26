import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  Table2,
  MessageSquare,
  FormInput,
  LayoutGrid,
  ChevronRight,
  Menu,
} from "lucide-react";

interface ExampleCardProps {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  docPath?: string;
}

function ExampleCard({
  title,
  description,
  href,
  icon,
  docPath,
}: ExampleCardProps) {
  return (
    <Link
      href={href}
      className="group relative flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-gray-300 hover:shadow-lg dark:border-gray-800 dark:bg-gray-950 dark:hover:border-gray-700"
    >
      {/* Icon */}
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600 transition-transform duration-300 group-hover:scale-110 dark:from-gray-800 dark:to-gray-900 dark:text-gray-400">
        {icon}
      </div>

      {/* Content */}
      <div className="flex-1">
        <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-sm">
        {docPath && (
          <span className="font-mono text-xs text-gray-400 dark:text-gray-500">
            {docPath}
          </span>
        )}
        <div className="flex items-center gap-1 text-gray-400 transition-colors group-hover:text-gray-600 dark:text-gray-500 dark:group-hover:text-gray-300">
          <span>View Examples</span>
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}

const examples: ExampleCardProps[] = [
  {
    title: "DataTable & Empty/Error States",
    description:
      "Powerful data table with sorting, pagination, row selection, and actions dropdown. Includes beautiful empty and error state components.",
    href: "/example/data-table",
    icon: <Table2 className="h-6 w-6" />,
    docPath: "docs/DATA_TABLE_DOCUMENTATION.md",
  },
  {
    title: "Dialog / Modal",
    description:
      "Modal dialogs using the useDialog hook and DialogCreator component. Easy to use with full customization support.",
    href: "/example/dialog",
    icon: <LayoutGrid className="h-6 w-6" />,
    docPath: "docs/MODAL_DIALOG_DOCUMENTATION.md",
  },
  {
    title: "Toast & Tooltip",
    description:
      "Toast notifications powered by Sonner and customizable tooltips with variants, sizes, and positioning options.",
    href: "/example/toast",
    icon: <MessageSquare className="h-6 w-6" />,
  },
  {
    title: "Form System",
    description:
      "Comprehensive form components with React Hook Form integration. Includes inputs, selects, checkboxes, and file uploads.",
    href: "/example/form",
    icon: <FormInput className="h-6 w-6" />,
    docPath: "docs/FORM_SYSTEM_DOCUMENTATION.md",
  },
  {
    title: "Dropdown / Action Menu",
    description:
      "Customizable dropdown menus built on Radix UI. Supports actions, checkboxes, radio groups, submenus, and keyboard shortcuts.",
    href: "/example/dropdown",
    icon: <Menu className="h-6 w-6" />,
  },
];

export default function ExamplesPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
        <div className="container mx-auto flex items-center justify-between px-4 py-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Component Examples
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Explore the available components and their usage
            </p>
          </div>
          <ThemeToggle variant="click-small" />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Theme Togglers Quick Demo */}
        <section className="mb-12">
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
            Theme Togglers
          </h2>
          <div className="flex flex-wrap items-center gap-8 rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950">
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Click Small
              </span>
              <ThemeToggle variant="click-small" />
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Slide
              </span>
              <ThemeToggle variant="slide" />
            </div>
          </div>
        </section>

        {/* Examples Grid */}
        <section>
          <h2 className="mb-6 text-lg font-semibold text-gray-900 dark:text-gray-100">
            Component Examples
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {examples.map((example) => (
              <ExampleCard key={example.href} {...example} />
            ))}
          </div>
        </section>

        {/* Documentation Links */}
        <section className="mt-12">
          <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
            Documentation
          </h2>
          <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950">
            <ul className="space-y-3 text-sm">
              <li>
                <code className="rounded bg-gray-100 px-2 py-1 font-mono text-xs dark:bg-gray-800">
                  docs/DATA_TABLE_DOCUMENTATION.md
                </code>
                <span className="ml-2 text-gray-500 dark:text-gray-400">
                  - DataTable component documentation
                </span>
              </li>
              <li>
                <code className="rounded bg-gray-100 px-2 py-1 font-mono text-xs dark:bg-gray-800">
                  docs/MODAL_DIALOG_DOCUMENTATION.md
                </code>
                <span className="ml-2 text-gray-500 dark:text-gray-400">
                  - Dialog system documentation
                </span>
              </li>
              <li>
                <code className="rounded bg-gray-100 px-2 py-1 font-mono text-xs dark:bg-gray-800">
                  docs/FORM_SYSTEM_DOCUMENTATION.md
                </code>
                <span className="ml-2 text-gray-500 dark:text-gray-400">
                  - Form components documentation
                </span>
              </li>
              <li>
                <code className="rounded bg-gray-100 px-2 py-1 font-mono text-xs dark:bg-gray-800">
                  docs/STATE_AND_UTILITIES.md
                </code>
                <span className="ml-2 text-gray-500 dark:text-gray-400">
                  - State management and utilities
                </span>
              </li>
              <li>
                <code className="rounded bg-gray-100 px-2 py-1 font-mono text-xs dark:bg-gray-800">
                  docs/API_DOCUMENTATION.md
                </code>
                <span className="ml-2 text-gray-500 dark:text-gray-400">
                  - API client documentation
                </span>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}
