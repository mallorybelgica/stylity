import { createSlice } from "@reduxjs/toolkit";
import { CanvasElement } from "../../types";
import { RootState } from "../store";

interface CanvasState {
  caption: string;
  elements: Array<CanvasElement>;
  likes: Array<string>;
  screenshot: string;
  user_id: string;
  createdAt: string;
  isLoading: boolean;
  error?: string;
}

const initialState: CanvasState = {
  caption: "",
  elements: [],
  likes: [],
  screenshot: "",
  user_id: "",
  createdAt: "",
  isLoading: true,
  error: "",
};

export const canvasSlice = createSlice({
  name: "canvas",
  initialState,
  reducers: {
    get_elements: (state, action) => {
      if (Object.keys(action.payload).length > 0) {
        return {
          ...state,
          elements: action.payload,
          isLoading: false,
        };
      } else {
        return {
          ...state,
          elements: [],
          isLoading: false,
        };
      }
    },
    add_element: (state, action) => {
      state.elements.push(action.payload);
    },
    delete_element: (state, action) => {
      const index = state.elements
        .map((element) => element._id)
        .indexOf(action.payload._id);

      state.elements.splice(index, 1);
    },
    update_element: (state, action) => {
      const index = state.elements
        .map((element) => element._id)
        .indexOf(action.payload._id);

      state.elements[index] = {
        ...state.elements[index],
        text: action.payload.text,
      };
    },
    update_element_attributes: (state, action) => {
      const index = state.elements
        .map((element) => element._id)
        .indexOf(action.payload._id);

      state.elements[index].attributes = {
        ...state.elements[index].attributes,
        ...action.payload.attributes,
      };
    },
    send_element_backward: (state, action) => {
      const index = state.elements
        .map((element) => element._id)
        .indexOf(action.payload._id);

      if (index > 0 && state.elements.length > 1) {
        const element = state.elements.splice(index, 1)[0];
        state.elements.splice(index - 1, 0, element);
      } else {
        return state;
      }
    },
    send_element_forward: (state, action) => {
      const index = state.elements
        .map((element) => element._id)
        .indexOf(action.payload._id);

      if (index < state.elements.length && state.elements.length > 1) {
        const element = state.elements.splice(index, 1)[0];
        state.elements.splice(index + 1, 0, element);
      } else {
        return state;
      }
    },
    send_element_back: (state, action) => {
      const index = state.elements
        .map((element) => element._id)
        .indexOf(action.payload._id);

      if (index > 0 && state.elements.length > 1) {
        state.elements.unshift(...state.elements.splice(index, 1));
      } else {
        return state;
      }
    },
    send_element_front: (state, action) => {
      const index = state.elements
        .map((element) => element._id)
        .indexOf(action.payload._id);

      if (index < state.elements.length && state.elements.length > 1) {
        state.elements.push(...state.elements.splice(index, 1));
      } else {
        return state;
      }
    },
    canvas_error: (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    },
  },
});

export const {
  get_elements,
  add_element,
  update_element,
  delete_element,
  update_element_attributes,
  send_element_backward,
  send_element_forward,
  send_element_back,
  send_element_front,
  canvas_error,
} = canvasSlice.actions;

export const canvasElements = (state: RootState) => state.canvas.elements;

export default canvasSlice.reducer;
