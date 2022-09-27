import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { FC, Fragment, useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deleteCanvas, updateCanvas } from "../../../services/canvas";
import { toggle_modal } from "../../../store/modal/modalSlice";
import { user } from "../../../store/selectors";
import { colors } from "../../../styles/base";
import { globalStyles } from "../../../styles/global";
import { CanvasType, RootStackParamsList } from "../../../types";
import BottomSheet from "../../common/BottomSheet";

interface Props {
  canvas: CanvasType;
  reload: any;
}

const HomeFeedMenu: FC<Props> = ({ canvas, reload }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation<StackNavigationProp<RootStackParamsList>>();
  const { currentUser } = useSelector(user);
  const [showModal, setShowModal] = useState(false);
  const [showDeletePrompt, setShowDeletePrompt] = useState(false);
  const [commentsOff, setCommentsOff] = useState(false);

  const toggleCommentsOff = () => {
    setCommentsOff(true);
    updateCanvas(canvas._id, { ...canvas, comments_off: true });
    reload();
  };

  const toggleCommentsOn = () => {
    setCommentsOff(false);
    updateCanvas(canvas._id, { ...canvas, comments_off: false });
    reload();
  };

  const handleCanvasDeletion = async () => {
    const res = await deleteCanvas(canvas._id);

    if (res) {
      handleShowModal();
      navigation.push("Profile", {
        profileUserId: currentUser._id,
        name: currentUser.display_name,
      });
    }
  };

  const handleShowModal = () => {
    setShowModal(!showModal);
    dispatch(toggle_modal(!showModal));
  };

  useEffect(() => {
    setCommentsOff(canvas.comments_off);
  }, [canvas]);

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          handleShowModal();

          if (!showModal) {
            setShowDeletePrompt(false);
          }
        }}
        style={menuStyles.modalButton}
      >
        <MaterialCommunityIcons
          name="dots-horizontal"
          color={colors.primaryText}
          size={26}
        />
      </TouchableOpacity>
      <BottomSheet showModal={showModal} setShowModal={setShowModal}>
        <View style={menuStyles.container}>
          <View style={menuStyles.buttonContainer}>
            {showDeletePrompt ? (
              <Fragment>
                <Text
                  style={[
                    globalStyles.headerText,
                    { textTransform: "uppercase", textAlign: "center" },
                  ]}
                >
                  Delete canvas?
                </Text>
                <Text
                  style={[
                    globalStyles.text,
                    { marginVertical: 10, textAlign: "center" },
                  ]}
                >
                  All contents will be lost if you delete this canvas.
                </Text>
                <TouchableOpacity
                  onPress={() => setShowDeletePrompt(false)}
                  style={[globalStyles.detailedButton, globalStyles.listButton]}
                >
                  <MaterialCommunityIcons
                    name="arrow-left"
                    color={colors.accent}
                    size={26}
                  />
                  <Text style={globalStyles.listButtonText}>Keep Canvas</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleCanvasDeletion}
                  style={[
                    globalStyles.detailedButton,
                    globalStyles.listButton,
                    { backgroundColor: colors.accent },
                  ]}
                >
                  <MaterialCommunityIcons
                    name="delete-outline"
                    color={colors.whiteText}
                    size={26}
                  />
                  <Text
                    style={[
                      globalStyles.listButtonText,
                      { color: colors.whiteText },
                    ]}
                  >
                    Delete Canvas
                  </Text>
                </TouchableOpacity>
              </Fragment>
            ) : (
              <Fragment>
                <TouchableOpacity
                  onPress={
                    commentsOff === true ? toggleCommentsOn : toggleCommentsOff
                  }
                  style={[
                    globalStyles.detailedButton,
                    globalStyles.listButton,
                    {
                      backgroundColor: commentsOff ? colors.primary : "#fff",
                    },
                  ]}
                >
                  <MaterialCommunityIcons
                    name="comment-off-outline"
                    color={colors.accent}
                    size={26}
                  />
                  <Text style={globalStyles.listButtonText}>
                    {commentsOff === true ? "Show comments" : "Hide comments"}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setShowModal(false);
                    dispatch(toggle_modal(false));
                    navigation.push("EditCanvas", { canvasId: canvas._id });
                  }}
                  style={[globalStyles.detailedButton, globalStyles.listButton]}
                >
                  <MaterialCommunityIcons
                    name="pencil-outline"
                    color={colors.accent}
                    size={26}
                  />
                  <Text style={globalStyles.listButtonText}>Edit canvas</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setShowDeletePrompt(true)}
                  style={[globalStyles.detailedButton, globalStyles.listButton]}
                >
                  <MaterialCommunityIcons
                    name="delete-outline"
                    color={colors.accent}
                    size={26}
                  />
                  <Text style={globalStyles.listButtonText}>Delete canvas</Text>
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
              </Fragment>
            )}
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
  container: {
    justifyContent: "center",
    alignItems: "stretch",
    boxSizing: "border-box",
  },
  buttonContainer: {
    justifyContent: "space-between",
    alignItems: "stretch",
  },
});
