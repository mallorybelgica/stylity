import { RootState } from "./store";

export const user = (state: RootState) => state.user.currentUser;
export const canvasElements = (state: RootState) => state.canvas.elements;
