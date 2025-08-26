import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "./store";
export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const token = useSelector((state: RootState) => state.auth.token);
      if (token) {
        router.replace("/");            
      } else {
        router.replace("/auth/login");  
      }
    })();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
