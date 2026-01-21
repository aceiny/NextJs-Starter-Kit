# 🚀 Next.js Production-Ready Starter

A comprehensive, production-ready Next.js 16 starter template with TypeScript, featuring a complete form system, state management, API clients, and dark mode support.

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2-61dafb?style=flat&logo=react)](https://react.dev/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

---

## 🧹 Fresh Start - Cleanup Script

If you want to start with a clean slate, delete all documentation and examples:

```bash
npm run cleanup
```

Or directly with bash:

```bash
bash scripts/cleanup.sh
```

This script will:

- ❌ Delete `/docs` directory
- ❌ Delete `/examples` directory
- ❌ Delete `/app/example` directory
- ✏️ Reset `app/page.tsx` to a minimal home page
- ✏️ Reset `README.md` to a basic template

**Per-directory/file confirmation:**
By default, you will be prompted before each directory or file is deleted (docs, examples, app/example, app/page.tsx, README.md). Confirm with 'y' to proceed or any other key to skip that item.

**Force mode:**
To skip all prompts and force cleanup, use:

```bash
bash scripts/cleanup.sh --force
# or
bash scripts/cleanup.sh -f
```

This will delete all targeted files and directories without any confirmation.

**Note:** This action is tracked by Git, so you can undo with `git checkout .`

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Documentation](#-documentation)
- [Examples](#-examples)
- [For Developers](#-for-developers)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 🎨 **UI & Theming**

- ✅ **Dark Mode Support** - Seamless theme switching with `next-themes`
- ✅ **Tailwind CSS v4** - Modern utility-first styling
- ✅ **shadcn/ui Integration** - Beautiful, accessible components
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Theme Toggle Component** - Multiple variants (slide & click-small)

### 📝 **Form System**

- ✅ **React Hook Form** - Performant form validation
- ✅ **13 Pre-built Components** - Input, Select, Upload, Checkbox, Radio, OTP, etc.
- ✅ **Shadcn-style OTP** - Individual character input boxes
- ✅ **Auto-floating Labels** - Smart label behavior
- ✅ **Password Toggle** - Built-in visibility control
- ✅ **Theme Support** - All components support light/dark themes

### 🎯 **Modal/Dialog System**

- ✅ **useDialog Hook** - Complete dialog state management (recommended)
- ✅ **DialogCreator Component** - Direct component usage for simple dialogs
- ✅ **Per-Button Loading** - Individual loading states for each button
- ✅ **Async Handlers** - Automatic loading during async operations
- ✅ **Three Button Types** - Cancel, Middle (optional), and Action buttons
- ✅ **Button Variants** - Multiple styles (default, destructive, outline, secondary, ghost)
- ✅ **Ripple-enabled Action Buttons** - `ActionButton` helper and `RippleButton` utility for card/dialog actions
- ✅ **Size Options** - Small, Medium, Large, Extra Large dialogs
- ✅ **Form Support** - Built-in custom form integration
- ✅ **TypeScript Support** - Full type safety with complete interfaces

### 🗄️ **State Management**

- ✅ **Zustand** - Lightweight state management
- ✅ **React Query (TanStack)** - Server state & caching
- ✅ **Persistent Storage** - Auto-save to localStorage
- ✅ **Pre-configured Stores** - Auth & UI stores ready to use

### 🌐 **API Integration**

- ✅ **Axios Clients** - Separate internal & external API clients
- ✅ **Request/Response Interceptors** - Auto-error handling
- ✅ **Cookie Support** - Session management ready
- ✅ **TypeScript Types** - Full type safety

### 📊 **DataTable Component**

- ✅ **Sortable Columns** - Click-to-sort with visual indicators
- ✅ **Pagination** - Built-in pagination with customizable page sizes
- ✅ **Row Selection** - Single or multi-select with checkboxes
- ✅ **Actions Column** - Dropdown actions for each row
- ✅ **Empty & Error States** - Beautiful placeholder states
- ✅ **Loading Skeleton** - Smooth loading experience
- ✅ **Dark Mode** - Full theme support

### 💬 **Tooltips & Toasts**

- ✅ **Custom Tooltips** - Variant-based (info, success, warning, error)
- ✅ **Multiple Sizes** - Small, medium, large options
- ✅ **Positioning** - Top, bottom, left, right with alignment
- ✅ **Toast Notifications** - Sonner-powered with promise support
- ✅ **Pre-configured Messages** - Toast message constants

### 📋 **Dropdown Menus**

- ✅ **ActionMenu Component** - Easy-to-use action dropdowns
- ✅ **Grouped Items** - Organize actions with labels
- ✅ **Checkbox & Radio** - Selection menus
- ✅ **Submenus** - Nested dropdown support
- ✅ **Keyboard Shortcuts** - Display shortcut hints
- ✅ **Destructive Actions** - Visual warning for dangerous actions

### 🔍 **Universal Filters**

- ✅ **13 Filter Types** - Text, select, multi-select, number range, date range, checkbox, radio, search, tags, and more
- ✅ **URL Synchronization** - Filters sync with URL query params
- ✅ **Two Display Modes** - Tabs mode or compact dropdown mode
- ✅ **TypeScript Support** - Fully typed filter configurations
- ✅ **Debounced Inputs** - Optimized performance for text filters
- ✅ **Theme Support** - Works seamlessly with dark mode

### 🎯 **Developer Experience**

- ✅ **TypeScript** - Full type safety throughout
- ✅ **Path Constants** - Centralized route management
- ✅ **Comprehensive Docs** - Complete documentation for all features
- ✅ **Example Routes** - Organized examples at `/example/*`

---

## 🛠️ Tech Stack

| Technology          | Purpose             | Version |
| ------------------- | ------------------- | ------- |
| **Next.js**         | React framework     | 16.0.3  |
| **React**           | UI library          | 19.2.0  |
| **TypeScript**      | Type safety         | 5.0     |
| **Tailwind CSS**    | Styling             | 4.0     |
| **React Hook Form** | Form management     | 7.66.1  |
| **Zustand**         | State management    | 5.0.8   |
| **TanStack Query**  | Server state        | 5.90.10 |
| **Axios**           | HTTP client         | 1.13.2  |
| **Zod**             | Schema validation   | 4.1.12  |
| **Sonner**          | Toast notifications | 2.0.7   |
| **next-themes**     | Theme management    | 0.4.6   |
| **shadcn/ui**       | Component library   | Latest  |
| **Lucide React**    | Icons               | 0.554.0 |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20+ and npm/yarn/pnpm
- **Git** for version control

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
# or
pnpm dev
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```bash
# External API Base URL (required)
API_URL=https://api.example.com # require for the app to run if u dont have one use a fake one to run the app or remove its use from next.config.ts

# External API Base URL (optional)
NEXT_PUBLIC_EXTERNAL_API_URL=https://api.yourdomain.com

# Add other environment variables as needed
```

4. **Run the development server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000) to see your application.

---

## 📁 Project Structure

```
├── app/                          # Next.js app directory
│   ├── layout.tsx               # Root layout with providers
│   ├── page.tsx                 # Home page
│   ├── example/                 # Example pages
│   │   ├── page.tsx             # Examples navigation hub
│   │   ├── data-table/          # DataTable examples
│   │   ├── dialog/              # Dialog examples
│   │   ├── dropdown/            # Dropdown/ActionMenu examples
│   │   ├── form/                # Form examples
│   │   └── toast/               # Toast & Tooltip examples
│   └── globals.css              # Global styles
│
├── components/
│   ├── form/                    # React Hook Form components
│   │   ├── RHFUniversalInput.tsx   # Universal input (text, password, OTP, etc.)
│   │   ├── RHFSelect.tsx           # Select dropdown
│   │   ├── RHFUpload.tsx           # File upload
│   │   ├── RHFCheckbox.tsx         # Single checkbox
│   │   ├── RHFCheckboxGroup.tsx    # Multiple checkboxes
│   │   ├── RHFSearchableCheckboxGroup.tsx
│   │   ├── RHFRadioGroup.tsx       # Radio buttons
│   │   └── ...                     # Other form components
│   │
│   ├── ui/                      # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── sonner.tsx           # Toast component
│   │   └── ...
│   │
│   ├── ActionMenu.tsx           # Dropdown action menu
│   ├── CustomTooltip.tsx        # Variant-based tooltips
│   ├── DataTable.tsx            # Full-featured data table
│   ├── DialogCreator.tsx        # Dialog component
│   ├── EmptyState.tsx           # Empty state placeholder
│   ├── ErrorState.tsx           # Error state placeholder
│   └── ThemeToggle.tsx          # Dark mode toggle
│
├── stores/                      # Zustand stores
│   ├── auth.store.ts           # Authentication state
│   ├── ui.store.ts             # UI state (sidebar, modal, notifications)
│   └── index.ts                # Central export
│
├── lib/
│   ├── http/
│   │   ├── internal-api.ts     # Internal API client (Next.js routes)
│   │   └── external-api.ts     # External API client
│   │
│   ├── utils/
│   │   └── error.utils.ts      # Error extraction utilities
│   │
│   ├── query-client.ts         # React Query client
│   └── utils.ts                # General utilities
│
├── providers/
│   ├── react-query.provider.tsx   # React Query provider
│   └── theme.provider.tsx         # Theme provider
│
├── shared/
│   └── constants/
│       ├── paths.ts            # Centralized route paths
│       └── toast-messages.ts   # Toast message constants
│
├── schema/
│   └── auth.schema.ts          # Zod validation schemas
│
├── types/
│   └── index.ts                # TypeScript type definitions
│
├── config/
│   └── query.client.config.ts  # React Query configuration
│
└── docs/                        # Comprehensive documentation
    ├── FORM_SYSTEM_DOCUMENTATION.md
    ├── MODAL_DIALOG_DOCUMENTATION.md
    ├── TOOLTIP_AND_DROPDOWN_DOCUMENTATION.md
    ├── API_DOCUMENTATION.md
    └── STATE_AND_UTILITIES.md
```

---

## 📚 Documentation

Comprehensive guides for all features:

| Documentation          | Description                                                                       | Link                                                      |
| ---------------------- | --------------------------------------------------------------------------------- | --------------------------------------------------------- | --- | ---------------------- | ------------------------------------------------------------------------------ | ------------------------------------------- | --- | --------------- | ---------------------------------------------------------------- | ---------------------------------------- |
| **Form System**        | Complete guide to all 13 form components, input types, validation, theming        | [View Docs](./docs/FORM_SYSTEM_DOCUMENTATION.md)          |
| **Modal/Dialog**       | Dialog system with per-button loading, async handlers, and customization          | [View Docs](./docs/MODAL_DIALOG_DOCUMENTATION.md)         |
| **Tooltip & Dropdown** | CustomTooltip variants, ActionMenu with groups, checkboxes, submenus              | [View Docs](./docs/TOOLTIP_AND_DROPDOWN_DOCUMENTATION.md) |     | **Charts & Analytics** | Compact ApexCharts-based sparklines and mini-bar charts with dashboard widgets | [View Docs](./docs/CHARTS_AND_ANALYTICS.md) |     | **API & Axios** | HTTP clients setup, interceptors, error handling, authentication | [View Docs](./docs/API_DOCUMENTATION.md) |
| **State & Utilities**  | Zustand stores, React Query, Toasts, Path constants                               | [View Docs](./docs/STATE_AND_UTILITIES.md)                |
| **Universal Filters**  | 13 filter types with URL sync, tabs/dropdown modes, TypeScript examples           | [View Docs](./docs/UNIVERSAL_FILTERS_DOCUMENTATION.md)    |
| **Charts & Analytics** | Sparkline, mini-bar charts, `AnalyticsWidgetSummary` and `AnalyticsCard` examples | [View Docs](./docs/CHARTS_AND_ANALYTICS.md)               |

## Custom React Hooks

### useLocalStorage

Persist and sync state with localStorage. Supports SSR, override, and cross-tab updates.

```ts
const [value, setValue, removeValue] = useLocalStorage<string>(
  "key",
  "default",
);
```

### useSessionStorage

Persist and sync state with sessionStorage. Includes utility functions for direct access.

```ts
const [value, setValue, removeValue] = useSessionStorage<number>("key", 0);
```

### useDebounce

Debounce any value or state change for smoother UX and reduced API calls.

```ts
const debounced = useDebounce(searchTerm, 300);
```

### usePagination

Universal pagination for server/client-side. Syncs with URL query params and exposes config.

```ts
const { pageIndex, pageSize, pagination } = usePagination();
```

### Quick Links

- **🎨 Form Components** - [Form System Documentation](./docs/FORM_SYSTEM_DOCUMENTATION.md)
- **🎯 Modal/Dialog** - [Modal & Dialog Documentation](./docs/MODAL_DIALOG_DOCUMENTATION.md)
- **💬 Tooltips & Dropdowns** - [Tooltip & Dropdown Documentation](./docs/TOOLTIP_AND_DROPDOWN_DOCUMENTATION.md)
- **🌐 API Calls** - [API Documentation](./docs/API_DOCUMENTATION.md)
- **🗄️ State Management** - [State & Utilities Documentation](./docs/STATE_AND_UTILITIES.md)

---

## 🎯 Examples

### Live Examples

Visit the **[/example](http://localhost:3000/example)** page for the examples hub, with links to:

| Route                                                               | Description                                            |
| ------------------------------------------------------------------- | ------------------------------------------------------ |
| **[/example/data-table](http://localhost:3000/example/data-table)** | DataTable with sorting, selection, actions, pagination |
| **[/example/dialog](http://localhost:3000/example/dialog)**         | Modal dialogs with async handlers & per-button loading |
| **[/example/dropdown](http://localhost:3000/example/dropdown)**     | ActionMenu with groups, checkboxes, radios, submenus   |
| **[/example/form](http://localhost:3000/example/form)**             | All form components - inputs, selects, uploads, OTP    |
| **[/example/toast](http://localhost:3000/example/toast)**           | Sonner toasts & custom tooltips with variants          |
| **[/example/filters](http://localhost:3000/example/filters)**       | Universal filters with URL sync, 13 filter types       |

### Feature Highlights

- ✅ **DataTable** - Sorting, pagination, row selection, actions column
- ✅ **Tooltips** - Info, success, warning, error variants with sizes
- ✅ **Dropdown Menus** - Groups, checkboxes, radios, keyboard shortcuts
- ✅ **Form Components** - Floating labels, OTP, file uploads, validation
- ✅ **Toast Notifications** - Promise-based, multiple types
- ✅ **Dark Mode** - All components support both themes

### Code Examples

#### Authentication with Zustand

```tsx
import { useAuthStore } from "@/stores";
import { internalAPI } from "@/lib/http/internal-api";
import { toast } from "sonner";

function LoginForm() {
  const { login } = useAuthStore();

  async function handleLogin(data: LoginDto) {
    try {
      const response = await internalAPI.post("/auth/login", data);
      login(response.data.user);
      toast.success("Login successful!");
    } catch (error) {
      toast.error(error);
    }
  }

  return <form onSubmit={handleLogin}>...</form>;
}
```

#### Data Fetching with React Query

```tsx
import { useQuery } from "@tanstack/react-query";
import { internalAPI } from "@/lib/http/internal-api";

function UserList() {
  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await internalAPI.get("/users");
      return response.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      {users.map((user) => (
        <UserCard user={user} />
      ))}
    </div>
  );
}
```

#### Form with Validation

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RHFUniversalInput } from "@/components/form";
import { loginSchema } from "@/schema/auth.schema";

function LoginForm() {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(loginSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RHFUniversalInput
        control={control}
        name="email"
        type="email"
        label="Email"
        placeholder="Enter your email"
      />
      <RHFUniversalInput
        control={control}
        name="password"
        type="password"
        label="Password"
        showPasswordToggle
      />
      <button type="submit">Login</button>
    </form>
  );
}
```

#### Modal/Dialog Management

```tsx
import { useDialog } from "@/hooks/useDialog";
import { toast } from "sonner";

function UserManagement() {
  const deleteDialog = useDialog({
    title: "Delete User",
    subtitle: "This action cannot be undone.",
    size: "md",
    cancelButton: {
      label: "Cancel",
    },
    actionButton: {
      label: "Delete",
      variant: "destructive",
      onClick: async () => {
        try {
          await internalAPI.delete(`/users/${userId}`);
          toast.success("User deleted successfully");
        } catch (error) {
          toast.error("Failed to delete user");
        }
      },
    },
  });

  return (
    <div>
      <button onClick={deleteDialog.openDialog} className="text-red-600">
        Delete User
      </button>
      {deleteDialog.dialog}
    </div>
  );
}
```

**Features:**

- ✅ Automatic loading state during async operations
- ✅ Per-button loading control
- ✅ Type-safe dialog configuration
- ✅ Easy to override config when opening
- ✅ Built-in form support
- ✅ Multiple button variants

**[→ Full Modal Documentation](./docs/MODAL_DIALOG_DOCUMENTATION.md)**

---

## 👨‍💻 For Developers

### Development Workflow

1. **Start development server**

   ```bash
   npm run dev
   ```

2. **View example page**
   - Navigate to [http://localhost:3000/example](http://localhost:3000/example)
   - See all form components and toasts in action

3. **Read the documentation**
   - [Form System](./docs/FORM_SYSTEM_DOCUMENTATION.md) - Learn about all form components
   - [API Integration](./docs/API_DOCUMENTATION.md) - Set up API calls
   - [State Management](./docs/STATE_AND_UTILITIES.md) - Use Zustand & React Query

4. **Build your features**
   - Use pre-built components
   - Follow the established patterns
   - Refer to examples in `/example`

### Available Scripts

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

### Adding New Features

#### Create a New Page

```tsx
// app/dashboard/page.tsx
export default function DashboardPage() {
  return <div>Dashboard</div>;
}
```

#### Create a New API Service

```typescript
// lib/services/post.service.ts
import { internalAPI } from "@/lib/http/internal-api";

export const postService = {
  async getAll() {
    const response = await internalAPI.get("/posts");
    return response.data;
  },
  // Add more methods...
};
```

#### Create a New Store

```typescript
// stores/post.store.ts
import { create } from "zustand";

export const usePostStore = create((set) => ({
  posts: [],
  setPosts: (posts) => set({ posts }),
}));
```

#### Add New Path Constants

```typescript
// shared/constants/paths.ts
export const APP_PATHS = {
  // ... existing paths
  DASHBOARD: "/dashboard",
  SETTINGS: "/settings",
};
```

---

## 🎨 Theme Toggle Component

The `ThemeToggle` component provides flexible theme switching with multiple variants.

### Basic Usage

```tsx
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Header() {
  return (
    <header>
      <ThemeToggle variant="click-small" />
    </header>
  );
}
```

### Variants

#### Click-Small (Default)

```tsx
<ThemeToggle variant="click-small" />
```

- Compact button design
- Perfect for headers/navigation
- Single click to toggle theme

#### Slide

```tsx
<ThemeToggle variant="slide" />
```

- Animated slide switch design
- More prominent visual feedback
- Great for settings pages

### Props

| Prop      | Type                       | Default         | Description        |
| --------- | -------------------------- | --------------- | ------------------ |
| `variant` | `"slide" \| "click-small"` | `"click-small"` | Theme toggle style |

### How It Works

1. Uses `next-themes` for theme management
2. Syncs across all browser tabs
3. Persists theme preference to localStorage
4. Respects system theme preference on first visit
5. Hydration-safe (prevents hydration mismatch)

### Theme-Aware Components

All form components automatically respond to theme changes:

- Text inputs, selects, textareas
- OTP input boxes
- File uploads
- Checkboxes and radio groups
- Labels and error messages
- Editor with syntax highlighting on links

### Customizing Themes

Edit your Tailwind config to customize light/dark mode colors:

```javascript
// tailwind.config.js
export default {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Custom colors for light mode
        // Custom colors for dark mode
      },
    },
  },
};
```

### Programmatic Theme Control

```tsx
import { useTheme } from "next-themes";

export function ThemeController() {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      Current theme: {theme}
      <button onClick={() => setTheme("light")}>Light</button>
      <button onClick={() => setTheme("dark")}>Dark</button>
    </div>
  );
}
```

---

## 🤝 Contributing

Contributions are welcome! If you'd like to improve this starter template:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add some amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

---

## 📖 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Hook Form](https://react-hook-form.com/)
- [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [TanStack Query](https://tanstack.com/query/latest)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)

---

## ⭐ Star This Project

If you find this starter helpful, please consider giving it a star on GitHub! It helps others discover this template.

**[⭐ Star on GitHub](https://github.com/aceiny/NextJs-Starter-Kit)**

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing framework
- **shadcn** - For the beautiful component library
- **TanStack** - For React Query
- **Sonner** - For beautiful toasts

---

**Built with ❤️ by developers, for developers**

**Ready to start building?** [View Examples →](http://localhost:3000/example)
