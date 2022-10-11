import React, { FC, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import StyledTextInput from "../components/common/StyledTextInput";
import { login } from "../services/auth";
import { ParamListBase } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import StyledButton from "../components/common/StyledButton";
import { colors } from "../styles/base";
import { globalStyles } from "../styles/global";
import { sign_in } from "../store/users/userSlice";
import StyledSnackbar from "../components/common/StyledSnackbar";

interface Props {
  navigation: StackNavigationProp<ParamListBase>;
}

const LoginScreen: FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleLogin = async () => {
    const res: any = await login({ email, password });

    if (res.status === 401) {
      setErrorMessage(res.errorMessage);
      setShowError(true);
    } else {
      setIsSuccess(true);
      dispatch(sign_in({ token: res.AUTH, authUser: res.USER }));
    }
    Keyboard.dismiss();
  };

  return (
    <View style={loginStyles.container}>
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
        <StyledButton
          title={
            isSuccess ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              "Login"
            )
          }
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
      <StyledSnackbar showSnackbar={showError} setShowSnackbar={setShowError}>
        <Text style={globalStyles.text}>{errorMessage}</Text>
      </StyledSnackbar>
    </View>
  );
};

export default LoginScreen;

const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "space-between",
  },
  signupContainer: {
    marginVertical: 5,
    flexDirection: "row",
  },
});
