import { createSlice } from "@reduxjs/toolkit";

export const AuthInitialState = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: AuthInitialState,
  reducers: {
    setAuth: (state, action) => ({
      ...state,
      isAuthenticated: action.payload,
    }),
  },
});

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;
