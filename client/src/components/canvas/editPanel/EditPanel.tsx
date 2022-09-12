import { useState } from "react";
import { Pressable, View } from "react-native";
import ColorModal from "./ColorModal";
import FontFamilyModal from "./FontFamilyModal";

const EditPanel = () => {
  return (
    <View>
      <ColorModal />
      <FontFamilyModal />
    </View>
  );
};

export default EditPanel;
