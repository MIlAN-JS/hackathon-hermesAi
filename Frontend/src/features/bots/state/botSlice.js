import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bot: [],
  error: null,
  loading: false,
};

const botSlice = createSlice({
  name: "bot",
  initialState,
  reducers: {
    botStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    botSuccess: (state, action) => {
      state.loading = false;
      state.bot = action.payload ?? [];
      state.error = null;
    },

    // ✅ instantly push new bot into the list without wiping existing ones
    addBot: (state, action) => {
      state.bot = [action.payload, ...state.bot];
    },

    botFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { botStart, botSuccess, botFailure, addBot, clearError } = botSlice.actions;
export default botSlice.reducer;