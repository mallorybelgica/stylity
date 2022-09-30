import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { FC, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { useSelector } from "react-redux";
import CanvasSnapshot from "../components/CanvasSnapshot";
import ActivityLoader from "../components/common/ActivityLoader";
import { getCanvases } from "../services/canvas";
import { user } from "../store/selectors";
import { RootStackParamsList } from "../types";

interface Props {
  navigation: StackNavigationProp<RootStackParamsList>;
}

const HomeFeedScreen: FC<Props> = (props) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamsList>>();
  const { currentUser } = useSelector(user);
  const [homeFeedCanvases, setHomeFeedCanvases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getHomeFeedCanvases = async () => {
    try {
      const canvases = await getCanvases({ user_id: currentUser.following });

      setHomeFeedCanvases(canvases.data);
      setIsLoading(false);
    } catch (err) {
      console.log({ err });
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setIsLoading(true);

      if (currentUser._id) {
        getHomeFeedCanvases();
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    getHomeFeedCanvases();
  }, []);

  if (isLoading) {
    return <ActivityLoader />;
  }

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
