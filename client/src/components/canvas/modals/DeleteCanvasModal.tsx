import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch } from "react-redux";
import { delete_element } from "../../../store/canvas/canvasSlice";
import { toggle_modal } from "../../../store/modal/modalSlice";
import { colors } from "../../../styles/base";
import { globalStyles } from "../../../styles/global";
import { CanvasElementType } from "../../../types";
import BottomSheet from "../../common/BottomSheet";

interface Props {
  currentElement: CanvasElementType | undefined;
  setCurrentElement: Dispatch<SetStateAction<CanvasElementType | undefined>>;
}

const DeleteCanvasModal: FC<Props> = ({
  currentElement,
  setCurrentElement,
}) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(!showModal);
    dispatch(toggle_modal(!showModal));
  };

  return (
    <View>
      <TouchableOpacity
        style={globalStyles.detailedButton}
        onPress={handleShowModal}
      >
        <MaterialCommunityIcons
          name={"delete-outline"}
          size={32}
          color={"red"}
        />
        <Text style={{ color: "red" }}>Delete Element</Text>
      </TouchableOpacity>
      <BottomSheet showModal={showModal} setShowModal={setShowModal}>
        <View>
          <Text
            style={[
              globalStyles.headerText,
              { textTransform: "uppercase", textAlign: "center" },
            ]}
          >
            Delete Element?
          </Text>
          <Text
            style={[
              globalStyles.text,
              { marginVertical: 10, textAlign: "center" },
            ]}
          >
            Element will be removed from canvas.
          </Text>
          <View>
            <TouchableOpacity
              onPress={() => {
                handleShowModal();
              }}
              style={[globalStyles.detailedButton, globalStyles.listButton]}
            >
              <MaterialCommunityIcons
                name="arrow-left"
                color={colors.accent}
                size={26}
              />
              <Text style={globalStyles.listButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handleShowModal();
                dispatch(delete_element(currentElement?._id));
                setCurrentElement(undefined);
              }}
              style={[
                globalStyles.detailedButton,
                globalStyles.listButton,
                { backgroundColor: colors.accent },
              ]}
            >
              <MaterialCommunityIcons
                name="content-save-outline"
                color={colors.whiteText}
                size={26}
              />
              <Text
                style={[
                  globalStyles.listButtonText,
                  { color: colors.whiteText },
                ]}
              >
                Delete Element
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

export default DeleteCanvasModal;

const deleteCanvasStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
});
