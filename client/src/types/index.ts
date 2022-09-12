export type Attributes = {
  dimensions?: { width: number; height: number };
  position: { left: number; top: number };
  rotate: number;
  font_family?: string;
  font_size?: number;
  isBold?: boolean;
  color?: string;
};

export type CanvasElement = {
  _id: string;
  canvas_id?: string;
  createdAt: string | Date;
  attributes: Attributes;
  image_id?: string;
  text?: string;
  type: string;
};

export type User = {
  _id: string;
  fullName: string;
  displayName: string;
  bio?: string;
  email: string;
  profilePic: string;
  canvases?: Array<string>;
  following?: Array<string>;
  followers?: Array<string>;
};

export type RootStackParamsList = {
  Profile: undefined;
  Home: undefined;
  Canvas: { creator: object; canvas: object };
  Comments: { userId: string; pid: string };
  Settings: undefined;
  Login: undefined;
  Signup: undefined;
  NavigationBottom: undefined;
};
