import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { store } from "./src/store/store";
import { isAuthenticated } from "./src/services/auth";

import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";
import Navigators from "./src/components/navigators/Navigators";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { globalStyles } from "./src/styles/global";

const Stack = createNativeStackNavigator();

export default function App() {
  const [authed, setAuthed] = useState<boolean | null>(null);

  const handleAuthentication = async () => setAuthed(await isAuthenticated());

  useEffect(() => {
    handleAuthentication();
  }, []);

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={globalStyles.container}>
        <NavigationContainer>
          <Stack.Navigator>
            {authed ? (
              <Stack.Screen
                options={{ headerShown: false }}
                name={"Navigators"}
                component={Navigators}
              />
            ) : (
              <>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Signup" component={SignupScreen} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </Provider>
  );
}
