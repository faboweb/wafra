import { useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function useStorage() {
  const getItem = useCallback(async <T>(key: string): Promise<T | null> => {
    try {
      const item = await AsyncStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error("Error getting item from storage", error);
      return null;
    }
  }, []);

  const setItem = useCallback(async <T>(key: string, value: T): Promise<void> => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error setting item in storage", error);
    }
  }, []);

  const removeItem = useCallback(async (key: string): Promise<void> => {
    try {
      await AsyncStorage.removeItem(key);
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