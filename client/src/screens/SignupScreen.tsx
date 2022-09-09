import React, { useState } from "react";
import { Button, View } from "react-native";
import StyledTextInput from "../components/common/StyledTextInput";
import { register } from "../services/auth";

const SignupScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [fullName, setFullName] = useState("");

  const handleSignup = async () => {
    const newUser = await register({
      email,
      password,
      display_name: displayName,
      full_name: fullName,
    });
    console.log({ newUser });
    return newUser;
  };

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
      <Button title="Sign up" onPress={handleSignup} />
    </View>
  );
};

export default SignupScreen;
