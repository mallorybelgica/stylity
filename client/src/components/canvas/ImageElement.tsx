import React, { FC, SetStateAction, Dispatch } from "react";
import { Animated, StyleSheet } from "react-native";
import {
  PanGestureHandler,
  PinchGestureHandler,
  RotationGestureHandler,
} from "react-native-gesture-handler";
import { REACT_APP_AWS_URL } from "@env";

import { CanvasElementType } from "../../types";
import { ElementGestureHandler } from "./gestures/ElementGestureHandler";
import { colors } from "../../styles/base";

interface Props {
  element: CanvasElementType;
  index: number;
  currentElement: CanvasElementType | undefined;
  setCurrentElement: Dispatch<SetStateAction<CanvasElementType | undefined>>;
}

const ImageElement: FC<Props> = ({
  element,
  currentElement,
  setCurrentElement,
  index,
}) => {
  const IMAGE_URL: string = `${REACT_APP_AWS_URL}/${element.image_id}.jpeg`;

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
          imageStyles.container,
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
          <Animated.View style={imageStyles.wrapper} collapsable={false}>
            <PinchGestureHandler
              ref={pinchRef}
              onGestureEvent={pinchGestureEvent}
              onHandlerStateChange={pinchGestureHandler}
            >
              <Animated.Image
                ref={imageRef}
                source={{ uri: IMAGE_URL }}
                style={[
                  {
                    borderWidth: currentElement?._id === element._id ? 2.5 : 0,
                    borderColor: colors.accent,
                    width: element.attributes.dimensions?.width,
                    height: element.attributes.dimensions?.height,
                    transform: [
                      { perspective: 200 },
                      { rotate: rotateStr },
                      { scale: scale },
                    ],
                  },
                ]}
              />
            </PinchGestureHandler>
          </Animated.View>
        </RotationGestureHandler>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default ImageElement;

const imageStyles = StyleSheet.create({
  container: {
    position: "absolute",
    alignItems: "center",
  },
  wrapper: {
    flex: 1,
  },
});
