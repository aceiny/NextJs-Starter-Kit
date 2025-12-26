import { create } from "zustand";

/* ----------------------------------------------------
  Types & Interfaces
---------------------------------------------------- */

interface UIState {
  isSidebarOpen: boolean;
  isModalOpen: boolean;
  modalContent: React.ReactNode | null;
  notifications: number;
}

interface UIActions {
  toggleSidebar: () => void;
  openSidebar: () => void;
  closeSidebar: () => void;
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
  setNotifications: (count: number) => void;
  incrementNotifications: () => void;
  clearNotifications: () => void;
}

type UIStore = UIState & UIActions;

/* ----------------------------------------------------
  Initial State
---------------------------------------------------- */

const initialState: UIState = {
  isSidebarOpen: true,
  isModalOpen: false,
  modalContent: null,
  notifications: 0,
};

/* ----------------------------------------------------
  Zustand Store
---------------------------------------------------- */

/**
 * UI state management store
 * Manages application-wide UI states like sidebars, modals, notifications
 *
 * @example
 * ```tsx
 * import { useUIStore } from '@/stores/ui.store';
 *
 * function Sidebar() {
 *   const { isSidebarOpen, toggleSidebar } = useUIStore();
 *
 *   return (
 *     <aside className={isSidebarOpen ? 'open' : 'closed'}>
 *       <button onClick={toggleSidebar}>Toggle</button>
 *     </aside>
 *   );
 * }
 * ```
 */
export const useUIStore = create<UIStore>()((set) => ({
  ...initialState,

  /**
   * Toggle sidebar open/closed
   */
  toggleSidebar: () =>
    set((state) => ({
      isSidebarOpen: !state.isSidebarOpen,
    })),

  /**
   * Open sidebar
   */
  openSidebar: () =>
    set({
      isSidebarOpen: true,
    }),

  /**
   * Close sidebar
   */
  closeSidebar: () =>
    set({
      isSidebarOpen: false,
    }),

  /**
   * Open modal with content
   */
  openModal: (content) =>
    set({
      isModalOpen: true,
      modalContent: content,
    }),

  /**
   * Close modal and clear content
   */
  closeModal: () =>
    set({
      isModalOpen: false,
      modalContent: null,
    }),

  /**
   * Set notification count
   */
  setNotifications: (count) =>
    set({
      notifications: count,
    }),

  /**
   * Increment notification count by 1
   */
  incrementNotifications: () =>
    set((state) => ({
      notifications: state.notifications + 1,
    })),

  /**
   * Clear all notifications
   */
  clearNotifications: () =>
    set({
      notifications: 0,
    }),
}));

/* ----------------------------------------------------
  Selectors (Optional - for better performance)
---------------------------------------------------- */

/**
 * Select only the sidebar state
 */
export const selectIsSidebarOpen = (state: UIStore) => state.isSidebarOpen;

/**
 * Select only the modal state
 */
export const selectModalState = (state: UIStore) => ({
  isOpen: state.isModalOpen,
  content: state.modalContent,
});

/**
 * Select only the notifications count
 */
export const selectNotifications = (state: UIStore) => state.notifications;
