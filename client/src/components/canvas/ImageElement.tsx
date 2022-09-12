import React, { FC, useEffect } from "react";
import { Animated, StyleSheet } from "react-native";
import {
  PanGestureHandler,
  PinchGestureHandler,
  RotationGestureHandler,
} from "react-native-gesture-handler";
import { REACT_APP_AWS_URL } from "@env";

import { CanvasElement } from "../../types";
import { ElementGestureHandler } from "./gestures/ElementGestureHandler";
import { useDispatch } from "react-redux";
import { get_current_element } from "../../store/canvas/canvasSlice";

interface Props {
  element: CanvasElement;
  index: number;
}

const ImageElement: FC<Props> = ({ element, index }) => {
  const dispatch = useDispatch();
  const IMAGE_URL: string = `${REACT_APP_AWS_URL}/${element.image_id}.jpeg`;

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

  useEffect(() => {
    setCurrentElement(element);
  }, [element]);

  return (
    <PanGestureHandler
      onGestureEvent={panGestureEvent}
      onHandlerStateChange={panGestureHandler}
    >
      <Animated.View
        ref={viewRef}
        onTouchStart={() => dispatch(get_current_element)}
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
});
