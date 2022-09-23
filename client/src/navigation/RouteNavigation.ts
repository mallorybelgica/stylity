import { NavigationContainerRef } from "@react-navigation/native";
import { createRef } from "react";
import { RootStackParamsList } from "../types";

export const navigationRef = createRef<
  NavigationContainerRef<RootStackParamsList> | undefined
>();
