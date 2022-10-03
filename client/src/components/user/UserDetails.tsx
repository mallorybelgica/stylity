import { REACT_APP_AWS_URL } from "@env";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { FC } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { globalStyles } from "../../styles/global";
import { RootStackParamsList, UserType } from "../../types";

interface Props {
  user: UserType;
}

const UserDetails: FC<Props> = ({ user }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamsList>>();

  return (
    <View style={userDetailsStyles.userDetails}>
      {user.profile_pic ? (
        <Image
          source={{
            uri: `${REACT_APP_AWS_URL}/${user.profile_pic}.jpeg`,
          }}
          style={globalStyles.profilePic}
        />
      ) : (
        <MaterialCommunityIcons name="account-circle" color="black" size={50} />
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
  );
};

export default UserDetails;

const userDetailsStyles = StyleSheet.create({
  userDetails: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
