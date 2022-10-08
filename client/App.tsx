import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { Animated } from "react-native";
import { store } from "./src/store/store";
import { getAuthUser, getToken } from "./src/services/auth";
import { navigationRef } from "./src/navigation/RouteNavigation";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { globalStyles } from "./src/styles/global";
import { useDispatch } from "react-redux";
import { get_current_user } from "./src/store/users/userSlice";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PublicStackNavigator } from "./src/navigation/StackNavigator";
import BottomTabNavigator from "./src/navigation/BottomTabNavigation";
import { useSelector } from "react-redux";
import { modal, user } from "./src/store/selectors";
import { restore_token } from "./src/store/users/userSlice";
import ActivityLoader from "./src/components/common/ActivityLoader";

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
  const { userToken, currentUser } = useSelector(user);
  const { isOpen } = useSelector(modal);
  const [isLoading, setIsLoading] = useState(true);
  const fadeAnimation = new Animated.Value(0);

  const handleAuthentication = async () => {
    try {
      const user: any = await getAuthUser();
      const token = await getToken();

      if (token) {
        dispatch(restore_token(userToken));
      }

      if (user) {
        dispatch(get_current_user(JSON.parse(user)));
      }

      setIsLoading(false);
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

  if (isLoading) {
    return <ActivityLoader />;
  }

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
