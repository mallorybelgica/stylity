import { ParamListBase } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { FC, SetStateAction, useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import StyledButton from "../components/common/StyledButton";
import StyledTextInput from "../components/common/StyledTextInput";
import { register } from "../services/auth";
import { sign_in } from "../store/auth/authSlice";
import { user } from "../store/selectors";
import { get_current_user } from "../store/users/userSlice";
import { colors } from "../styles/base";
import { globalStyles } from "../styles/global";

interface Props {
  navigation: StackNavigationProp<ParamListBase>;
}

const SignupScreen: FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [fullName, setFullName] = useState("");

  const handleSignup = async () => {
    const res: any = await register({
      email,
      password,
      display_name: displayName,
      full_name: fullName,
    });

    if (res) {
      dispatch(sign_in(res.AUTH));
    }
  };

  return (
    <View style={signupStyles.container}>
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
      <StyledButton
        title="Create Account"
        bgColor={colors.accent}
        titleColor={colors.whiteText}
        customButtonStyles={{
          height: 60,
          justifyContent: "center",
          marginHorizontal: 0,
          marginVertical: 5,
        }}
        customTitleStyles={{ fontSize: 16 }}
        handler={handleSignup}
      />
      <View style={signupStyles.loginContainer}>
        <Text style={globalStyles.text}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={[globalStyles.headerText, { marginHorizontal: 5 }]}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignupScreen;

const signupStyles = StyleSheet.create({
  container: {
    padding: 10,
  },
  loginContainer: {
    marginVertical: 5,
    flexDirection: "row",
  },
});
