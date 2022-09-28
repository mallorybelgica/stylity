import React, { FC, SetStateAction } from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { colors } from "../styles/base";

import {
  CanvasStackNavigator,
  MainStackNavigator,
  ProfileStackNavigator,
} from "./StackNavigator";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      sceneContainerStyle={{ backgroundColor: "#fff" }}
      screenOptions={{
        tabBarStyle: navigatorStyles.bottomContainer,
        headerShown: false,
        unmountOnBlur: true,
      }}
      initialRouteName="Home"
    >
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarLabel: "Home",
          tabBarActiveTintColor: "#000",
          tabBarInactiveTintColor: "#000",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "home" : "home-outline"}
              color={color}
              size={26}
            />
          ),
        }}
        name="Home"
      >
        {(props) => <MainStackNavigator />}
      </Tab.Screen>
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#000",
          tabBarInactiveTintColor: "#000",
          tabBarLabel: "Canvas",
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="plus-circle"
              color={colors.accent}
              size={40}
            />
          ),
        }}
        name="EditCanvas"
        component={CanvasStackNavigator}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarLabel: "Profile",
          tabBarActiveTintColor: "#000",
          tabBarInactiveTintColor: "#000",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name={focused ? "account" : "account-outline"}
              color={color}
              size={26}
            />
          ),
        }}
        name="Profile"
        component={ProfileStackNavigator}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

const navigatorStyles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.accent,
    height: 60,
  },
  icon: {
    padding: 10,
  },
  logo: {
    width: 200,
    height: 37,
    margin: 10,
  },
  bottomContainer: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
    height: 70,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 35 },
    shadowOpacity: 0.8,
    shadowRadius: 75,
    elevation: 35,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
