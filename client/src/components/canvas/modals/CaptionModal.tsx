import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { update_canvas } from "../../../store/canvas/canvasSlice";
import { toggle_modal } from "../../../store/modal/modalSlice";
import { canvas } from "../../../store/selectors";
import { globalStyles } from "../../../styles/global";
import BottomSheet from "../../common/BottomSheet";

const CaptionModal = () => {
  const dispatch = useDispatch();
  const { caption } = useSelector(canvas);
  const [showModal, setShowModal] = useState(false);

  return (
    <View>
      <TouchableOpacity
        style={globalStyles.detailedButton}
        onPress={() => {
          setShowModal(true);
          dispatch(toggle_modal(true));
        }}
      >
        <MaterialCommunityIcons name={"card-text-outline"} size={32} />
        <Text>Caption</Text>
      </TouchableOpacity>
      <BottomSheet showModal={showModal} setShowModal={setShowModal}>
        <View>
          <TextInput
            style={captionModalStyles.caption}
            value={caption}
            onChangeText={(value) =>
              dispatch(update_canvas({ caption: value }))
            }
            editable
            multiline={true}
            numberOfLines={6}
          />
        </View>
      </BottomSheet>
    </View>
  );
};

export default CaptionModal;

const captionModalStyles = StyleSheet.create({
  colorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
  colorButton: {
    width: 40,
    height: 40,
    margin: 10,
    borderRadius: 5,
  },
  caption: {
    paddingVertical: 5,
  },
});
