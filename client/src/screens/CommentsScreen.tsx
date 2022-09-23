import { RouteProp } from "@react-navigation/native";
import React, { FC, useCallback, useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Comment from "../components/comment/Comment";
import CommentInput from "../components/comment/CommentInput";
import { getComments } from "../services/comments";
import { CommentType, RootStackParamsList } from "../types";

interface Props {
  route: RouteProp<RootStackParamsList, "Comments">;
}

const CommentsScreen: FC<Props> = ({ route }) => {
  const { pid } = route.params;
  const [reloadKey, setReloadKey] = useState(0);
  const [comments, setComments] = useState<Array<CommentType>>([]);

  const getCanvasComments = async () => {
    const res = await getComments({ pid: pid });

    if (res) {
      setComments(res.data);
    }
  };

  useEffect(() => {
    getCanvasComments();
  }, [reloadKey]);

  const reload = useCallback(() => {
    setReloadKey((prevReloadKey) => prevReloadKey + 1);
  }, []);

  return (
    <View>
      <CommentInput pid={pid} reload={reload} />
      <ScrollView>
        {comments.map((comment, index) => {
          return <Comment comment={comment} reload={reload} key={index} />;
        })}
      </ScrollView>
    </View>
  );
};

export default CommentsScreen;
