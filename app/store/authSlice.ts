import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  username:string | null;
}

const initialState: AuthState = { 
    token: null,
    username: null,
 };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.username=action.payload;
    },
    clearToken: (state) => {
      state.token = null;
      state.username=null;
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;
