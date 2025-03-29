import { configureStore } from "@reduxjs/toolkit";
import modeReducer from "../mode/modeSlice";

const store = configureStore({
  reducer: {
    mode: modeReducer,
  }
});

export default store;
