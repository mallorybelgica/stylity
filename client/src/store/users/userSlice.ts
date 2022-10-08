import { createSlice } from "@reduxjs/toolkit";
import { UserType } from "../../types";
import { RootState } from "../store";

interface UserState {
  currentUser: UserType;
  userToken: string | null;
  isSignout: boolean;
}

const initialState: UserState = {
  currentUser: {
    _id: "",
    display_name: "",
    full_name: "",
    email: "",
    bio: "",
    profile_pic: "",
  },
  userToken: null,
  isSignout: false,
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
      state.currentUser = { ...state.currentUser, ...action.payload };
    },
    user_error: (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    },
    restore_token: (state, action) => {
      return {
        ...state,
        userToken: action.payload,
      };
    },
    sign_in: (state, action) => {
      return {
        ...state,
        currentUser: action.payload.authUser,
        isSignout: false,
        userToken: action.payload.token,
      };
    },
    sign_out: (state) => {
      return {
        ...state,
        currentUser: initialState.currentUser,
        isSignout: true,
        userToken: null,
      };
    },
  },
});

export const {
  get_current_user,
  update_current_user,
  user_error,
  restore_token,
  sign_in,
  sign_out,
} = userSlice.actions;

export default userSlice.reducer;
