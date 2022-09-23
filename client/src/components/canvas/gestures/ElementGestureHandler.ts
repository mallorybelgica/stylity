import { useRef, useState, createRef } from "react";
import { Animated, View, Image } from "react-native";
import { State } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { update_element_attributes } from "../../../store/canvas/canvasSlice";
import { CanvasElementType } from "../../../types";

export const ElementGestureHandler = () => {
  const dispatch = useDispatch();
  const [gesturedElement, setGesturedElement] = useState<
    CanvasElementType | undefined
  >();

  const panRef = createRef();
  const rotationRef = createRef();
  const pinchRef = createRef();

  const viewRef = useRef<View>();
  const imageRef = useRef<Image>();

  const translateX = new Animated.Value(0);
  const translateY = new Animated.Value(0);

  const baseScale = new Animated.Value(1);
  const newScale = new Animated.Value(1);

  const scale = Animated.multiply(baseScale, newScale);

  const rotate = new Animated.Value(
    gesturedElement?.attributes.rotate ? gesturedElement.attributes.rotate : 0
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
              _id: gesturedElement?._id,
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

    if (ev.nativeEvent.state === State.END) {
      if (gesturedElement?.type === "image" && imageRef.current !== null) {
        imageRef?.current?.measure(
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
                _id: gesturedElement?._id,
                attributes: {
                  dimensions: {
                    width: width,
                    height: height,
                  },
                },
              })
            );
          }
        );
      } else if (gesturedElement?.type === "text") {
        dispatch(
          update_element_attributes({
            _id: gesturedElement?._id,
            attributes: {
              font_size:
                gesturedElement.attributes.font_size &&
                gesturedElement.attributes.font_size * lastScale,
            },
          })
        );
      }
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
      rotate.setValue(lastRotate);
    }

    if (
      gesturedElement &&
      ev.nativeEvent.state === State.END &&
      imageRef.current !== null
    ) {
      dispatch(
        update_element_attributes({
          _id: gesturedElement?._id,
          attributes: {
            rotate: rotate._offset,
          },
        })
      );
      setGesturedElement({
        ...gesturedElement,
        attributes: { ...gesturedElement?.attributes, rotate: rotate._offset },
      });
    }
  };

  return [
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
  ];
};
