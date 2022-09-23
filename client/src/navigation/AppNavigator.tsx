import React, { FC } from "react";
import { Image, TouchableOpacity, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { colors } from "../styles/base";
import BottomTabNavigator from "./BottomTabNavigation";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamsList } from "../types";

const Stack = createStackNavigator();

interface Props {
  currentRoute: string;
}

const AppNavigator: FC<Props> = ({ currentRoute }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamsList>>();

  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: "#fff" },
      }}
    >
      <Stack.Screen
        name="BottomNavigator"
        options={{
          header: () => {
            return (
              <View style={navigatorStyles.header}>
                <Image
                  style={navigatorStyles.logo}
                  source={require("../../assets/logo3.png")}
                />
                <TouchableOpacity
                  onPress={() => navigation.navigate("Settings")}
                  style={navigatorStyles.icon}
                >
                  <MaterialCommunityIcons
                    name={currentRoute === "Settings" ? "cog" : "cog-outline"}
                    color={colors.whiteText}
                    size={26}
                  />
                </TouchableOpacity>
              </View>
            );
          },
        }}
        component={BottomTabNavigator}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;

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
