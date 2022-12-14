import React, { FC, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Slider from "@react-native-community/slider";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import BottomSheet from "../../common/BottomSheet";
import { colors } from "../../../styles/base";
import { useDispatch } from "react-redux";
import { update_element_attributes } from "../../../store/canvas/canvasSlice";
import useCallbackState from "../../../helpers/useCallbackState";
import { globalStyles } from "../../../styles/global";
import { CanvasElementType } from "../../../types";
import { toggle_modal } from "../../../store/modal/modalSlice";

interface Props {
  currentElement: CanvasElementType;
}

const TextFormatModal: FC<Props> = ({ currentElement }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [fontSize, setFontSize] = useState(28);
  const [isBold, setIsBold] = useCallbackState(false);
  const [isItalic, setIsItalic] = useCallbackState(false);
  const [isUnderlined, setIsUnderlined] = useCallbackState(false);
  const [isUppercase, setIsUppercase] = useCallbackState(false);

  const handleShowModal = () => {
    setShowModal(!showModal);
    dispatch(toggle_modal(!showModal));
  };

  const handleFontSize = (value: number) => {
    dispatch(
      update_element_attributes({
        _id: currentElement?._id,
        attributes: {
          font_size: value,
        },
      })
    );
  };

  const handleFontWeight = (value: boolean) => {
    setIsBold(value);
    dispatch(
      update_element_attributes({
        _id: currentElement?._id,
        attributes: {
          isBold: value,
        },
      })
    );
  };

  const handleFontStyle = (value: boolean) => {
    setIsItalic(value);
    dispatch(
      update_element_attributes({
        _id: currentElement?._id,
        attributes: {
          isItalic: value,
        },
      })
    );
  };

  const handleTextDecoration = (value: boolean) => {
    setIsUnderlined(value);
    dispatch(
      update_element_attributes({
        _id: currentElement?._id,
        attributes: {
          isUnderlined: value,
        },
      })
    );
  };

  const handleUppercase = (value: boolean) => {
    setIsUppercase(value);
    dispatch(
      update_element_attributes({
        _id: currentElement?._id,
        attributes: {
          isUppercase: value,
        },
      })
    );
  };

  useEffect(() => {
    if (!currentElement?._id) return;
    setIsBold(currentElement?.attributes.isBold || false);
    setIsItalic(currentElement?.attributes.isItalic || false);
    setIsUnderlined(currentElement?.attributes.isUnderlined || false);
    setIsUppercase(currentElement?.attributes.isUppercase || false);
    setFontSize(currentElement?.attributes.font_size || 28);
  }, [currentElement]);

  return (
    <View>
      <TouchableOpacity
        style={globalStyles.detailedButton}
        onPress={handleShowModal}
      >
        <MaterialCommunityIcons name="format-size" size={32} />
        <Text>Text Format</Text>
      </TouchableOpacity>
      <BottomSheet showModal={showModal} setShowModal={setShowModal}>
        <View style={textFormatStyles.textFormatContainer}>
          <View style={textFormatStyles.buttonContainer}>
            <TouchableOpacity
              onPress={() => {
                setIsBold(
                  (prev) => !prev,
                  (newVal) => handleFontWeight(newVal)
                );
              }}
              style={
                currentElement?.attributes.isBold
                  ? textFormatStyles.acitiveFormatButton
                  : textFormatStyles.formatButton
              }
            >
              <MaterialCommunityIcons
                name={"format-bold"}
                color={colors.accent}
                size={28}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setIsItalic(
                  (prev) => !prev,
                  (newVal) => handleFontStyle(newVal)
                );
              }}
              style={
                currentElement?.attributes.isItalic
                  ? textFormatStyles.acitiveFormatButton
                  : textFormatStyles.formatButton
              }
            >
              <MaterialCommunityIcons
                name={"format-italic"}
                color={colors.accent}
                size={28}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setIsUnderlined(
                  (prev) => !prev,
                  (newVal) => handleTextDecoration(newVal)
                );
              }}
              style={
                currentElement?.attributes.isUnderlined
                  ? textFormatStyles.acitiveFormatButton
                  : textFormatStyles.formatButton
              }
            >
              <MaterialCommunityIcons
                name={"format-underline"}
                color={colors.accent}
                size={28}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setIsUppercase(
                  (prev) => !prev,
                  (newVal) => handleUppercase(newVal)
                );
              }}
              style={
                currentElement?.attributes.isUppercase
                  ? textFormatStyles.acitiveFormatButton
                  : textFormatStyles.formatButton
              }
            >
              <MaterialCommunityIcons
                name={"format-letter-case"}
                color={colors.accent}
                size={28}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Text>Font Size</Text>
            <Text>{fontSize}</Text>
            <Slider
              onValueChange={(value) => {
                setFontSize(value);
                handleFontSize(value);
              }}
              style={{ height: 40 }}
              value={
                currentElement?.attributes.font_size
                  ? currentElement.attributes.font_size
                  : 28
              }
              step={0.5}
              minimumValue={10}
              maximumValue={100}
              minimumTrackTintColor={colors.accent}
              maximumTrackTintColor={colors.primary}
              thumbTintColor={colors.background}
            />
          </View>
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
              style={[globalStyles.listButtonText, { color: colors.whiteText }]}
            >
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </View>
  );
};

export default TextFormatModal;

const textFormatStyles = StyleSheet.create({
  textFormatContainer: {
    justifyContent: "center",
    alignItems: "stretch",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  formatButton: {
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderColor: colors.accent,
    borderWidth: 1.5,
  },
  acitiveFormatButton: {
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderColor: colors.accent,
    backgroundColor: colors.primary,
    borderWidth: 1.5,
  },
});
