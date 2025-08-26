import { Auth } from "@/lib/api";
import { tokenStorage } from "@/lib/tokenStorage";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, Button, Text, TextInput, View } from "react-native";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    try {
      const res = await Auth.logIn(username, password);
      await tokenStorage.set(res.token); 
      router.replace("/");
    } catch (e: any) {
      Alert.alert("로그인 실패", e?.response?.data?.detail ?? "아이디 또는 비밀번호를 확인하세요");
    }
  };

  return (
    <View style={{ paddingVertical: 20, paddingHorizontal:25, gap: 20}}>
      <TextInput
        placeholder="username"
        autoCapitalize="none"
        value={username}
        onChangeText={setUsername}
        style={{ borderWidth: 1, borderColor: "#ddd", borderRadius: 12, padding: 12, backgroundColor:"#fff" }}
      />
      <TextInput
        placeholder="password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ borderWidth: 1, borderColor: "#ddd", borderRadius: 12, padding: 12, backgroundColor:"#fff" }}
      />
      <Button title="로그인" onPress={submit} />

      <Link href="/auth/sign-up" asChild>
        <Text style={{color: "blue", textAlign: "center" }}>
          아직 계정이 없으신가요? 회원가입
        </Text>
      </Link>
    </View>
  );
}
