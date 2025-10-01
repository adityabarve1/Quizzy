import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
  user: (() => {
    try {
      const userData = localStorage.getItem("user");
      const parsedUser = userData ? JSON.parse(userData) : null;
      console.log("AuthSlice - Loading user from localStorage:", parsedUser);
      console.log("AuthSlice - User attemptedQuizes:", parsedUser?.attemptedQuizes);
      return parsedUser;
    } catch (error) {
      console.error("AuthSlice - Error parsing user data:", error);
      return null;
    }
  })(),
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setToken(state, value) {
      state.token = value.payload;
      localStorage.setItem("token", value.payload);
    },
    setUser(state, value) {
      state.user = value.payload;
      localStorage.setItem("user", JSON.stringify(value.payload));
    },
  },
});

export const { setToken, setUser } = authSlice.actions;

export default authSlice.reducer;
