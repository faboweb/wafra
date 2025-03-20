import { useCallback } from "react";

export function useStorage() {
  const getItem = useCallback(async <T>(key: string): Promise<T | null> => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error("Error getting item from storage", error);
      return null;
    }
  }, []);

  const setItem = useCallback(async <T>(key: string, value: T): Promise<void> => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error setting item in storage", error);
    }
  }, []);

  const removeItem = useCallback(async (key: string): Promise<void> => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing item from storage", error);
    }
  }, []);

  return {
    getItem,
    setItem,
    removeItem,
  };
} 