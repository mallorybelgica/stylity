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
import { globalStyles } from "../../styles/global";

interface Props {
  pid: string;
  reload: any;
}

const CommentInput: FC<Props> = ({ pid, reload }) => {
  const { currentUser } = useSelector(user);
  const [comment, onChangeComment] = useState("");
  const [newHeight, setNewHeight] = useState(1);

  const handleSubmit = () => {
    if (comment === "") return;
    createComment({ author_id: currentUser._id, pid, comment });
    onChangeComment("");
    reload();
  };

  return (
    <View style={styles.container}>
      <TextInput
        multiline={true}
        value={comment}
        onContentSizeChange={(ev) => {
          setNewHeight(ev.nativeEvent.contentSize.height);
        }}
        onChangeText={onChangeComment}
        onSubmitEditing={handleSubmit}
        style={[styles.input, { height: comment.length < 38 ? 40 : newHeight }]}
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
