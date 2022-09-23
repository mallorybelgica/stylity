import React, { FC, useState } from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import BottomSheet from "../../common/BottomSheet";
import { useDispatch } from "react-redux";
import {
  send_element_back,
  send_element_backward,
  send_element_forward,
  send_element_front,
} from "../../../store/canvas/canvasSlice";
import { globalStyles } from "../../../styles/global";
import { CanvasElementType } from "../../../types";
import { toggle_modal } from "../../../store/modal/modalSlice";

interface Props {
  currentElement: CanvasElementType | undefined;
}

const PositionModal: FC<Props> = ({ currentElement }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const bringForward = () =>
    dispatch(send_element_forward(currentElement?._id));
  const sendBackward = () =>
    dispatch(send_element_backward(currentElement?._id));
  const bringToFront = () => dispatch(send_element_front(currentElement?._id));
  const sendToBack = () => dispatch(send_element_back(currentElement?._id));

  return (
    <View>
      <TouchableOpacity
        style={globalStyles.detailedButton}
        onPress={() => {
          setShowModal(true);
          dispatch(toggle_modal(true));
        }}
      >
        <MaterialCommunityIcons name="view-dashboard-outline" size={32} />
        <Text>Position</Text>
      </TouchableOpacity>
      <BottomSheet showModal={showModal} setShowModal={setShowModal}>
        <View style={textFormatStyles.positionContainer}>
          <View style={textFormatStyles.buttonContainer}>
            <TouchableOpacity
              onPress={sendBackward}
              style={textFormatStyles.positionButton}
            >
              <MaterialCommunityIcons
                name={"arrange-send-backward"}
                size={26}
              />
              <Text style={textFormatStyles.buttonText}>Send Backward</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={bringForward}
              style={textFormatStyles.positionButton}
            >
              <MaterialCommunityIcons
                name={"arrange-bring-forward"}
                size={26}
              />
              <Text style={textFormatStyles.buttonText}>Bring Forward</Text>
            </TouchableOpacity>
          </View>
          <View style={textFormatStyles.buttonContainer}>
            <TouchableOpacity
              onPress={sendToBack}
              style={textFormatStyles.positionButton}
            >
              <MaterialCommunityIcons name={"arrange-send-to-back"} size={26} />
              <Text style={textFormatStyles.buttonText}>Send to Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={bringToFront}
              style={textFormatStyles.positionButton}
            >
              <MaterialCommunityIcons
                name={"arrange-bring-to-front"}
                size={26}
              />
              <Text style={textFormatStyles.buttonText}>Bring to Front</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

export default PositionModal;

const textFormatStyles = StyleSheet.create({
  positionContainer: {
    justifyContent: "center",
    alignItems: "stretch",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  positionButton: {
    width: 150,
    marginHorizontal: 10,
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  buttonText: {
    fontSize: 16,
    paddingLeft: 10,
  },
});
