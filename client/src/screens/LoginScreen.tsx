import React, { FC, SetStateAction, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import StyledTextInput from "../components/common/StyledTextInput";
import { login } from "../services/auth";
import { ParamListBase } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { get_current_user } from "../store/users/userSlice";
import StyledButton from "../components/common/StyledButton";
import { colors } from "../styles/base";
import { globalStyles } from "../styles/global";

interface Props {
  navigation: StackNavigationProp<ParamListBase>;
  setAuthed: SetStateAction<any>;
}

const LoginScreen: FC<Props> = ({ navigation, setAuthed }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async () => {
    const user = await login({ email, password });

    if (user) {
      setAuthed(true);
      dispatch(get_current_user(user));
    }
  };

  return (
    <View style={loginStyles.container}>
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
      <StyledButton
        title="Login"
        bgColor={colors.accent}
        titleColor={colors.whiteText}
        customButtonStyles={{
          height: 60,
          justifyContent: "center",
          marginHorizontal: 0,
          marginVertical: 5,
        }}
        customTitleStyles={{ fontSize: 16 }}
        handler={handleLogin}
      />
      <View style={loginStyles.signupContainer}>
        <Text style={globalStyles.text}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={[globalStyles.headerText, { marginHorizontal: 5 }]}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const loginStyles = StyleSheet.create({
  container: {
    padding: 10,
  },
  signupContainer: {
    marginVertical: 5,
    flexDirection: "row",
  },
});
