import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { tokenStorage } from "./tokenStorage";

const API_URL = "https://api.smartgauge.co.kr/";

export const api = axios.create({ baseURL: API_URL, timeout: 10000 });

api.interceptors.request.use(async (config) => {
  const token = await tokenStorage.get();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export type AuthResponse = { user_id: number; token: string };

export const Auth = {
  logIn: async (username: string, password: string) => {
    const res = await api.post<AuthResponse>("/community/login", { username, password });
    const data = res.data;
    await tokenStorage.set(data.token);  
    return data;
  },
  signUp: (email: string, password: string, username: string) =>
    api
      .post("/community/signup", { email, password, username })
      .then(async (r) => {
        const data = r.data;
        await tokenStorage.set(data.token);
        return data;
    }),
  logOut: async () => {
    await SecureStore.deleteItemAsync("token");
  },
};

export type Post = {
  id: number;
  author: { id: number; username: string; avatarUrl?: string };
  title: string; 
  content: string;
  image_url?: string;
  created_at: string;
};
export const Posts = {
  list: (cursor?: string) =>
    api
      .get<{ items: Post[]; next_cursor?: string }>("/community/posts", {
        params: { cursor },
      })
      .then((r) => r.data),
  get: (id: number) =>
    api.get<Post>(`/community/posts/${id}`).then((r) => r.data),
  create: (payload: { title: string; content: string; image_url?: string }) =>
    api.post<Post>("/community/posts", payload).then((r) => r.data),
};