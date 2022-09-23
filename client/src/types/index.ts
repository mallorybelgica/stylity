export type AttributesType = {
  dimensions?: { width: number; height: number };
  position: { left: number; top: number };
  rotate: number;
  font_family?: string;
  font_size?: number;
  isUnderlined?: boolean;
  isItalic?: boolean;
  isBold?: boolean;
  isUppercase?: boolean;
  color?: string;
};

export type CanvasType = {
  _id: string;
  caption: "";
  background_color: string;
  createdAt: string | Date;
  elements: Array<CanvasElementType>;
  likes: Array<string>;
  screenshot: string;
  user_id: string;
};

export type CanvasElementType = {
  _id: string;
  canvas_id?: string;
  createdAt: string | Date;
  attributes: AttributesType;
  image_id?: string;
  text?: string;
  type: string;
};

export type CommentType = {
  _id: string;
  pid: string;
  author_id: string;
  comment: string;
  createdAt: string | Date;
  likes: Array<string>;
};

export type UserType = {
  _id: string;
  full_name: string;
  display_name: string;
  bio?: string;
  email: string;
  profile_pic: string;
  canvases?: Array<string>;
  following: Array<string>;
  followers: Array<string>;
};

export type RootStackParamsList = {
  Profile: { profileUserId: string; name: string };
  Home: undefined;
  EditCanvas: { canvasId: string };
  Canvas: { canvas: CanvasType };
  Comments: { pid: string };
  Settings: undefined;
  Login: undefined;
  Signup: undefined;
  NavigationBottom: undefined;
};
