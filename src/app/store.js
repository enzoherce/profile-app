import { configureStore } from "@reduxjs/toolkit";
import modeReducer from "../mode/modeSlice";
import authReducer from "../mode/authSlice"; 

const store = configureStore({
  reducer: {
    mode: modeReducer,
    auth: authReducer,
  }
});

export default store;
