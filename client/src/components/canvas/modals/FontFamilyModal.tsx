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
import { fontFamilies } from "../../../constants/attributes";
import { update_element_attributes } from "../../../store/canvas/canvasSlice";
import { toggle_modal } from "../../../store/modal/modalSlice";
import { colors } from "../../../styles/base";
import { globalStyles } from "../../../styles/global";
import { CanvasElementType } from "../../../types";
import BottomSheet from "../../common/BottomSheet";

interface Props {
  currentElement: CanvasElementType | undefined;
}

const FontFamilyModal: FC<Props> = ({ currentElement }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(!showModal);
    dispatch(toggle_modal(!showModal));
  };

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
        onPress={handleShowModal}
      >
        <MaterialCommunityIcons name={"format-font"} size={32} />
        <Text>Font Family</Text>
      </TouchableOpacity>
      <BottomSheet showModal={showModal} setShowModal={setShowModal}>
        <Fragment>
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
