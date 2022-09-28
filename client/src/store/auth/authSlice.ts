import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  userToken: string | null;
  isSignout: boolean;
}

const initialState: AuthState = {
  userToken: null,
  isSignout: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    restore_token: (state, action) => {
      return {
        ...state,
        userToken: action.payload,
      };
    },
    sign_in: (state, action) => {
      return {
        ...state,
        isSignout: false,
        userToken: action.payload,
      };
    },
    sign_out: (state) => {
      return {
        ...state,
        isSignout: true,
        userToken: null,
      };
    },
  },
});

export const { restore_token, sign_in, sign_out } = authSlice.actions;

export default authSlice.reducer;
