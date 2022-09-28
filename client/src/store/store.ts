import { configureStore } from "@reduxjs/toolkit";
import canvasReducer from "../store/canvas/canvasSlice";
import userReducer from "../store/users/userSlice";
import modalReducer from "../store/modal/modalSlice";
import authReducer from "../store/auth/authSlice";

export const store = configureStore({
  reducer: {
    canvas: canvasReducer,
    user: userReducer,
    modal: modalReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
