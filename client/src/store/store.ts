import { configureStore } from "@reduxjs/toolkit";
import canvasReducer from "../store/canvas/canvasSlice";
import userReducer from "../store/users/userSlice";
import modalReducer from "../store/modal/modalSlice";

export const store = configureStore({
  reducer: {
    canvas: canvasReducer,
    user: userReducer,
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
