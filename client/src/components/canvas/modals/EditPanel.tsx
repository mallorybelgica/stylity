import { REACT_APP_AWS_URL, REACT_APP_REMOVE_BG_API } from "@env";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import React, { FC, SetStateAction, Dispatch } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { uploadImage } from "../../../services/assets";
import { update_element } from "../../../store/canvas/canvasSlice";
import { canvas } from "../../../store/selectors";
import { globalStyles } from "../../../styles/global";
import { CanvasElementType } from "../../../types";
import CaptionModal from "./CaptionModal";
import ColorModal from "./ColorModal";
import DeleteCanvasModal from "./DeleteCanvasModal";
import FontFamilyModal from "./FontFamilyModal";
import PositionModal from "./PositionModal";
import TextFormatModal from "./TextFormatModal";

interface Props {
  currentElement: CanvasElementType | undefined;
  setShowSnackbar: Dispatch<SetStateAction<boolean>>;
  setCurrentElement: Dispatch<SetStateAction<CanvasElementType | undefined>>;
}

const EditPanel: FC<Props> = ({
  currentElement,
  setCurrentElement,
  setShowSnackbar,
}) => {
  const dispatch = useDispatch();
  const { elements } = useSelector(canvas);

  const removeBg = async () => {
    try {
      const config: AxiosRequestConfig = {
        url: `https://api.remove.bg/v1.0/removebg`,
        method: "post",
        data: {
          image_url: `${REACT_APP_AWS_URL}/${currentElement?.image_id}.jpeg`,
          size: "auto",
          format: "auto",
          type: "auto",
        },
        headers: {
          "x-api-key": REACT_APP_REMOVE_BG_API,
        },
        responseType: "blob",
      };

      const res: AxiosResponse = await axios(config);

      if (res && currentElement) {
        const newUrl = URL.createObjectURL(res.data);

        const imageRes: any = await uploadImage({
          owner_id: currentElement._id,
          owner_type: "element",
          uri: newUrl,
        });

        dispatch(
          update_element({
            _id: currentElement._id,
            image_id: imageRes.data.asset._id.toString(),
          })
        );
      }
    } catch (err) {
      console.log({ err });
    }
  };

  return (
    <View style={{ alignItems: "center" }}>
      <View style={panelStyles.container}>
        {!currentElement && <CaptionModal setShowSnackbar={setShowSnackbar} />}
        {(currentElement?.type === "text" || !currentElement) && (
          <ColorModal currentElement={currentElement} />
        )}
        {currentElement?.type === "text" && (
          <>
            <FontFamilyModal currentElement={currentElement} />
            <TextFormatModal currentElement={currentElement} />
          </>
        )}
        {currentElement?.type === "image" && (
          <TouchableOpacity
            onPress={removeBg}
            style={globalStyles.detailedButton}
          >
            <MaterialCommunityIcons name={"crop"} size={32} />
            <Text>Remove Background</Text>
          </TouchableOpacity>
        )}
        {elements.length > 1 && (
          <PositionModal currentElement={currentElement} />
        )}
      </View>
      <View style={panelStyles.container}>
        {currentElement && (
          <DeleteCanvasModal
            currentElement={currentElement}
            setCurrentElement={setCurrentElement}
          />
        )}
      </View>
    </View>
  );
};

export default EditPanel;

const panelStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
