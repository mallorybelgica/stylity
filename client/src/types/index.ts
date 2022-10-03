import { SetStateAction } from "react";

export type AuthType = {
  userToken: string;
  isSignout: boolean;
};

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
  comments_off: boolean;
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
};

export type FollowerType = {
  _id: string;
  follower_id: string;
  followee_id: string;
  timestamp: string | Date;
};

export type RootStackParamsList = {
  Profile: { profileUserId: string; name: string };
  Home: undefined;
  HomeFeed: undefined;
  EditCanvas: { canvasId: string };
  Canvas: { canvasId: string };
  Comments: { pid: string };
  UserList: { userList: Array<string>; name: string };
  Settings: undefined;
  Explore: undefined;
  Search: undefined;
  SearchAndExplore: undefined;
  Login: undefined;
  Signup: undefined;
  NavigationBottom: undefined;
};
