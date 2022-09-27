import React, { FC, useEffect, useState } from "react";
import { Image, TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { REACT_APP_AWS_URL } from "@env";
import { getUser } from "../services/user";
import { RootStackParamsList, UserType } from "../types";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { globalStyles } from "../styles/global";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

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
      {user && (
        <View style={userStyles.userDetails}>
          {user.profile_pic ? (
            <Image
              source={{
                uri: `${REACT_APP_AWS_URL}/${user.profile_pic}.jpeg`,
              }}
              style={globalStyles.profilePic}
            />
          ) : (
            <MaterialCommunityIcons
              name="account-circle"
              color="black"
              size={50}
            />
          )}
          <TouchableOpacity
            onPress={() =>
              navigation.push("Profile", {
                profileUserId: user._id,
                name: user.display_name,
              })
            }
          >
            <Text style={[globalStyles.headerText, { marginLeft: 10 }]}>
              {user.display_name}
            </Text>
          </TouchableOpacity>
        </View>
      )}
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
