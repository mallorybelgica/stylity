import React, { FC, Fragment, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch } from "react-redux";
import { paletteColors } from "../../../constants/attributes";
import {
  update_canvas,
  update_element_attributes,
} from "../../../store/canvas/canvasSlice";
import { toggle_modal } from "../../../store/modal/modalSlice";
import { colors } from "../../../styles/base";
import { globalStyles } from "../../../styles/global";
import { CanvasElementType } from "../../../types";
import BottomSheet from "../../common/BottomSheet";

interface Props {
  currentElement: CanvasElementType | undefined;
}

const ColorModal: FC<Props> = ({ currentElement }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(!showModal);
    dispatch(toggle_modal(!showModal));
  };

  const updateColor = (value: string) => {
    if (!currentElement) {
      dispatch(update_canvas({ background_color: value }));
    } else if (currentElement.type === "text") {
      dispatch(
        update_element_attributes({
          _id: currentElement?._id,
          attributes: { color: value },
        })
      );
    }
  };

  return (
    <View>
      <TouchableOpacity
        style={globalStyles.detailedButton}
        onPress={handleShowModal}
      >
        <MaterialCommunityIcons name={"palette-outline"} size={32} />
        <Text>{!currentElement ? "Canvas Color" : "Text Color"}</Text>
      </TouchableOpacity>
      <BottomSheet showModal={showModal} setShowModal={setShowModal}>
        <Fragment>
          <ScrollView>
            <View style={colorModalStyles.colorContainer}>
              {paletteColors.map((color, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => updateColor(color)}
                  >
                    <View
                      style={[
                        colorModalStyles.colorButton,
                        { backgroundColor: color },
                      ]}
                    ></View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
          <TouchableOpacity
            onPress={handleShowModal}
            style={[
              globalStyles.detailedButton,
              globalStyles.listButton,
              { marginTop: 10, backgroundColor: colors.accent },
            ]}
          >
            <MaterialCommunityIcons
              name="close-thick"
              color={colors.whiteText}
              size={26}
            />
            <Text
              style={[globalStyles.listButtonText, { color: colors.whiteText }]}
            >
              Close
            </Text>
          </TouchableOpacity>
        </Fragment>
      </BottomSheet>
    </View>
  );
};

export default ColorModal;

const colorModalStyles = StyleSheet.create({
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
});
