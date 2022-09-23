import React, { FC, useRef, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { captureRef } from "react-native-view-shot";
import uuid from "react-native-uuid";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { CanvasElementType, RootStackParamsList } from "../types";
import { globalStyles } from "../styles/global";
import { canvas, user } from "../store/selectors";
import { add_element } from "../store/canvas/canvasSlice";
import { imageUploader } from "../helpers/utils";
import { createCanvas, updateCanvas } from "../services/canvas";
import { uploadImage } from "../services/assets";
import ImageElement from "../components/canvas/ImageElement";
import TextElement from "../components/canvas/TextElement";
import EditPanel from "../components/canvas/modals/EditPanel";
import { RouteProp } from "@react-navigation/native";

interface Props {
  route: RouteProp<RootStackParamsList, "EditCanvas">;
}

const EditCanvasScreen: FC<Props> = (props) => {
  const { route } = props;
  const dispatch = useDispatch();
  const canvasRef = useRef<View>(null);
  const canvasId = route.params ? route.params.canvasId : "";
  const { currentUser } = useSelector(user);
  const { background_color, elements, caption } = useSelector(canvas);
  const [currentElement, setCurrentElement] = useState<
    CanvasElementType | undefined
  >();

  const saveCanvas = async () => {
    try {
      console.log("test");
      const uri = await captureRef(canvasRef, {
        format: "png",
        quality: 0.5,
      });

      const res: any = await uploadImage({
        owner_id: "123",
        owner_type: "user",
        uri: uri,
      });

      console.log({ res });

      const screenshot = res.data.asset._id;
      const user_id = currentUser._id;

      if (canvasId) {
        updateCanvas(canvasId, {
          user_id,
          elements,
          screenshot,
          caption,
          background_color,
        });
      } else {
        createCanvas({
          user_id,
          elements,
          screenshot,
          caption,
          background_color,
        });
      }
    } catch (err) {
      return err;
    }
  };

  const addImageElement = async () => {
    const element_id = await uuid.v4().toString();
    const res: any = await imageUploader(element_id, "canvas_element");
    console.log({ res });
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
        <ScrollView horizontal={true}>
          <View style={canvasStyles.buttonContainer}>
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
            <EditPanel currentElement={currentElement} />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default EditCanvasScreen;

const canvasStyles = StyleSheet.create({
  container: {
    alignSelf: "stretch",
    justifyContent: "center",
    padding: 10,
    flex: 1,
  },
  canvas: {
    height: 450,
    overflow: "hidden",
    alignSelf: "stretch",
    borderColor: "#f6f6f6",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
