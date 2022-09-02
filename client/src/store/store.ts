import { configureStore } from "@reduxjs/toolkit";
import canvasReducer from "../store/canvas/canvasSlice";
import userReducer from "../store/users/userSlice";

export const store = configureStore({
  reducer: {
    canvas: canvasReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
