import { createSlice } from "@reduxjs/toolkit";

const modeSlice = createSlice({
  name: "mode",
  initialState: { value: "light" },
  reducers: {
    toggleMode: (state) => {
      state.value = state.value === "light" ? "dark" : "light";
    },
    setMode: (state, action) => {
      state.value = action.payload;
    }
  }
});

export const { toggleMode, setMode } = modeSlice.actions;
export default modeSlice.reducer;
