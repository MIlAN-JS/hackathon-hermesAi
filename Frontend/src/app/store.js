// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/state/authSlice.js"
import botReducer from "../features/bots/state/botSlice.js"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    bot :botReducer
  },
});