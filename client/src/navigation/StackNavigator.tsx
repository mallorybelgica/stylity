import React, { FC, Fragment, SetStateAction } from "react";
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
import {
  Dimensions,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../styles/base";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { navigationRef } from "./RouteNavigation";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { user } from "../store/selectors";
import UserListScreen from "../screens/UsersListScreen";
import ExploreScreen from "../screens/ExploreScreen";
import SearchBar from "../components/search/SearchBar";
import SearchScreen from "../screens/SearchScreen";

const Stack = createStackNavigator<RootStackParamsList>();

const ProfileStackNavigator = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamsList>>();
  const currentScreen = navigationRef.current?.getCurrentRoute()?.name;
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
        })}
        name="Profile"
        component={ProfileScreen}
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
        name="UserList"
        component={UserListScreen}
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
        options={{
          headerStyle: {
            backgroundColor: colors.accent,
          },
          headerTintColor: colors.whiteText,
          headerTitleAlign: "center",
        }}
        name="Settings"
      >
        {(props) => <UserSettingsScreen />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

const CanvasStackNavigator = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamsList>>();
  const currentScreen = navigationRef.current?.getCurrentRoute()?.name;
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
        })}
        name="Profile"
        component={ProfileScreen}
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
        name="UserList"
        component={UserListScreen}
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
        name="Settings"
      >
        {(props) => <UserSettingsScreen />}
      </Stack.Screen>
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
              onPress={() => navigation.navigate("SearchAndExplore")}
              style={navStyles.icon}
            >
              <MaterialCommunityIcons
                name={"magnify"}
                color={colors.whiteText}
                size={26}
              />
            </TouchableOpacity>
          ),
        }}
        name="HomeFeed"
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
        })}
        name="Profile"
        component={ProfileScreen}
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
        name="UserList"
        component={UserListScreen}
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
          headerTitle: () => <SearchBar />,
        }}
        name="Explore"
        component={ExploreScreen}
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
      >
        {(props) => <UserSettingsScreen />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

const ExploreStackNavigator = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamsList>>();
  const currentScreen = navigationRef.current?.getCurrentRoute()?.name;

  return (
    <Stack.Navigator
      initialRouteName="Explore"
      screenOptions={{ cardStyle: { backgroundColor: "#fff" } }}
    >
      <Stack.Screen
        name="Explore"
        options={{
          headerStyle: {
            backgroundColor: colors.accent,
          },
          headerTitle: () => (
            <TouchableOpacity
              style={{ position: "relative" }}
              onPress={() => navigation.navigate("Search")}
            >
              <View
                style={{ position: "absolute", top: 7, left: 7, zIndex: 10 }}
              >
                <MaterialCommunityIcons
                  color={colors.primaryText}
                  name={"magnify"}
                  size={22}
                />
              </View>
              <TextInput
                placeholder="Search"
                placeholderTextColor={colors.primaryText}
                pointerEvents={"none"}
                style={{
                  fontSize: 16,
                  width: Dimensions.get("window").width - 30,
                  height: 35,
                  backgroundColor: "#fff",
                  borderRadius: 20,
                  paddingVertical: 10,
                  paddingLeft: 35,
                  paddingRight: 10,
                }}
              />
            </TouchableOpacity>
          ),
        }}
        component={ExploreScreen}
      />
      <Stack.Screen
        name="Search"
        options={{
          headerLeft: () => null,
          headerStyle: {
            backgroundColor: colors.accent,
          },
        }}
        component={SearchScreen}
      />
      <Stack.Screen
        options={({ route }) => ({
          headerStyle: {
            backgroundColor: colors.accent,
          },
          headerTintColor: colors.whiteText,
          headerTitleAlign: "center",
          title: route.params.name,
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
        })}
        name="Profile"
        component={ProfileScreen}
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
        name="UserList"
        component={UserListScreen}
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
        options={{
          headerStyle: {
            backgroundColor: colors.accent,
          },
          headerTintColor: colors.whiteText,
          headerTitleAlign: "center",
        }}
        name="Settings"
      >
        {(props) => <UserSettingsScreen />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

const PublicStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ cardStyle: { backgroundColor: "#fff" } }}>
      <Stack.Screen
        name="Login"
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
        }}
      >
        {(props) => <LoginScreen {...props} />}
      </Stack.Screen>
      <Stack.Screen
        name="Signup"
        options={{
          headerStyle: {
            backgroundColor: colors.accent,
          },
          headerTintColor: colors.whiteText,
        }}
      >
        {(props) => <SignupScreen {...props} />}
      </Stack.Screen>
      <Stack.Screen name="Home">
        {(props) => <MainStackNavigator />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export {
  MainStackNavigator,
  PublicStackNavigator,
  ProfileStackNavigator,
  CanvasStackNavigator,
  ExploreStackNavigator,
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
