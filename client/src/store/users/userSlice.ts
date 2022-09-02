import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../..";
import { RootState } from "../store";

interface UserState {
  currentUser: User;
  isLoading: boolean;
  error?: string;
}

const initialState: UserState = {
  currentUser: {
    _id: "",
    displayName: "",
    fullName: "",
    email: "",
    bio: "",
    profilePic: "",
    canvases: [],
    following: [],
    followers: [],
  },
  isLoading: true,
  error: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    get_current_user: (state, action) => {
      return {
        ...state,
        currentUser: action.payload,
        isLoading: false,
      };
    },
    update_current_user: (state, action) => {
      return {
        ...state,
        currentUser: action.payload,
        isLoading: false,
      };
    },
    user_error: (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    },
  },
});

export const { get_current_user, user_error } = userSlice.actions;

export const currentUser = (state: RootState) => state.user.currentUser;

export default userSlice.reducer;