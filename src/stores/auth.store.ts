import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

/* ----------------------------------------------------
  Types & Interfaces
---------------------------------------------------- */

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthActions {
  setUser: (user: User | null) => void;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  setLoading: (loading: boolean) => void;
}

type AuthStore = AuthState & AuthActions;

/* ----------------------------------------------------
  Initial State
---------------------------------------------------- */

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
};

/* ----------------------------------------------------
  Zustand Store
---------------------------------------------------- */

/**
 * Authentication store with persistent storage
 * Manages user authentication state across the application
 *
 * @example
 * ```tsx
 * import { useAuthStore } from '@/stores/auth.store';
 *
 * function Component() {
 *   const { user, login, logout } = useAuthStore();
 *
 *   const handleLogin = async () => {
 *     const userData = await apiLogin();
 *     login(userData);
 *   };
 *
 *   return <div>{user?.name}</div>;
 * }
 * ```
 */
export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      ...initialState,

      /**
       * Set user data directly
       */
      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user,
        }),

      /**
       * Login user and update authentication state
       */
      login: (user) =>
        set({
          user,
          isAuthenticated: true,
          isLoading: false,
        }),

      /**
       * Logout user and clear state
       */
      logout: () =>
        set({
          ...initialState,
        }),

      /**
       * Update specific user fields
       */
      updateUser: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),

      /**
       * Set loading state
       */
      setLoading: (loading) =>
        set({
          isLoading: loading,
        }),
    }),
    {
      name: "auth-storage", // LocalStorage key
      storage: createJSONStorage(() => localStorage),
      // Optionally, you can whitelist/blacklist specific fields
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        // Don't persist isLoading
      }),
    },
  ),
);

/* ----------------------------------------------------
  Selectors (Optional - for better performance)
---------------------------------------------------- */

/**
 * Select only the user from the store
 * Prevents unnecessary re-renders when other auth state changes
 */
export const selectUser = (state: AuthStore) => state.user;

/**
 * Select only the authentication status
 */
export const selectIsAuthenticated = (state: AuthStore) =>
  state.isAuthenticated;

/**
 * Select only the loading state
 */
export const selectIsLoading = (state: AuthStore) => state.isLoading;
