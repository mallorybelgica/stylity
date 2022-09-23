import { REACT_APP_AWS_URL } from "@env";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { FC, useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateCanvas } from "../services/canvas";
import { getComments } from "../services/comments";
import { getUser } from "../services/user";
import { user } from "../store/selectors";
import { colors } from "../styles/base";
import { globalStyles } from "../styles/global";
import { CanvasType, RootStackParamsList } from "../types";
import CanvasSnapshotModal from "../components/canvas/modals/CanvasSnapshotModal";

interface Props {
  canvas: CanvasType;
  navigation: StackNavigationProp<RootStackParamsList>;
}

const CanvasSnapshot: FC<Props> = (props) => {
  const dispatch = useDispatch();
  const { navigation, canvas } = props;
  const { currentUser } = useSelector(user);
  const [creator, setCreator] = useState<any>();
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState<Array<string>>([]);
  const [viewMore, setViewMore] = useState(false);

  console.log({ canvas, creator });

  const getCommentsByCanvas = async () => {
    const res = await getComments({ pid: canvas._id });

    if (res) {
      setComments(res.data);
    }
  };

  const getCanvasCreator = async () => {
    const res = await getUser(canvas.user_id);
    if (res) {
      setCreator(res.data);
    }
  };

  const toggleLike = () => {
    let newArray = [...likes];
    const index = newArray.indexOf(currentUser._id);

    if (likes.includes(currentUser._id)) {
      newArray.splice(index, 1);
    } else {
      newArray.push(currentUser._id);
    }
    setLikes(newArray);
    updateCanvas(canvas._id, { ...canvas, likes: newArray });
  };

  useEffect(() => {
    if (canvas._id) {
      getCommentsByCanvas();
      getCanvasCreator();
      setLikes(canvas.likes);
    }
  }, [canvas]);

  return (
    <View style={snapshotStyles.container}>
      <CanvasSnapshotModal />
      {canvas && creator && (
        <View>
          <Image
            source={{ uri: `${REACT_APP_AWS_URL}/${canvas.screenshot}.jpeg` }}
            style={snapshotStyles.canvas}
          />
          <Text>
            {canvas.caption?.length > 140
              ? viewMore
                ? canvas.caption
                : canvas.caption.slice(0, 140) + "..."
              : canvas.caption}
          </Text>
          {canvas.caption?.length > 140 && (
            <TouchableOpacity onPress={() => setViewMore(!viewMore)}>
              <Text style={snapshotStyles.viewMoreButton}>
                {viewMore ? "View less" : "View more"}
              </Text>
            </TouchableOpacity>
          )}
          <View style={globalStyles.border} />
          <View style={[globalStyles.row, { justifyContent: "space-between" }]}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Profile", {
                  profileUserId: creator._id,
                  name: creator.display_name,
                })
              }
              style={[globalStyles.row, { justifyContent: "flex-start" }]}
            >
              {!creator?.profile_pic ? (
                <MaterialCommunityIcons
                  name="account-circle"
                  color={"black"}
                  size={40}
                />
              ) : (
                <Image
                  source={{ uri: creator?.profile_pic }}
                  style={snapshotStyles.profilePic}
                />
              )}
              <Text style={snapshotStyles.creator}>
                {creator?.display_name}
              </Text>
            </TouchableOpacity>
            <View style={[globalStyles.row, { justifyContent: "flex-start" }]}>
              <View
                style={[globalStyles.row, { justifyContent: "space-between" }]}
              >
                <Text style={snapshotStyles.buttonText}>
                  {likes.length >= 1000
                    ? likes.length / 1000 + "k"
                    : likes.length}
                </Text>
                <TouchableOpacity
                  onPress={toggleLike}
                  style={snapshotStyles.icon}
                >
                  {likes.includes(currentUser?._id) ? (
                    <MaterialCommunityIcons
                      name="heart"
                      color={"#f80e82"}
                      size={26}
                    />
                  ) : (
                    <MaterialCommunityIcons
                      name="heart-outline"
                      color={colors.primaryText}
                      size={26}
                    />
                  )}
                </TouchableOpacity>
              </View>
              <View
                style={[globalStyles.row, { justifyContent: "space-between" }]}
              >
                <Text style={snapshotStyles.buttonText}>
                  {comments.length >= 1000
                    ? comments.length / 1000 + "k"
                    : comments.length}
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Comments", { pid: canvas._id })
                  }
                  style={snapshotStyles.icon}
                >
                  <MaterialCommunityIcons
                    name="comment-outline"
                    color={colors.primaryText}
                    size={26}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default CanvasSnapshot;

const snapshotStyles = StyleSheet.create({
  container: {
    alignSelf: "stretch",
    height: "auto",
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
  },
  canvas: {
    height: 450,
    borderRadius: 20,
    marginBottom: 5,
  },
  viewMoreButton: {
    color: colors.primaryText,
    fontWeight: "bold",
  },
  profilePic: {
    height: 40,
    width: 40,
    borderRadius: 100,
  },
  creator: {
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 10,
  },
  icon: {
    paddingHorizontal: 5,
  },
  buttonText: {
    color: colors.primaryText,
  },
});
