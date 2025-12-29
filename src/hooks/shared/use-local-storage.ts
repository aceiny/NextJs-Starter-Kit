import { useState, useCallback, useEffect } from "react";

/**
 * Options for the useLocalStorage hook
 */
export interface LocalStorageOptions {
  /**
   * Whether to override existing local storage value with initialValue
   * @default false
   */
  override?: boolean;
}

/**
 * Custom hook for working with localStorage
 * @param key The key to store/retrieve the data under
 * @param initialValue Initial value if no value is found in storage
 * @param options Configuration options for the hook
 * @returns Tuple containing [storedValue, setValue, removeValue]
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options?: LocalStorageOptions,
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
        window.localStorage.setItem(key, JSON.stringify(initialValue));
        return initialValue;
      } else {
        // Otherwise, check if there's an existing value
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      }
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        // Allow value to be a function for same API as useState
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;

        // Save state
        setStoredValue(valueToStore);

        // Save to localStorage
        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue],
  );

  // Function to remove the item from localStorage
  const removeValue = useCallback(() => {
    try {
      // Remove from localStorage
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(key);
      }
      // Reset state to initial value
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  // Listen for changes to this localStorage key from other windows/tabs
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    // Handle storage event when localStorage changes in other tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.storageArea === localStorage && e.key === key) {
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

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue] as const;
}
