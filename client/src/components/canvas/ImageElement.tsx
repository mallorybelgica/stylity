import { REACT_APP_AWS_URL } from "@env";
import React, { FC } from "react";
import { Animated, StyleSheet } from "react-native";
import {
  PanGestureHandler,
  PinchGestureHandler,
  RotationGestureHandler,
} from "react-native-gesture-handler";
import { CanvasElement } from "../../types";
import { ElementDragger } from "./gestures/ElementDragger";
import { ElementResizerAndRotator } from "./gestures/ElementResizerAndRotator";

interface Props {
  element: CanvasElement;
  index: number;
}

const ImageElement: FC<Props> = ({ element, index }) => {
  const [imageViewRef, transX, transY, panGestureEvent, panGestureHandler] =
    ElementDragger();

  const [
    imageRef,
    scale,
    pinchGestureEvent,
    pinchGestureHandler,
    rotateStr,
    rotateGestureEvent,
    rotateGestureHandler,
  ] = ElementResizerAndRotator();

  const IMAGE_URL: string = `${REACT_APP_AWS_URL}/${element.image_id}.jpeg`;

  return (
    <PanGestureHandler
      onGestureEvent={panGestureEvent}
      onHandlerStateChange={panGestureHandler}
    >
      <Animated.View
        ref={imageViewRef}
        style={[
          imageStyles.container,
          {
            left: element.attributes.x,
            top: element.attributes.y,
            transform: [{ translateX: transX }, { translateY: transY }],
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
              <Animated.Image
                ref={imageRef}
                source={{ uri: IMAGE_URL }}
                style={[
                  {
                    width: element.attributes.width,
                    height: element.attributes.height,
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
});
