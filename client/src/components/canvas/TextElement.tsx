import React, { FC, useState, useEffect } from "react";
import { Animated, StyleSheet, TextInput, Text } from "react-native";
import {
  PanGestureHandler,
  PinchGestureHandler,
  RotationGestureHandler,
} from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import {
  get_current_element,
  update_element,
} from "../../store/canvas/canvasSlice";
import { CanvasElement } from "../../types";
import { ElementGestureHandler } from "./gestures/ElementGestureHandler";

interface Props {
  element: CanvasElement;
  index: number;
}

const TextElement: FC<Props> = ({ element, index }) => {
  const dispatch = useDispatch();
  const [textValue, setTextValue] = useState("");
  const [editText, setEditText] = useState(false);

  const [
    viewRef,
    imageRef,
    scale,
    rotate,
    rotateStr,
    translateX,
    translateY,
    panGestureEvent,
    panGestureHandler,
    pinchGestureEvent,
    pinchGestureHandler,
    rotateGestureEvent,
    rotateGestureHandler,
    setCurrentElement,
  ] = ElementGestureHandler();

  const handleTextInput = (value: string) => {
    setTextValue(value);
    dispatch(update_element({ _id: element._id, text: value }));
  };

  useEffect(() => {
    if (element.text) {
      setTextValue(element.text);
    }
  }, [element.text]);

  return (
    <PanGestureHandler
      onGestureEvent={panGestureEvent}
      onHandlerStateChange={panGestureHandler}
    >
      <Animated.View
        ref={viewRef}
        onTouchStart={() => dispatch(get_current_element(element))}
        style={[
          textStyles.container,
          {
            left: element.attributes.position.left,
            top: element.attributes.position.top,
            transform: [{ translateX: translateX }, { translateY: translateY }],
            zIndex: index,
          },
        ]}
      >
        <RotationGestureHandler
          onGestureEvent={rotateGestureEvent}
          onHandlerStateChange={rotateGestureHandler}
        >
          <Animated.View>
            <PinchGestureHandler
              onGestureEvent={pinchGestureEvent}
              onHandlerStateChange={pinchGestureHandler}
            >
              <Animated.View
                style={{
                  transform: [
                    { perspective: 200 },
                    { rotate: rotateStr },
                    { scale: scale },
                  ],
                }}
              >
                {editText ? (
                  <TextInput
                    style={{
                      fontSize: element.attributes.font_size,
                      fontFamily: element.attributes.font_family,
                      fontWeight: element.attributes.isBold ? "bold" : "normal",
                      color: element.attributes.color,
                    }}
                    value={textValue}
                    onChangeText={(value) => handleTextInput(value)}
                    onBlur={() => setEditText(false)}
                    autoFocus
                  />
                ) : (
                  <Text
                    style={{
                      fontSize: element.attributes.font_size,
                      fontFamily: element.attributes.font_family,
                      fontWeight: element.attributes.isBold ? "bold" : "normal",
                      color: element.attributes.color,
                    }}
                    onPress={() => setEditText(true)}
                  >
                    {textValue}
                  </Text>
                )}
              </Animated.View>
            </PinchGestureHandler>
          </Animated.View>
        </RotationGestureHandler>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default TextElement;

const textStyles = StyleSheet.create({
  container: {
    position: "absolute",
    alignItems: "center",
  },
});
