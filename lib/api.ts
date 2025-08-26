import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { clearToken } from "../app/store/authSlice";
const API_URL = "https://api.smartgauge.co.kr/";
const dispatch = useDispatch();
export const api = axios.create({ baseURL: API_URL, timeout: 10000 });

api.interceptors.request.use(async (config) => {
  const token = useSelector((state: RootState) => state.auth.token);
  if (token) {
    config.headers = config.headers ?? {};
    (config.headers as any).Authorization = `Bearer ${token}`;
  }
  return config;
});

export type AuthResponse = { user_id: number; token: string };

export const Auth = {
  logIn: async (username: string, password: string) => {
    const res = await api.post<AuthResponse>("/community/login", { username, password });
    const data = res.data;
    return data;
  },
  signUp: (email: string, password: string, username: string) =>
    api
      .post("/community/signup", { email, password, username })
      .then(async (r) => {
        const data = r.data;
        
        return data;
      }),
  logOut: async () => {
     dispatch(clearToken())
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
  create: (
    payload: { title: string; content: string; image_url?: string },
    token: string
  ) =>
    api.post<Post>("/community/posts", payload, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((r) => r.data),
};