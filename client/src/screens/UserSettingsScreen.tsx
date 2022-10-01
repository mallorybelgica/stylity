import React, { useEffect, useState } from "react";
import {
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
} from "react-native";
import StyledTextInput from "../components/common/StyledTextInput";
import { logout } from "../services/auth";
import { imageUploader } from "../helpers/utils";
import { useSelector } from "react-redux";
import { user } from "../store/selectors";
import { REACT_APP_AWS_URL } from "@env";
import { globalStyles } from "../styles/global";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { updateUser, updateUserPassword } from "../services/user";
import { update_current_user } from "../store/users/userSlice";
import { useDispatch } from "react-redux";
import { sign_out } from "../store/auth/authSlice";
import StyledButton from "../components/common/StyledButton";
import { colors } from "../styles/base";
import StyledSnackbar from "../components/common/StyledSnackbar";

const UserSettingsScreen = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(user);
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [fullName, setFullName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

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

  const handlePasswordUpdate = async () => {
    const passwordData = {
      _id: currentUser._id,
      current_password: currentPassword,
      new_password: newPassword,
    };
    const res: any = await updateUserPassword(currentUser._id, passwordData);
    console.log({ res });
    if (res.status === 403) {
      setShowSnackbar(true);
      setSnackbarMessage("The password you entered is incorrect.");
    } else {
      console.log({ res });
      setShowSnackbar(true);
      setSnackbarMessage("Password successfully updated.");
    }
  };

  const handleProfileUpdate = async () => {
    const userData = {
      email: email,
      full_name: fullName,
      display_name: displayName,
      bio: bio,
      profile_pic: profilePic,
    };

    const res: any = await updateUser(currentUser._id, userData);

    if (res.status === 201) {
      dispatch(update_current_user(userData));
      setShowSnackbar(true);
      setSnackbarMessage("Profile successfully updated.");
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
      if (currentUser.bio) {
        setBio(currentUser.bio);
      } else {
        setBio("");
      }
    }
  }, []);

  return (
    <View style={settingsStyles.container}>
      {currentUser && (
        <ScrollView>
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
            label="Current Password"
            setState={setCurrentPassword}
            value={currentPassword}
            secureTextEntry={true}
            autoCapitalize={"none"}
            textContentType={"currentPassword"}
          />
          <StyledTextInput
            label="New Password"
            setState={setNewPassword}
            value={newPassword}
            secureTextEntry={true}
            autoCapitalize={"none"}
            textContentType={"newPassword"}
          />
          <StyledButton
            title={"Update Password"}
            bgColor={colors.accent}
            titleColor={colors.whiteText}
            customButtonStyles={{
              height: 60,
              justifyContent: "center",
              marginHorizontal: 0,
              marginVertical: 5,
            }}
            customTitleStyles={{ fontSize: 16 }}
            handler={handlePasswordUpdate}
          />
          <StyledTextInput
            label="Email"
            setState={setEmail}
            value={email}
            keyboardType="email-address"
            autoCapitalize={"none"}
            textContentType={"emailAddress"}
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
          <StyledTextInput label="Bio" setState={setBio} value={bio} />
          <StyledButton
            title={"Update Profile"}
            bgColor={colors.accent}
            titleColor={colors.whiteText}
            customButtonStyles={{
              height: 60,
              justifyContent: "center",
              marginHorizontal: 0,
              marginVertical: 5,
            }}
            customTitleStyles={{ fontSize: 16 }}
            handler={handleProfileUpdate}
          />
          <Button title="Sign Out" onPress={handleSignout} />
        </ScrollView>
      )}
      <StyledSnackbar
        showSnackbar={showSnackbar}
        setShowSnackbar={setShowSnackbar}
      >
        <Text>{snackbarMessage}</Text>
      </StyledSnackbar>
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
