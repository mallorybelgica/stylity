import React, { FC, useEffect, useState } from "react";
import { Image, TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { REACT_APP_AWS_URL } from "@env";
import { getUser } from "../../services/user";
import { RootStackParamsList, UserType } from "../../types";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { globalStyles } from "../../styles/global";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import UserDetails from "./UserDetails";

interface Props {
  userId: string;
}

const User: FC<Props> = ({ userId }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamsList>>();
  const [user, setUser] = useState<UserType>();

  const getUserDetails = async () => {
    const res = await getUser(userId);

    if (res) {
      setUser(res.data);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, [userId]);

  return (
    <View style={userStyles.container}>
      {user && <UserDetails user={user} />}
    </View>
  );
};

export default User;

const userStyles = StyleSheet.create({
  container: {
    flex: 1,
    height: 80,
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  userDetails: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
