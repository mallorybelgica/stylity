import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import uuid from "react-native-uuid";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { canvas } from "../store/selectors";
import { add_element } from "../store/canvas/canvasSlice";
import { imageUploader } from "../helpers/utils";
import ImageElement from "../components/canvas/ImageElement";

const EditCanvasScreen = () => {
  const dispatch = useDispatch();
  const { elements } = useSelector(canvas);

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
          isBold: false,
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
    <SafeAreaView style={canvasStyles.container}>
      <View>
        <MaterialCommunityIcons
          name="image-plus"
          color="black"
          size={26}
          onPress={addImageElement}
        />
        <MaterialCommunityIcons
          name="format-text"
          color="black"
          size={26}
          onPress={addTextElement}
        />
        {/* <MaterialCommunityIcons
            name="content-save"
            color="black"
            size={26}
            onPress={captureCanvas}
          /> */}
      </View>
      <View style={canvasStyles.canvas}>
        {elements.length > 0 &&
          elements?.map((element, index) => {
            console.log({ elements });
            if (element.type === "image") {
              return (
                <ImageElement element={element} index={index} key={index} />
              );
            } else if (element.type === "text") {
              return <Text>Text</Text>;
            }
          })}
      </View>
    </SafeAreaView>
  );
};

export default EditCanvasScreen;

const canvasStyles = StyleSheet.create({
  container: {
    alignSelf: "stretch",
    padding: 10,
  },
  canvas: {
    height: 450,
    backgroundColor: "#fff",
    overflow: "hidden",
    alignSelf: "stretch",
    borderTopWidth: 3,
    borderBottomWidth: 3,
    borderColor: "#f6f6f6",
  },
});
