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
import { colors } from "../../../styles/base";

interface Props {
  currentElement: CanvasElementType | undefined;
}

const PositionModal: FC<Props> = ({ currentElement }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(!showModal);
    dispatch(toggle_modal(!showModal));
  };

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
        onPress={handleShowModal}
      >
        <MaterialCommunityIcons name="view-dashboard-outline" size={32} />
        <Text>Position</Text>
      </TouchableOpacity>
      <BottomSheet showModal={showModal} setShowModal={setShowModal}>
        <View style={textFormatStyles.positionContainer}>
          <View style={textFormatStyles.buttonContainer}>
            <TouchableOpacity
              onPress={sendBackward}
              style={[globalStyles.detailedButton, globalStyles.listButton]}
            >
              <MaterialCommunityIcons
                name={"arrange-send-backward"}
                color={colors.accent}
                size={26}
              />
              <Text style={globalStyles.listButtonText}>Send Backward</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={bringForward}
              style={[globalStyles.detailedButton, globalStyles.listButton]}
            >
              <MaterialCommunityIcons
                name={"arrange-bring-forward"}
                color={colors.accent}
                size={26}
              />
              <Text style={globalStyles.listButtonText}>Bring Forward</Text>
            </TouchableOpacity>
          </View>
          <View style={textFormatStyles.buttonContainer}>
            <TouchableOpacity
              onPress={sendToBack}
              style={[globalStyles.detailedButton, globalStyles.listButton]}
            >
              <MaterialCommunityIcons
                name={"arrange-send-to-back"}
                color={colors.accent}
                size={26}
              />
              <Text style={globalStyles.listButtonText}>Send to Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={bringToFront}
              style={[globalStyles.detailedButton, globalStyles.listButton]}
            >
              <MaterialCommunityIcons
                name={"arrange-bring-to-front"}
                color={colors.accent}
                size={26}
              />
              <Text style={globalStyles.listButtonText}>Bring to Front</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleShowModal}
              style={[
                globalStyles.detailedButton,
                globalStyles.listButton,
                { backgroundColor: colors.accent },
              ]}
            >
              <MaterialCommunityIcons
                name="close-thick"
                color={colors.whiteText}
                size={26}
              />
              <Text
                style={[
                  globalStyles.listButtonText,
                  { color: colors.whiteText },
                ]}
              >
                Close
              </Text>
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
    boxSizing: "border-box",
  },
  buttonContainer: {
    justifyContent: "space-between",
    alignItems: "stretch",
  },
});
