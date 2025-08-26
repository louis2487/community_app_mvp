import { ExpoConfig } from "expo/config";

const config: ExpoConfig = {
  name: "community-app",
  slug: "community-app",
  scheme: "community",
  orientation: "portrait",
  runtimeVersion: { policy: "sdkVersion" },
  extra: {
    EXPO_PUBLIC_API_URL: "http://10.0.2.2:8000",
  },
  plugins: [
    "expo-router",
    "expo-secure-store",
    ["expo-notifications", { icon: "./assets/images/community_icon.png"}],
  ],
  ios: { supportsTablet: false },
  android: {
    package: "com.example.community",
    adaptiveIcon: {
      foregroundImage: "./assets/images/community_icon.png",
      backgroundColor: "#ffffff",
    },
    permissions: ["POST_NOTIFICATIONS"],
  },
  web: { bundler: "metro" },
};

export default config;
