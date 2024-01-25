import { createSlice } from "@reduxjs/toolkit";
import { getAuthCookie } from "../helpers";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    loginTime: false,
    authStatus: getAuthCookie() ? true : false,
    user: {},
  },
  reducers: {
    setAuthState: (state, action) => {
      state.authStatus = action.payload;
    },
    setAllState: (state, action) => {
      const { payload } = action;
      state.loginTime = payload.loginTime;
      state.authStatus = payload.authStatus;
      state.user = payload.user;
      //set storage
      if (!localStorage.getItem("user")) {
        localStorage.setItem("user", JSON.stringify(payload.user || payload));
      }
    },
  },
});

export const { setAuthState, setAllState } = authSlice.actions;

export default authSlice.reducer;
