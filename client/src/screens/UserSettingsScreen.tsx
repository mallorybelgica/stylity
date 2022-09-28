import React, { FC, SetStateAction, useEffect, useState } from "react";
import {
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import StyledTextInput from "../components/common/StyledTextInput";
import { logout } from "../services/auth";
import { imageUploader } from "../helpers/utils";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamsList, UserType } from "../types";
import { useSelector } from "react-redux";
import { user } from "../store/selectors";
import { REACT_APP_AWS_URL } from "@env";
import { globalStyles } from "../styles/global";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { updateUser } from "../services/user";
import {
  logout_current_user,
  update_current_user,
} from "../store/users/userSlice";
import { useDispatch } from "react-redux";
import { sign_out } from "../store/auth/authSlice";

const UserSettingsScreen = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [fullName, setFullName] = useState("");
  const [profilePic, setProfilePic] = useState("");

  const profilePicHandler = async () => {
    const res: any = await imageUploader(currentUser._id, "user");

    if (res) {
      const imageId = res.data.asset._id.toString();
      updateUser(currentUser._id, {
        ...currentUser,
        profile_pic: imageId,
      });

      dispatch(update_current_user({ profile_pic: imageId }));
      setProfilePic(imageId);
    }
  };

  const handleSignout = () => {
    logout();
    dispatch(sign_out());
  };

  useEffect(() => {
    if (currentUser) {
      setEmail(currentUser.email);
      setDisplayName(currentUser.display_name);
      setFullName(currentUser.full_name);
      setProfilePic(currentUser.profile_pic);
    }
  }, []);

  return (
    <View style={settingsStyles.container}>
      {currentUser && (
        <View>
          <TouchableOpacity onPress={profilePicHandler}>
            {profilePic ? (
              <Image
                source={{
                  uri: `${REACT_APP_AWS_URL}/${profilePic}.jpeg`,
                }}
                style={[
                  globalStyles.profilePic,
                  { alignSelf: "center", width: 70, height: 70 },
                ]}
              />
            ) : (
              <MaterialCommunityIcons
                name="account-circle"
                color={"black"}
                size={70}
                style={[globalStyles.profilePic, { alignSelf: "center" }]}
              />
            )}
          </TouchableOpacity>
          <StyledTextInput
            label="Email"
            setState={setEmail}
            value={email}
            keyboardType="email-address"
            autoCapitalize={"none"}
            textContentType={"emailAddress"}
          />
          <StyledTextInput
            label="Password"
            setState={setPassword}
            value={password}
            secureTextEntry={true}
            autoCapitalize={"none"}
            textContentType={"newPassword"}
          />
          <StyledTextInput
            label="Username"
            setState={setDisplayName}
            value={displayName}
            autoCapitalize={"none"}
          />
          <StyledTextInput
            label="Full Name"
            setState={setFullName}
            value={fullName}
          />
          <Button title="Sign Out" onPress={handleSignout} />
        </View>
      )}
    </View>
  );
};

export default UserSettingsScreen;

const settingsStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "stretch",
    textAlign: "center",
    margin: 10,
  },
});
