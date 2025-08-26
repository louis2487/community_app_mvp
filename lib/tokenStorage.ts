import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const KEY = "token";

export const tokenStorage = {
  get: async (): Promise<string | null> => {
    if (Platform.OS === "web") {
      try {
        return window.localStorage.getItem(KEY);
      } catch { return null; }
    }
    return await SecureStore.getItemAsync(KEY);
  },
  set: async (value: string) => {
    if (Platform.OS === "web") {
      window.localStorage.setItem(KEY, value);
      return;
    }
    await SecureStore.setItemAsync(KEY, value);
  },
  del: async () => {
    if (Platform.OS === "web") {
      window.localStorage.removeItem(KEY);
      return;
    }
    await SecureStore.deleteItemAsync(KEY);
  },
};
