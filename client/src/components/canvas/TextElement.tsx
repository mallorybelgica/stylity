import React, {
  FC,
  useState,
  useEffect,
  SetStateAction,
  Dispatch,
} from "react";
import { Animated, StyleSheet, TextInput, Text } from "react-native";
import {
  PanGestureHandler,
  PinchGestureHandler,
  RotationGestureHandler,
} from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { update_element } from "../../store/canvas/canvasSlice";
import { colors } from "../../styles/base";
import { AttributesType, CanvasElementType } from "../../types";
import { ElementGestureHandler } from "./gestures/ElementGestureHandler";

interface Props {
  element: CanvasElementType;
  index: number;
  currentElement: CanvasElementType | undefined;
  setCurrentElement: Dispatch<SetStateAction<CanvasElementType | undefined>>;
}

const TextElement: FC<Props> = ({
  element,
  currentElement,
  setCurrentElement,
  index,
}) => {
  const dispatch = useDispatch();
  const [originalAttributes, setOriginalAttributes] = useState<
    AttributesType | undefined
  >();
  const [textValue, setTextValue] = useState("");
  const [editText, setEditText] = useState(false);

  const [
    panRef,
    rotationRef,
    pinchRef,
    viewRef,
    imageRef,
    scale,
    rotateStr,
    translateX,
    translateY,
    panGestureEvent,
    panGestureHandler,
    pinchGestureEvent,
    pinchGestureHandler,
    rotateGestureEvent,
    rotateGestureHandler,
    setGesturedElement,
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

  useEffect(() => {
    setOriginalAttributes(element.attributes);
  }, []);

  return (
    <PanGestureHandler
      ref={panRef}
      onGestureEvent={panGestureEvent}
      onHandlerStateChange={panGestureHandler}
    >
      <Animated.View
        ref={viewRef}
        onTouchStart={() => {
          setCurrentElement(element);
          setGesturedElement(element);
        }}
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
          ref={rotationRef}
          onGestureEvent={rotateGestureEvent}
          onHandlerStateChange={rotateGestureHandler}
        >
          <Animated.View style={textStyles.wrapper} collapsable={false}>
            <PinchGestureHandler
              ref={pinchRef}
              onGestureEvent={pinchGestureEvent}
              onHandlerStateChange={pinchGestureHandler}
            >
              <Animated.View
                style={{
                  borderWidth: currentElement?._id === element._id ? 2.5 : 0,
                  borderColor: colors.accent,
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
                      fontStyle: element.attributes.isItalic
                        ? "italic"
                        : "normal",
                      textDecorationLine: element.attributes.isUnderlined
                        ? "underline"
                        : "none",
                      textTransform: element.attributes.isUppercase
                        ? "uppercase"
                        : "none",
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
                      fontStyle: element.attributes.isItalic
                        ? "italic"
                        : "normal",
                      textDecorationLine: element.attributes.isUnderlined
                        ? "underline"
                        : "none",
                      textTransform: element.attributes.isUppercase
                        ? "uppercase"
                        : "none",
                      color: element.attributes.color,
                    }}
                    onLongPress={() => setEditText(true)}
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
  wrapper: {
    flex: 1,
  },
});
