import { FC, SetStateAction, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { colors, fontFamilies } from "../../../constants/attributes";
import BottomSheet from "../../common/BottomSheet";

const FontFamilyModal = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <View>
      <Pressable onPress={() => setShowModal(true)}>
        <Text>font family</Text>
      </Pressable>
      <BottomSheet showModal={showModal} setShowModal={setShowModal}>
        <ScrollView>
          <View style={fontFamilyModalStyles.fontFamilyContainer}>
            {fontFamilies.map((font) => {
              return (
                <Text
                  style={[
                    fontFamilyModalStyles.fontButton,
                    { fontFamily: font.value },
                  ]}
                >
                  {font.label}
                </Text>
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
