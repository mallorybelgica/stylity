import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { update_canvas } from "../../../store/canvas/canvasSlice";
import { toggle_modal } from "../../../store/modal/modalSlice";
import { canvas } from "../../../store/selectors";
import { colors } from "../../../styles/base";
import { globalStyles } from "../../../styles/global";
import BottomSheet from "../../common/BottomSheet";

interface Props {
  setShowSnackbar: Dispatch<SetStateAction<boolean>>;
}

const CaptionModal: FC<Props> = ({ setShowSnackbar }) => {
  const dispatch = useDispatch();
  const { caption } = useSelector(canvas);
  const [showModal, setShowModal] = useState(false);
  const [captionValue, setCaptionValue] = useState("");

  const handleShowSnackbar = () => setShowSnackbar(true);

  const handleShowModal = () => {
    setShowModal(!showModal);
    dispatch(toggle_modal(!showModal));
  };

  useEffect(() => {
    setCaptionValue(caption);
  }, [caption]);

  return (
    <View>
      <TouchableOpacity
        style={globalStyles.detailedButton}
        onPress={handleShowModal}
      >
        <MaterialCommunityIcons name={"card-text-outline"} size={32} />
        <Text>Caption</Text>
      </TouchableOpacity>
      <BottomSheet showModal={showModal} setShowModal={setShowModal}>
        <View>
          <TextInput
            style={captionModalStyles.caption}
            value={captionValue}
            onChangeText={(value) => setCaptionValue(value)}
            editable
            multiline={true}
            numberOfLines={6}
            blurOnSubmit
          />
          <View>
            <TouchableOpacity
              onPress={() => {
                handleShowModal();
                setCaptionValue(caption);
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
                dispatch(update_canvas({ caption: captionValue }));
                handleShowSnackbar();
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
                Save Caption
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

export default CaptionModal;

const captionModalStyles = StyleSheet.create({
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
  caption: {
    fontSize: 16,
    padding: 10,
    marginBottom: 5,
    borderWidth: 1.5,
    borderRadius: 10,
    borderColor: colors.primaryText,
  },
});
