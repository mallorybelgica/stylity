import React from "react";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";

import HomeFeedScreen from "../screens/HomeFeedScreen";
import ProfileScreen from "../screens/ProfileScreen";
import EditCanvasScreen from "../screens/EditCanvasScreen";
import UserSettingsScreen from "../screens/UserSettingsScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import CanvasDetailsScreen from "../screens/CanvasDetailsScreen";
import { RootStackParamsList } from "../types";
import CommentsScreen from "../screens/CommentsScreen";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../styles/base";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { navigationRef } from "./RouteNavigation";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { user } from "../store/selectors";

const Stack = createStackNavigator<RootStackParamsList>();

const ProfileStackNavigator = () => {
  const { currentUser } = useSelector(user);
  return (
    <Stack.Navigator screenOptions={{ cardStyle: { backgroundColor: "#fff" } }}>
      <Stack.Screen
        options={({ route }) => ({
          headerStyle: {
            backgroundColor: colors.accent,
          },
          headerTintColor: colors.whiteText,
          headerTitleAlign: "center",
          title: route.params ? route.params.name : currentUser.display_name,
        })}
        name="Profile"
        component={ProfileScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="EditCanvas"
        component={EditCanvasScreen}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: colors.accent,
          },
          headerTintColor: colors.whiteText,
          headerTitleAlign: "center",
        }}
        name="Canvas"
        component={CanvasDetailsScreen}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: colors.accent,
          },
          headerTintColor: colors.whiteText,
          headerTitleAlign: "center",
        }}
        name="Comments"
        component={CommentsScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Settings"
        component={UserSettingsScreen}
      />
    </Stack.Navigator>
  );
};

const CanvasStackNavigator = () => {
  const { currentUser } = useSelector(user);

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={({ route }) => ({
          headerStyle: {
            backgroundColor: colors.accent,
          },
          headerTintColor: colors.whiteText,
          headerTitleAlign: "center",
          title: route.params ? "Edit Canvas" : "New Canvas",
        })}
        name="EditCanvas"
        component={EditCanvasScreen}
      />
      <Stack.Screen
        options={({ route }) => ({
          cardStyle: {
            backgroundColor: "#fff",
          },
          headerStyle: {
            backgroundColor: colors.accent,
          },
          headerTintColor: colors.whiteText,
          headerTitleAlign: "center",
          title: route.params ? route.params.name : currentUser.display_name,
        })}
        name="Profile"
        component={ProfileScreen}
      />
    </Stack.Navigator>
  );
};

const MainStackNavigator = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamsList>>();
  const currentScreen = navigationRef.current?.getCurrentRoute()?.name;

  return (
    <Stack.Navigator screenOptions={{ cardStyle: { backgroundColor: "#fff" } }}>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: colors.accent,
          },
          headerTitle: () => (
            <Image
              source={require("../../assets/logo3.png")}
              style={navStyles.logo}
            />
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Settings")}
              style={navStyles.icon}
            >
              <MaterialCommunityIcons
                name={currentScreen === "Settings" ? "cog" : "cog-outline"}
                color={colors.whiteText}
                size={26}
              />
            </TouchableOpacity>
          ),
        }}
        name="Home"
        component={HomeFeedScreen}
      />
      <Stack.Screen
        options={({ route }) => ({
          headerStyle: {
            backgroundColor: colors.accent,
          },
          headerTintColor: colors.whiteText,
          headerTitleAlign: "center",
          title: route.params.name,
        })}
        name="Profile"
        component={ProfileScreen}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: colors.accent,
          },
          headerTintColor: colors.whiteText,
          headerTitleAlign: "center",
        }}
        name="Canvas"
        component={CanvasDetailsScreen}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: colors.accent,
          },
          headerTintColor: colors.whiteText,
          headerTitleAlign: "center",
        }}
        name="Comments"
        component={CommentsScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="EditCanvas"
        component={EditCanvasScreen}
      />
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: colors.accent,
          },
          headerTintColor: colors.whiteText,
          headerTitleAlign: "center",
        }}
        name="Settings"
        component={UserSettingsScreen}
      />
    </Stack.Navigator>
  );
};

const PublicStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ cardStyle: { backgroundColor: "#fff" } }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
};

export {
  MainStackNavigator,
  PublicStackNavigator,
  ProfileStackNavigator,
  CanvasStackNavigator,
};

const navStyles = StyleSheet.create({
  logo: {
    width: 200,
    height: 37,
    margin: 10,
  },
  icon: {
    padding: 10,
  },
});
