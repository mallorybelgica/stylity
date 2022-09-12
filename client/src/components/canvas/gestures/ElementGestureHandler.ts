import { useRef, useState } from "react";
import { Animated, View, Image } from "react-native";
import { State } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { update_element_attributes } from "../../../store/canvas/canvasSlice";
import { canvas } from "../../../store/selectors";
import { CanvasElement } from "../../../types";

export const ElementGestureHandler = () => {
  const dispatch = useDispatch();
  const { currentElement } = useSelector(canvas);

  const viewRef = useRef<View>();
  const imageRef = useRef<Image>();

  const translateX = new Animated.Value(0);
  const translateY = new Animated.Value(0);

  const baseScale = new Animated.Value(1);
  const newScale = new Animated.Value(1);

  const newWidth = new Animated.Value(0);
  const newHeight = new Animated.Value(0);

  const scale = Animated.multiply(baseScale, newScale);

  const rotate = new Animated.Value(
    currentElement?.attributes.rotate ? currentElement.attributes.rotate : 0
  );

  const rotateStr = rotate.interpolate({
    inputRange: [-100, 100],
    outputRange: ["-100rad", "100rad"],
  });

  let lastScale = 1;
  let lastRotate = 0;
  let lastOffset = { x: 0, y: 0 };

  const panGestureEvent: any = Animated.event(
    [
      {
        nativeEvent: {
          translationX: translateX,
          translationY: translateY,
        },
      },
    ],
    { useNativeDriver: true }
  );

  const panGestureHandler: any = (ev: any) => {
    if (ev.nativeEvent.oldState === State.ACTIVE) {
      lastOffset.x += ev.nativeEvent.translationX;
      lastOffset.y += ev.nativeEvent.translationY;
      translateX.setOffset(lastOffset.x);
      translateX.setValue(0);
      translateY.setOffset(lastOffset.y);
      translateY.setValue(0);
    }

    if (ev.nativeEvent.state === State.END && viewRef.current !== null) {
      viewRef?.current?.measure(
        (
          x: number,
          y: number,
          width: number,
          height: number,
          px: number,
          py: number
        ) => {
          dispatch(
            update_element_attributes({
              _id: currentElement?._id,
              attributes: {
                position: { left: x, top: y },
              },
            })
          );
        }
      );
    }
  };

  const pinchGestureEvent: any = Animated.event(
    [{ nativeEvent: { scale: newScale } }],
    { useNativeDriver: true }
  );

  const pinchGestureHandler: any = (ev: any) => {
    if (ev.nativeEvent.oldState === State.ACTIVE) {
      lastScale *= ev.nativeEvent.scale;
      baseScale.setValue(lastScale);
      newScale.setValue(1);
    }

    if (ev.nativeEvent.state === State.END && imageRef.current !== null) {
      imageRef?.current?.measure(
        (
          x: number,
          y: number,
          width: number,
          height: number,
          px: number,
          py: number
        ) => {
          newWidth.setValue(width);
          newHeight.setValue(height);

          dispatch(
            update_element_attributes({
              _id: currentElement?._id,
              attributes: {
                dimensions: {
                  width: newWidth._value,
                  height: newHeight._value,
                },
              },
            })
          );
        }
      );
    }
  };

  const rotateGestureEvent: any = Animated.event(
    [{ nativeEvent: { rotation: rotate } }],
    { useNativeDriver: true }
  );

  const rotateGestureHandler: any = (ev: any) => {
    if (ev.nativeEvent.oldState === State.ACTIVE) {
      lastRotate += ev.nativeEvent.rotation;
      rotate.setOffset(lastRotate);
      rotate.setValue(0);
    }

    if (ev.nativeEvent.state === State.END && imageRef.current !== null) {
      dispatch(
        update_element_attributes({
          _id: currentElement?._id,
          attributes: {
            rotate: rotate._offset,
          },
        })
      );
    }
  };

  return [
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
  ];
};
