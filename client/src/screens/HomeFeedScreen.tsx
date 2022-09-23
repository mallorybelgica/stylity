import { StackNavigationProp } from "@react-navigation/stack";
import React, { FC, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View, Dimensions } from "react-native";
import { useSelector } from "react-redux";
import CanvasSnapshot from "../components/CanvasSnapshot";
import { getCanvases } from "../services/canvas";
import { user } from "../store/selectors";
import { RootStackParamsList } from "../types";

interface Props {
  navigation: StackNavigationProp<RootStackParamsList>;
}

const HomeFeedScreen: FC<Props> = (props) => {
  const { currentUser } = useSelector(user);
  const [homeFeedCanvases, setHomeFeedCanvases] = useState([]);

  const getHomeFeedCanvases = async () => {
    const res = await getCanvases({ user_id: currentUser?.following });

    if (res) {
      setHomeFeedCanvases(res.data);
    }
  };

  useEffect(() => {
    if (currentUser._id) {
      getHomeFeedCanvases();
    }
  }, [currentUser]);

  return (
    <ScrollView style={homeFeedStyles.container}>
      {homeFeedCanvases.length > 0 ? (
        homeFeedCanvases.map((canvas, index: number) => {
          return <CanvasSnapshot canvas={canvas} key={index} {...props} />;
        })
      ) : (
        <Text>Your home feed is empty.</Text>
      )}
    </ScrollView>
  );
};

export default HomeFeedScreen;

const homeFeedStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "stretch",
    padding: 10,
  },
});
