import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";

import { NavigationContainer } from "@react-navigation/native";
import { Animated, Platform } from "react-native";
import { store } from "./src/store/store";
import { getAuthUser, isAuthenticated } from "./src/services/auth";
import { navigationRef } from "./src/navigation/RouteNavigation";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { globalStyles } from "./src/styles/global";
import { useDispatch } from "react-redux";
import { get_current_user } from "./src/store/users/userSlice";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PublicStackNavigator } from "./src/navigation/StackNavigator";
import { getUser } from "./src/services/user";
import BottomTabNavigator from "./src/navigation/BottomTabNavigation";
import { useSelector } from "react-redux";
import { modal } from "./src/store/selectors";

export default function AppWrapper() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </SafeAreaProvider>
  );
}

function App() {
  const dispatch = useDispatch();
  const { isOpen } = useSelector(modal);
  const fadeAnimation = new Animated.Value(0);
  const [authed, setAuthed] = useState<boolean | null>(null);
  console.log({ Platform });
  const handleAuthentication = async () => setAuthed(await isAuthenticated());
  const handleAuthUser = async () => {
    const res = await getAuthUser();
    if (res) {
      const authUserId = JSON.parse(res);
      const authUser = await getUser(authUserId);

      if (authUserId) {
        dispatch(get_current_user(authUser.data));
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      Animated.timing(fadeAnimation, {
        toValue: 0.3,
        duration: 600,
        useNativeDriver: true,
      }).start();
    }
  }, [isOpen]);

  useEffect(() => {
    if (authed) {
      handleAuthUser();
    }
  }, [authed]);

  useEffect(() => {
    handleAuthentication();
  }, []);

  return (
    <GestureHandlerRootView style={globalStyles.container}>
      <NavigationContainer ref={navigationRef}>
        {authed ? <BottomTabNavigator /> : <PublicStackNavigator />}
        {isOpen && (
          <Animated.View
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "black",
              opacity: fadeAnimation,
            }}
          ></Animated.View>
        )}
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
