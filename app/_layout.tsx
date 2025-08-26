import * as Notifications from "expo-notifications";
import { Stack } from "expo-router";

Notifications.setNotificationHandler({
  handleNotification: async (): Promise<Notifications.NotificationBehavior> => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowBanner: true,
      shouldShowList: true,
    };
  },
});

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="splash" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ title: "커뮤니티" }} />
      <Stack.Screen name="compose" options={{ title: "글쓰기" }} />
      <Stack.Screen name="post/[id]" options={{ title: "상세" }} />
      <Stack.Screen name="auth/login" options={{ title: "로그인" }} />
      <Stack.Screen name="auth/sign-up" options={{ title: "회원가입" }} />
    </Stack>
  );
}

