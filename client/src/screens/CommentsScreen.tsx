import { RouteProp } from "@react-navigation/native";
import React, { FC, useCallback, useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import Comment from "../components/comment/Comment";
import CommentInput from "../components/comment/CommentInput";
import { getComments } from "../services/comments";
import { CommentType, RootStackParamsList } from "../types";

interface Props {
  route: RouteProp<RootStackParamsList, "Comments">;
}

const CommentsScreen: FC<Props> = ({ route }) => {
  const { pid } = route.params;
  const [comments, setComments] = useState<Array<CommentType>>([]);

  const getCanvasComments = async () => {
    const res = await getComments({ pid: pid });

    if (res) {
      setComments(res.data);
    }
  };

  useEffect(() => {
    getCanvasComments();
  }, []);

  return (
    <View>
      <CommentInput pid={pid} comments={comments} setComments={setComments} />
      <ScrollView>
        {comments.map((comment, index) => {
          return <Comment comment={comment} key={index} />;
        })}
      </ScrollView>
    </View>
  );
};

export default CommentsScreen;
