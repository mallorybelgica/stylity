import React, { FC, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import { useSelector } from "react-redux";
import { createComment } from "../../services/comments";
import { user } from "../../store/selectors";
import { colors } from "../../styles/base";

interface Props {
  pid: string;
  reload: any;
}

const CommentInput: FC<Props> = ({ pid, reload }) => {
  const { currentUser } = useSelector(user);
  const [comment, onChangeComment] = useState("");

  const handleSubmit = () => {
    if (comment === "") return;
    createComment({ author_id: currentUser._id, pid, comment });
    onChangeComment("");
    reload();
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={comment}
        onChangeText={onChangeComment}
        onSubmitEditing={handleSubmit}
        style={styles.input}
      />
      <TouchableHighlight onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Comment</Text>
      </TouchableHighlight>
    </View>
  );
};

export default CommentInput;

export const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  input: {
    borderRadius: 50,
    height: 40,
    padding: 10,
    margin: 5,
    borderWidth: 1,
  },
  button: {
    position: "absolute",
    right: 20,
  },
  buttonText: {
    color: colors.accent,
    fontWeight: "bold",
  },
});
