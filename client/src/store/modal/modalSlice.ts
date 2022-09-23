import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface ModalState {
  isOpen: boolean;
}

const initialState: ModalState = {
  isOpen: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggle_modal: (state, action) => {
      state.isOpen = action.payload;
    },
  },
});

export const { toggle_modal } = modalSlice.actions;

export const modal = (state: RootState) => state;

export default modalSlice.reducer;
