import { REACT_APP_AWS_URL } from "@env";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { FC, useEffect, useRef, useState } from "react";
import {
  Image,
  Animated,
  StyleSheet,
  View,
  I18nManager,
  Text,
  TouchableOpacity,
} from "react-native";
import { Swipeable, RectButton } from "react-native-gesture-handler";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";
import { deleteComment, updateComment } from "../../services/comments";
import { getUser } from "../../services/user";
import { user } from "../../store/selectors";
import { colors } from "../../styles/base";
import { globalStyles } from "../../styles/global";
import { CommentType, RootStackParamsList, UserType } from "../../types";

interface Props {
  comment: CommentType;
  reload: any;
}

const Comment: FC<Props> = ({ comment, reload }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamsList>>();
  const swipeableRef = useRef<Swipeable>(null);
  const { currentUser } = useSelector(user);
  const [author, setAuthor] = useState<UserType>();
  const [likes, setLikes] = useState<Array<string>>([]);

  const getAuthor = async () => {
    const res = await getUser(comment.author_id);

    if (res) {
      setAuthor(res.data);
    }
  };

  const closeSwipeable = () => {
    swipeableRef.current?.close();
  };

  const handleDeleteComment = () => {
    deleteComment(comment._id);
    closeSwipeable();
    reload();
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
    updateComment(comment._id, { ...comment, likes: newArray });
  };

  const renderRightActions = (
    _progress: Animated.AnimatedInterpolation,
    dragX: Animated.AnimatedInterpolation
  ) => {
    const scale = dragX.interpolate({
      inputRange: [-80, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });
    return (
      <RectButton style={commentStyles.rightAction}>
        <Animated.View
          style={[commentStyles.actionIcon, { transform: [{ scale }] }]}
        >
          <MaterialCommunityIcons
            name="delete"
            color="white"
            size={26}
            onPress={handleDeleteComment}
          />
        </Animated.View>
      </RectButton>
    );
  };

  useEffect(() => {
    getAuthor();
    setLikes(comment.likes);
  }, [comment]);

  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={renderRightActions}
      friction={2}
      leftThreshold={80}
      rightThreshold={41}
      overshootLeft={false}
      onSwipeableOpen={handleDeleteComment}
    >
      <RectButton style={commentStyles.container}>
        {author && (
          <View style={commentStyles.commentDetails}>
            {author?.profile_pic ? (
              <Image
                source={{
                  uri: `${REACT_APP_AWS_URL}/${author?.profile_pic}.jpeg`,
                }}
                style={globalStyles.profilePic}
              />
            ) : (
              <MaterialCommunityIcons
                name="account-circle"
                color="black"
                size={50}
              />
            )}
            <View style={commentStyles.comment}>
              <TouchableOpacity
                onPress={() => {
                  navigation.push("Profile", {
                    profileUserId: author._id,
                    name: author.display_name,
                  });
                }}
              >
                <Text style={globalStyles.headerText}>
                  {author.display_name}
                </Text>
              </TouchableOpacity>
              <Text style={[globalStyles.text, { marginVertical: 5 }]}>
                {comment.comment}
              </Text>
              {likes.length > 0 && (
                <Text>
                  {likes.length} {likes.length === 1 ? "like" : "likes"}
                </Text>
              )}
            </View>
          </View>
        )}
        <TouchableOpacity onPress={toggleLike}>
          {likes.includes(currentUser._id) ? (
            <MaterialCommunityIcons name="heart" color={"#f80e82"} size={18} />
          ) : (
            <MaterialCommunityIcons
              name="heart-outline"
              color={colors.primaryText}
              size={18}
            />
          )}
        </TouchableOpacity>
      </RectButton>
    </Swipeable>
  );
};

export default Comment;

const commentStyles = StyleSheet.create({
  container: {
    flex: 1,
    height: 80,
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  commentDetails: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  comment: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  rightAction: {
    alignItems: "center",
    flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
    backgroundColor: "#dd2c00",
    flex: 1,
    justifyContent: "flex-end",
  },
  actionIcon: {
    width: 30,
    marginHorizontal: 10,
  },
});
