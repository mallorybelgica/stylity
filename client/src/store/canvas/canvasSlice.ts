import { createSlice } from "@reduxjs/toolkit";
import { CanvasElementType } from "../../types";
import { RootState } from "../store";

interface CanvasState {
  caption: string;
  currentElement: CanvasElementType;
  elements: Array<CanvasElementType>;
  background_color: string;
  comments_off: boolean;
  likes: Array<string>;
  screenshot: string;
  user_id: string;
  createdAt: string;
  isLoading: boolean;
  error?: string;
}

const initialState: CanvasState = {
  caption: "",
  currentElement: {
    _id: "",
    canvas_id: "",
    createdAt: "",
    attributes: { position: { left: 50, top: 50 }, rotate: 0 },
    type: "",
  },
  comments_off: false,
  background_color: "#fff",
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
        ...action.payload,
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
        .indexOf(action.payload);

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
        .indexOf(action.payload);

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
        .indexOf(action.payload);

      if (index > 0 && state.elements.length > 1) {
        state.elements.unshift(...state.elements.splice(index, 1));
      } else {
        return state;
      }
    },
    send_element_front: (state, action) => {
      const index = state.elements
        .map((element) => element._id)
        .indexOf(action.payload);

      if (index < state.elements.length && state.elements.length > 1) {
        state.elements.push(...state.elements.splice(index, 1));
      } else {
        return state;
      }
    },
    update_canvas: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    reset_canvas: () => initialState,
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
  update_canvas,
  reset_canvas,
  canvas_error,
} = canvasSlice.actions;

export default canvasSlice.reducer;
