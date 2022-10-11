import React, { FC, useEffect, useRef, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { captureRef } from "react-native-view-shot";
import uuid from "react-native-uuid";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { CanvasElementType, RootStackParamsList } from "../types";
import { globalStyles } from "../styles/global";
import { canvas, user } from "../store/selectors";
import {
  add_element,
  reset_canvas,
  update_canvas,
} from "../store/canvas/canvasSlice";
import { imageUploader } from "../helpers/utils";
import { createCanvas, getCanvas, updateCanvas } from "../services/canvas";
import { uploadImage } from "../services/assets";
import ImageElement from "../components/canvas/ImageElement";
import TextElement from "../components/canvas/TextElement";
import EditPanel from "../components/canvas/modals/EditPanel";
import { RouteProp, useNavigation } from "@react-navigation/native";
import StyledSnackbar from "../components/common/StyledSnackbar";
import { StackNavigationProp } from "@react-navigation/stack";
interface Props {
  route: RouteProp<RootStackParamsList, "EditCanvas">;
}

const EditCanvasScreen: FC<Props> = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation<StackNavigationProp<RootStackParamsList>>();
  const { route } = props;
  const canvasRef = useRef<View>(null);
  const canvasId = route.params ? route.params.canvasId : "";
  const { currentUser } = useSelector(user);
  const { background_color, elements, caption } = useSelector(canvas);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [currentElement, setCurrentElement] = useState<
    CanvasElementType | undefined
  >();

  const getExistingCanvas = async () => {
    const canvas = await getCanvas(canvasId);

    if (canvas) {
      dispatch(update_canvas(canvas.data));
    }
  };

  const saveCanvas = async () => {
    try {
      if (elements.length < 1) return;

      const uri = await captureRef(canvasRef, {
        format: "png",
        quality: 0.5,
      });

      const res: any = await uploadImage({
        owner_id: "123",
        owner_type: "user",
        uri: uri,
      });

      const screenshot = res.data.asset._id;
      const user_id = currentUser._id;

      if (canvasId) {
        await updateCanvas(canvasId, {
          user_id,
          elements,
          screenshot,
          caption,
          background_color,
        });
      } else {
        await createCanvas({
          user_id,
          elements,
          screenshot,
          caption,
          background_color,
        });
        dispatch(reset_canvas());
      }

      setShowSnackbar(true);
      navigation.push("Profile", {
        profileUserId: currentUser._id,
        name: currentUser.display_name,
      });
    } catch (err) {
      return err;
    }
  };

  const addImageElement = async () => {
    const element_id = await uuid.v4().toString();
    const res: any = await imageUploader(element_id, "canvas_element");

    if (res) {
      dispatch(
        add_element({
          _id: element_id,
          attributes: {
            dimensions: { width: 250, height: 250 },
            position: { left: 50, top: 50 },
            rotate: 0,
          },
          image_id: res.data.asset._id.toString(),
          createdAt: new Date().toString(),
          type: "image",
        })
      );
    }
  };

  const addTextElement = () => {
    dispatch(
      add_element({
        _id: uuid.v4().toString(),
        attributes: {
          font_family: "Verdana",
          font_size: 28,
          isUppercase: false,
          isBold: false,
          isUnderlined: false,
          isItalic: false,
          color: "#000000",
          position: { left: 50, top: 50 },
          rotate: 0,
        },
        text: "Enter Text Here...",
        createdAt: new Date().toString(),
        type: "text",
      })
    );
  };

  useEffect(() => {
    navigation.addListener("beforeRemove", (ev) => {
      if (elements.length < 1) {
        return;
      }

      ev.preventDefault();

      Alert.alert(
        "Discard changes?",
        "You have unsaved changes. Are you sure you want to discard them and leave the screen?",
        [
          { text: "Don't leave", style: "cancel", onPress: () => {} },
          {
            text: "Discard",
            style: "destructive",
            onPress: () => {
              dispatch(reset_canvas());
              navigation.dispatch(ev.data.action);
            },
          },
        ]
      );
    });
  }, [navigation, elements]);

  useEffect(() => {
    if (canvasId) {
      getExistingCanvas();
    }
  }, [canvasId]);

  return (
    <View style={canvasStyles.container}>
      <View style={{ justifyContent: "center" }}>
        <View
          ref={canvasRef}
          style={[canvasStyles.canvas, { backgroundColor: background_color }]}
        >
          <TouchableOpacity
            style={canvasStyles.canvas}
            onPress={() => setCurrentElement(undefined)}
          ></TouchableOpacity>
          {elements.length > 0 &&
            elements?.map((element, index) => {
              if (element.type === "image") {
                return (
                  <ImageElement
                    element={element}
                    index={index}
                    currentElement={currentElement}
                    setCurrentElement={setCurrentElement}
                    key={index}
                  />
                );
              } else if (element.type === "text") {
                return (
                  <TextElement
                    element={element}
                    currentElement={currentElement}
                    setCurrentElement={setCurrentElement}
                    index={index}
                    key={index}
                  />
                );
              }
            })}
        </View>
        <View style={canvasStyles.buttonContainer}>
          <View style={canvasStyles.mainButtons}>
            {!currentElement && (
              <TouchableOpacity
                style={globalStyles.detailedButton}
                onPress={saveCanvas}
              >
                <MaterialCommunityIcons
                  name="content-save"
                  color="black"
                  size={32}
                />
                <Text>Save Canvas</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={globalStyles.detailedButton}
              onPress={addImageElement}
            >
              <MaterialCommunityIcons name="image-plus" size={32} />
              <Text>New Image</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={globalStyles.detailedButton}
              onPress={addTextElement}
            >
              <MaterialCommunityIcons name="format-text" size={32} />
              <Text>New Text</Text>
            </TouchableOpacity>
          </View>
        </View>
        <EditPanel
          setShowSnackbar={setShowSnackbar}
          currentElement={currentElement}
          setCurrentElement={setCurrentElement}
        />
      </View>
      <StyledSnackbar
        showSnackbar={showSnackbar}
        setShowSnackbar={setShowSnackbar}
      >
        <Text>Caption updated successfully</Text>
      </StyledSnackbar>
    </View>
  );
};

export default EditCanvasScreen;

const canvasStyles = StyleSheet.create({
  container: {
    alignSelf: "stretch",
    justifyContent: "center",
    width: "100%",
    padding: 10,
    flex: 1,
  },
  canvas: {
    width: "100%",
    height: 450,
    maxWidth: 450,
    overflow: "hidden",
    alignSelf: "stretch",
    borderColor: "#f6f6f6",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  mainButtons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
