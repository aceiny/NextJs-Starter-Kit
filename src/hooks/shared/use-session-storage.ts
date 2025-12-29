import { useState, useCallback, useEffect } from "react";

/**
 * Options for the useSessionStorage hook
 */
export interface SessionStorageOptions {
  /**
   * Whether to override existing session storage value with initialValue
   * @default false
   */
  override?: boolean;
}

/**
 * Custom hook for working with sessionStorage
 * @param key The key to store/retrieve the data under
 * @param initialValue Initial value if no value is found in storage
 * @param options Configuration options for the hook
 * @returns Tuple containing [storedValue, setValue, removeValue]
 */
export function useSessionStorage<T>(
  key: string,
  initialValue: T,
  options?: SessionStorageOptions,
) {
  const { override = false } = options || {};

  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      // If override is true, always use the initialValue
      if (override) {
        window.sessionStorage.setItem(key, JSON.stringify(initialValue));
        return initialValue;
      } else {
        // Otherwise, check if there's an existing value
        const item = window.sessionStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      }
    } catch (error) {
      console.error(`Error reading sessionStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists the new value to sessionStorage
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        // Allow value to be a function for same API as useState
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;

        // Save state
        setStoredValue(valueToStore);

        // Save to sessionStorage
        if (typeof window !== "undefined") {
          window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        console.error(`Error setting sessionStorage key "${key}":`, error);
      }
    },
    [key, storedValue],
  );

  // Function to remove the item from sessionStorage
  const removeValue = useCallback(() => {
    try {
      // Remove from sessionStorage
      if (typeof window !== "undefined") {
        window.sessionStorage.removeItem(key);
      }
      // Reset state to initial value
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Error removing sessionStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  // Listen for changes to this sessionStorage key from other windows/tabs
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    // Handle storage event when sessionStorage changes in other tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.storageArea === sessionStorage && e.key === key) {
        try {
          const newValue = e.newValue ? JSON.parse(e.newValue) : initialValue;
          setStoredValue(newValue);
        } catch (error) {
          console.error(
            `Error parsing storage change for key "${key}":`,
            error,
          );
        }
      }
    };

    // Add event listener
    window.addEventListener("storage", handleStorageChange);

    // Cleanup
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue] as const;
}

/**
 * Utility functions for working with sessionStorage without React hooks
 */
export const sessionStorageUtils = {
  /**
   * Set an item in sessionStorage
   * @param key Storage key
   * @param value Value to store
   */
  setItem: <T>(key: string, value: T): void => {
    try {
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error(`Error setting sessionStorage key "${key}":`, error);
    }
  },

  /**
   * Get an item from sessionStorage
   * @param key Storage key
   * @param defaultValue Default value if key doesn't exist
   * @param options Additional options for getting the item
   * @returns The stored value or defaultValue
   */
  getItem: <T>(
    key: string,
    defaultValue: T,
    options?: { override?: boolean },
  ): T => {
    try {
      if (typeof window !== "undefined") {
        if (options?.override) {
          window.sessionStorage.setItem(key, JSON.stringify(defaultValue));
          return defaultValue;
        }
        const item = window.sessionStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
      }
      return defaultValue;
    } catch (error) {
      console.error(`Error getting sessionStorage key "${key}":`, error);
      return defaultValue;
    }
  },

  /**
   * Set an item in sessionStorage, overriding any existing value
   * @param key Storage key
   * @param value Value to store
   */
  setWithOverride: <T>(key: string, value: T): void => {
    try {
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error(
        `Error setting sessionStorage key "${key}" with override:`,
        error,
      );
    }
  },

  /**
   * Remove an item from sessionStorage
   * @param key Storage key
   */
  removeItem: (key: string): void => {
    try {
      if (typeof window !== "undefined") {
        window.sessionStorage.removeItem(key);
      }
    } catch (error) {
      console.error(`Error removing sessionStorage key "${key}":`, error);
    }
  },

  /**
   * Clear all sessionStorage items
   */
  clear: (): void => {
    try {
      if (typeof window !== "undefined") {
        window.sessionStorage.clear();
      }
    } catch (error) {
      console.error("Error clearing sessionStorage:", error);
    }
  },

  /**
   * Check if a key exists in sessionStorage
   * @param key Storage key
   * @returns Boolean indicating if key exists
   */
  hasItem: (key: string): boolean => {
    try {
      if (typeof window !== "undefined") {
        return window.sessionStorage.getItem(key) !== null;
      }
      return false;
    } catch (error) {
      console.error(`Error checking sessionStorage key "${key}":`, error);
      return false;
    }
  },
};
