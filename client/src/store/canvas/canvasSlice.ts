import { createSlice } from "@reduxjs/toolkit";
import { CanvasElement } from "../../..";
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
      let newArray = [...Object.values(state.elements)];
      newArray.push(action.payload);
      return {
        ...state,
        elements: newArray,
      };
    },
    delete_element: (state, action) => {
      const index = Object.values(state.elements).findIndex(
        (elements) => elements._id === action.payload
      );
      let newArray = [...Object.values(state.elements)];
      newArray.splice(index, 1);
      return {
        ...state,
        elements: newArray,
      };
    },
    change_element_attributes: (state, action) => {
      const index = Object.values(state.elements).findIndex(
        (elements) => elements._id === action.payload._id
      );

      let newArray = [...Object.values(state.elements)];
      newArray[index].attributes = action.payload.attributes;

      return {
        ...state,
        elements: newArray,
      };
    },
    send_element_backward: (state, action) => {
      const index = Object.values(state.elements).findIndex(
        (elements) => elements._id === action.payload._id
      );

      if (index > 0 && state.elements.length > 1) {
        let newArray = [...Object.values(state.elements)];
        const element = newArray.splice(index, 1)[0];
        newArray.splice(index - 1, 0, element);
        return {
          ...state,
          elements: newArray,
        };
      } else {
        return state;
      }
    },
    send_element_forward: (state, action) => {
      const index = Object.values(state.elements).findIndex(
        (elements) => elements._id === action.payload._id
      );
      if (index < state.elements.length && state.elements.length > 1) {
        let newArray = [...Object.values(state.elements)];
        const element = newArray.splice(index, 1)[0];
        newArray.splice(index + 1, 0, element);
        return {
          ...state,
          elements: newArray,
        };
      } else {
        return state;
      }
    },
    send_element_back: (state, action) => {
      const index = Object.values(state.elements).findIndex(
        (elements) => elements._id === action.payload._id
      );
      if (index > 0 && state.elements.length > 1) {
        let newArray = [...Object.values(state.elements)];
        newArray.unshift(...newArray.splice(index, 1));
        return {
          ...state,
          elements: newArray,
        };
      } else {
        return state;
      }
    },
    send_element_front: (state, action) => {
      const index = Object.values(state.elements).findIndex(
        (elements) => elements._id === action.payload._id
      );
      if (index < state.elements.length && state.elements.length > 1) {
        let newArray = [...Object.values(state.elements)];
        newArray.push(...newArray.splice(index, 1));
        return {
          ...state,
          elements: newArray,
        };
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
  delete_element,
  change_element_attributes,
  send_element_backward,
  send_element_forward,
  send_element_back,
  send_element_front,
  canvas_error,
} = canvasSlice.actions;

export const canvasElements = (state: RootState) => state.canvas.elements;

export default canvasSlice.reducer;
