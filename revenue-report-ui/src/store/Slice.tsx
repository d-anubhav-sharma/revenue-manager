import { createSlice } from "@reduxjs/toolkit";
import Constants from "./Constants";

const revenueSlice = createSlice({
  name: "revenueSlice",
  initialState: {
    activeScreen: Constants.ADD_NEW_REVENUE,
    userMessage: { level: "", text: "", visible: false },
  },
  reducers: {
    setActiveScreen: (state, action) => {
      state.activeScreen = action.payload;
    },
    setUserMessage: (state, action) => {
      state.userMessage = action.payload;
    },
  },
});

export const { setActiveScreen, setUserMessage } = revenueSlice.actions;
export default revenueSlice.reducer;
