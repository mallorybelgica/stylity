import { useRef } from "react";
import { Animated, Image } from "react-native";
import { State } from "react-native-gesture-handler";

export const ElementResizerAndRotator = () => {
  const imageRef = useRef<Image>();
  const baseScale = new Animated.Value(1);
  const newScale = new Animated.Value(1);
  const scale = Animated.multiply(baseScale, newScale);

  const rotate = new Animated.Value(0);
  const rotateStr = rotate.interpolate({
    inputRange: [-100, 100],
    outputRange: ["-100rad", "100rad"],
  });

  let lastScale = 1;
  let lastRotate = 0;

  const pinchGestureEvent: any = Animated.event(
    [{ nativeEvent: { scale: newScale } }],
    { useNativeDriver: true }
  );

  const pinchGestureHandler: any = (event: any) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      lastScale *= event.nativeEvent.scale;
      baseScale.setValue(lastScale);
      newScale.setValue(1);
    }
    if (imageRef.current !== null) {
      imageRef?.current?.measure((width: number, height: number) => {
        return { width, height };
      });
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
  };

  return [
    imageRef,
    scale,
    pinchGestureEvent,
    pinchGestureHandler,
    rotateStr,
    rotateGestureEvent,
    rotateGestureHandler,
  ];
};
