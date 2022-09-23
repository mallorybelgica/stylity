import React, { FC, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch } from "react-redux";
import { fontFamilies } from "../../../constants/attributes";
import { update_element_attributes } from "../../../store/canvas/canvasSlice";
import { toggle_modal } from "../../../store/modal/modalSlice";
import { globalStyles } from "../../../styles/global";
import { CanvasElementType } from "../../../types";
import BottomSheet from "../../common/BottomSheet";

interface Props {
  currentElement: CanvasElementType | undefined;
}

const FontFamilyModal: FC<Props> = ({ currentElement }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const updateFontFamily = (value: string) => {
    dispatch(
      update_element_attributes({
        _id: currentElement?._id,
        attributes: { font_family: value },
      })
    );
  };

  return (
    <View>
      <TouchableOpacity
        style={globalStyles.detailedButton}
        onPress={() => {
          setShowModal(true);
          dispatch(toggle_modal(true));
        }}
      >
        <MaterialCommunityIcons name={"format-font"} size={32} />
        <Text>Font Family</Text>
      </TouchableOpacity>
      <BottomSheet showModal={showModal} setShowModal={setShowModal}>
        <ScrollView>
          <View style={fontFamilyModalStyles.fontFamilyContainer}>
            {fontFamilies.map((font, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => updateFontFamily(font.value)}
                >
                  <Text
                    style={[
                      fontFamilyModalStyles.fontButton,
                      { fontFamily: font.value },
                    ]}
                  >
                    {font.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </BottomSheet>
    </View>
  );
};

export default FontFamilyModal;

const fontFamilyModalStyles = StyleSheet.create({
  fontFamilyContainer: {
    justifyContent: "center",
    alignItems: "stretch",
  },
  fontButton: {
    margin: 5,
  },
});
