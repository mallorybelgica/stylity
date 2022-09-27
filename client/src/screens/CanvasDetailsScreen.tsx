import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { FC, useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import CanvasSnapshot from "../components/CanvasSnapshot";
import ActivityLoader from "../components/common/ActivityLoader";
import { getCanvas } from "../services/canvas";
import { RootStackParamsList } from "../types";

interface Props {
  navigation: StackNavigationProp<RootStackParamsList>;
  route: RouteProp<RootStackParamsList, "Canvas">;
}

const CanvasDetailsScreen: FC<Props> = (props) => {
  const { route, navigation } = props;
  const { canvasId } = route.params;
  const [canvasIsLoading, setCanvasIsLoading] = useState(true);
  const [canvas, setCanvas] = useState();
  const [reloadKey, setReloadKey] = useState(0);

  const getCanvasById = async () => {
    const res = await getCanvas(canvasId);

    if (res) {
      setCanvas(res.data);
      setCanvasIsLoading(false);
    }
  };

  useEffect(() => {
    if (canvasId) {
      getCanvasById();
    }
  }, [reloadKey, canvasId]);

  const reload = useCallback(() => {
    setReloadKey((prevReloadKey) => prevReloadKey + 1);
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setCanvasIsLoading(true);

      if (canvasId) {
        getCanvasById();
      }
    });

    return unsubscribe;
  }, []);

  if (canvasIsLoading) {
    return <ActivityLoader />;
  }

  return (
    <View style={canvasDetailStyles.container}>
      {canvas && <CanvasSnapshot canvas={canvas} reload={reload} {...props} />}
    </View>
  );
};

export default CanvasDetailsScreen;

const canvasDetailStyles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
