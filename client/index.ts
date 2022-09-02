export type Attributes = {
  width?: number;
  height?: number;
  x: number;
  y: number;
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
  src?: string;
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
