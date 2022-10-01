import { REACT_APP_AWS_URL } from "@env";
import { StackNavigationProp } from "@react-navigation/stack";
import { FC, useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
} from "react-native";
import ActivityLoader from "../components/common/ActivityLoader";
import { getCanvases } from "../services/canvas";
import { colors } from "../styles/base";
import { CanvasType, RootStackParamsList } from "../types";

interface Props {
  navigation: StackNavigationProp<RootStackParamsList>;
}

const ExploreScreen: FC<Props> = (props) => {
  const { navigation } = props;
  const [exploreCanvases, setExploreCanvases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getExploreCanvases = async () => {
    try {
      const query = {
        sort: "createdAt",
        limit: 50,
      };

      const canvases = await getCanvases(query);

      if (canvases) {
        setExploreCanvases(canvases.data);
      }
      setIsLoading(false);
    } catch (err) {
      console.log({ err });
    }
  };

  useEffect(() => {
    getExploreCanvases();
  }, []);

  if (isLoading) {
    return <ActivityLoader />;
  }

  return (
    <View style={exploreStyles.container}>
      <ScrollView
        style={exploreStyles.canvasContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={exploreStyles.canvases}>
          {exploreCanvases.length > 0 &&
            exploreCanvases.map((canvas: CanvasType, index) => {
              return (
                <View style={exploreStyles.canvas} key={index}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.push("Canvas", { canvasId: canvas._id })
                    }
                  >
                    <Image
                      source={{
                        uri: `${REACT_APP_AWS_URL}/${canvas.screenshot}.jpeg`,
                      }}
                      style={exploreStyles.screenshot}
                    />
                  </TouchableOpacity>
                </View>
              );
            })}
        </View>
      </ScrollView>
    </View>
  );
};

export default ExploreScreen;

const exploreStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
  canvasContainer: {
    flex: 1,
    backgroundColor: colors.primary,
    padding: 5,
    borderRadius: 20,
  },
  canvases: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  canvas: {
    textAlign: "center",
    width: (Dimensions.get("window").width - 50) / 2,
    margin: 5,
    borderRadius: 10,
  },
  screenshot: {
    height: (Dimensions.get("window").width / 2) * 1.2,
    borderRadius: 10,
  },
});
