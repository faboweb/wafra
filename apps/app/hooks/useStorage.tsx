import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

type StorageType = {
  getItem: (key: string) => Promise<string | null>;
  setItem: (key: string, value: string) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
};

const webStorage: StorageType = {
  getItem: async (key: string) => localStorage.getItem(key),
  setItem: async (key: string, value: string) =>
    localStorage.setItem(key, value),
  removeItem: async (key: string) => localStorage.removeItem(key),
};

const nativeStorage: StorageType = AsyncStorage;

export const useStorage = () => {
  const storage = Platform.OS === "web" ? webStorage : nativeStorage;

  return {
    getItem: async <T,>(key: string): Promise<T | null> => {
      const item = await storage.getItem(key);
      return item ? JSON.parse(item) : null;
    },
    setItem: async <T,>(key: string, value: T): Promise<void> => {
      await storage.setItem(key, JSON.stringify(value));
    },
    removeItem: async (key: string): Promise<void> => {
      await storage.removeItem(key);
    },
  };
};
