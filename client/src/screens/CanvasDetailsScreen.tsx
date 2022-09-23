import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import CanvasSnapshot from "../components/CanvasSnapshot";
import { RootStackParamsList } from "../types";

interface Props {
  navigation: StackNavigationProp<RootStackParamsList>;
  route: RouteProp<RootStackParamsList, "Canvas">;
}

const CanvasDetailsScreen: FC<Props> = (props) => {
  const { route } = props;
  const { canvas } = route.params;

  return (
    <View style={canvasDetailStyles.container}>
      <CanvasSnapshot canvas={canvas} {...props} />
    </View>
  );
};

export default CanvasDetailsScreen;

const canvasDetailStyles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
