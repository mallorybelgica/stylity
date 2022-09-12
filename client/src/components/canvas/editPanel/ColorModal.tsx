import { FC, SetStateAction, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { colors } from "../../../constants/attributes";
import BottomSheet from "../../common/BottomSheet";

const ColorModal = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <View>
      <Pressable onPress={() => setShowModal(true)}>
        <Text>colors</Text>
      </Pressable>
      <BottomSheet showModal={showModal} setShowModal={setShowModal}>
        <ScrollView>
          <View style={colorModalStyles.colorContainer}>
            {colors.map((color, index) => {
              return (
                <View
                  style={[
                    colorModalStyles.colorButton,
                    { backgroundColor: color },
                  ]}
                  key={index}
                ></View>
              );
            })}
          </View>
        </ScrollView>
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
