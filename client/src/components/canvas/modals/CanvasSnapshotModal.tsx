import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch } from "react-redux";
import { toggle_modal } from "../../../store/modal/modalSlice";
import { colors } from "../../../styles/base";
import { globalStyles } from "../../../styles/global";
import BottomSheet from "../../common/BottomSheet";

const { width, height } = Dimensions.get("window");

const HomeFeedMenu = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const handleModal = () => {
    setShowModal(!showModal);
    dispatch(toggle_modal(!showModal));
  };

  return (
    <View>
      <TouchableOpacity onPress={handleModal} style={menuStyles.modalButton}>
        <MaterialCommunityIcons
          name="dots-horizontal"
          color={colors.primaryText}
          size={26}
        />
      </TouchableOpacity>
      <BottomSheet
        customHeight={0.25}
        showModal={showModal}
        setShowModal={handleModal}
      >
        <View style={menuStyles.container}>
          <View style={menuStyles.buttonContainer}>
            <TouchableOpacity
              style={[globalStyles.detailedButton, menuStyles.menuButton]}
            >
              <MaterialCommunityIcons
                name="comment-off-outline"
                color={colors.primaryText}
                size={26}
              />
              <Text style={menuStyles.buttonText}>Comments off</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[globalStyles.detailedButton, menuStyles.menuButton]}
            >
              <MaterialCommunityIcons
                name="pencil-outline"
                color={colors.primaryText}
                size={26}
              />
              <Text style={menuStyles.buttonText}>Edit canvas</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[globalStyles.detailedButton, menuStyles.menuButton]}
            >
              <MaterialCommunityIcons
                name="delete-outline"
                color={colors.primaryText}
                size={26}
              />
              <Text style={menuStyles.buttonText}>Delete canvas</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

export default HomeFeedMenu;

const menuStyles = StyleSheet.create({
  modalButton: {
    alignSelf: "flex-end",
    marginBottom: 2.5,
  },
  menuButton: {
    alignItems: "center",
    justifyContent: "center",
    height: 75,
    textAlign: "center",
    width: width / 3 - 15,
    borderRadius: 10,
    borderWidth: 1.5,
    marginHorizontal: 5,
    marginVertical: 10,
    borderColor: colors.lightText,
  },
  buttonText: {
    textAlign: "center",
    whiteSpace: "normal",
    color: colors.primaryText,
  },
  container: {
    justifyContent: "center",
    alignItems: "stretch",
    boxSizing: "border-box",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
