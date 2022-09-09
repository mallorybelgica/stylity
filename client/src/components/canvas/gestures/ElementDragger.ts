import { useRef } from "react";
import { Animated, View } from "react-native";
import { State } from "react-native-gesture-handler";

export const ElementDragger = () => {
  const imageViewRef = useRef<View>();
  const translateX = new Animated.Value(0);
  const translateY = new Animated.Value(0);

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
      if (imageViewRef.current !== null) {
        imageViewRef?.current?.measure((width: number, height: number) => {
          return { width, height };
        });
      }
    }
  };

  return [
    imageViewRef,
    translateX,
    translateY,
    panGestureEvent,
    panGestureHandler,
  ];
};
