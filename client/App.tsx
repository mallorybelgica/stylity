import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";

import { NavigationContainer } from "@react-navigation/native";
import { Animated, Platform } from "react-native";
import { store } from "./src/store/store";
import { getAuthUser, getToken, isAuthenticated } from "./src/services/auth";
import { navigationRef } from "./src/navigation/RouteNavigation";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { globalStyles } from "./src/styles/global";
import { useDispatch } from "react-redux";
import { currentUser, get_current_user } from "./src/store/users/userSlice";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PublicStackNavigator } from "./src/navigation/StackNavigator";
import { getUser } from "./src/services/user";
import BottomTabNavigator from "./src/navigation/BottomTabNavigation";
import { useSelector } from "react-redux";
import { auth, modal, user } from "./src/store/selectors";
import { restore_token } from "./src/store/auth/authSlice";

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
  const { userToken } = useSelector(auth);
  const { isOpen } = useSelector(modal);
  const fadeAnimation = new Animated.Value(0);

  const handleAuthentication = async () => {
    let userToken: string | null;
    let user: any;
    try {
      const res: any = await getAuthUser();

      if (res) {
        user = JSON.parse(res);
        userToken = await getToken();

        if (userToken && user) {
          dispatch(restore_token({ userToken }));
          dispatch(get_current_user(user));
        }
      }
    } catch (err) {
      console.log({ err });
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
    handleAuthentication();
  }, []);

  return (
    <GestureHandlerRootView style={globalStyles.container}>
      <NavigationContainer ref={navigationRef}>
        {userToken ? <BottomTabNavigator /> : <PublicStackNavigator />}
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
