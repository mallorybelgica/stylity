import React, { useState } from "react";
import { Button, View } from "react-native";
import StyledTextInput from "../components/common/StyledTextInput";
import { logout } from "../services/auth";
import { imageUploader } from "../helpers/utils";

const UserSettingsScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [fullName, setFullName] = useState("");
  const [image, setImage] = useState("");

  const handleSignout = () => logout();

  return (
    <View>
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
      <Button
        title="upload image"
        onPress={() => imageUploader("6315689a4ae6d7eaf47ac0fc", "user")}
      />
      <Button title="Sign Out" onPress={handleSignout} />
    </View>
  );
};

export default UserSettingsScreen;
