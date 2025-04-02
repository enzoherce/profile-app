import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: localStorage.getItem("isLogin") === "true" ? true : false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isLogin = true;
      localStorage.setItem("isLogin", "true");
    },
    logout: (state) => {
      state.isLogin = false;
      localStorage.setItem("isLogin", "false");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
