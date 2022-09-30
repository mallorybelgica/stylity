import React, { Dispatch, FC, SetStateAction, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  Keyboard,
} from "react-native";
import { useSelector } from "react-redux";
import { createComment } from "../../services/comments";
import { user } from "../../store/selectors";
import { colors } from "../../styles/base";
import { globalStyles } from "../../styles/global";
import { CommentType } from "../../types";

interface Props {
  pid: string;
  comments: Array<any>;
  setComments: Dispatch<SetStateAction<any>>;
}

const CommentInput: FC<Props> = ({ pid, comments, setComments }) => {
  const { currentUser } = useSelector(user);
  const [comment, onChangeComment] = useState("");

  const handleSubmit = async () => {
    if (comment === "") return;
    const res = await createComment({
      author_id: currentUser._id,
      pid,
      comment,
    });

    if (res) {
      setComments([...comments, res.comment]);
    }
    onChangeComment("");
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <TextInput
        multiline
        value={comment}
        onChangeText={onChangeComment}
        onSubmitEditing={handleSubmit}
        style={styles.input}
      />
      <TouchableHighlight onPress={handleSubmit} style={styles.button}>
        <Text style={[globalStyles.headerText, { color: colors.accent }]}>
          Comment
        </Text>
      </TouchableHighlight>
    </View>
  );
};

export default CommentInput;

export const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginTop: 15,
    marginBottom: 5,
    marginHorizontal: 10,
  },
  input: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingLeft: 10,
    paddingRight: 100,
    borderWidth: 1,
    fontSize: 16,
  },
  button: {
    position: "absolute",
    right: 20,
  },
});
