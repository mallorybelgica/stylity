import React from "react";
import { Image, TouchableOpacity, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { RootStackParamsList } from "../../..";
import { colors } from "../../styles/base";

import EditCanvasScreen from "../../screens/EditCanvasScreen";
import ProfileScreen from "../../screens/ProfileScreen";
import HomeFeedScreen from "../../screens/HomeFeedScreen";
import UserSettingsScreen from "../../screens/UserSettingsScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: navigatorStyles.bottomContainer,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
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
        component={HomeFeedScreen}
      />
      <Tab.Screen
        name="EditCanvas"
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
        component={EditCanvasScreen}
      />
      <Tab.Screen
        name="Profile"
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
        component={ProfileScreen}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#000",
          tabBarInactiveTintColor: "#000",
          tabBarButton: () => null,
        }}
        name="Settings"
        component={UserSettingsScreen}
      />
    </Tab.Navigator>
  );
};

const Navigators = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BottomNavigator"
        options={{
          header: () => {
            return (
              <View style={navigatorStyles.header}>
                <Image
                  style={navigatorStyles.logo}
                  source={require("../../../assets/logo3.png")}
                />
                <TouchableOpacity
                  onPress={() => navigation.navigate("Settings")}
                  style={navigatorStyles.icon}
                >
                  <MaterialCommunityIcons
                    name={
                      //   currentRoute === "Settings" ? "cog" : "cog-outline"
                      "cog-outline"
                    }
                    color={colors.whiteText}
                    size={26}
                  />
                </TouchableOpacity>
              </View>
            );
          },
        }}
        component={BottomNavigator}
      />
    </Stack.Navigator>
  );
};

export default Navigators;

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
