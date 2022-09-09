import React, { FC, useState } from "react";
import { Text, View, Button } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import StyledTextInput from "../components/common/StyledTextInput";
import { login } from "../services/auth";
import { ParamListBase } from "@react-navigation/native";

interface Props {
  navigation: StackNavigationProp<ParamListBase>;
}

const LoginScreen: FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async () => {
    const user = await login({ email, password });
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
      <Button title="Login" onPress={handleLogin} />
      <View>
        <Text>New User?</Text>
        <Button
          title="Sign up here"
          onPress={() => navigation.navigate("Signup")}
        />
      </View>
    </View>
  );
};

export default LoginScreen;
