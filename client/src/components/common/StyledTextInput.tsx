import React, { FC, Dispatch, SetStateAction } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput } from "react-native";

interface Props {
  label: string;
  value: string;
  setState: Dispatch<SetStateAction<any>>;
  keyboardType?: any;
  secureTextEntry?: boolean;
  autoCapitalize?: any;
  textContentType?: any;
}

const StyledTextInput: FC<Props> = ({
  label,
  value,
  setState,
  keyboardType = "default",
  secureTextEntry = false,
  autoCapitalize = "sentences",
  textContentType = "none",
}) => {
  return (
    <View>
      <Text>{label}</Text>
      <TextInput
        onChangeText={(value) => setState(value)}
        value={value}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
        textContentType={textContentType}
        style={styles.input}
      />
    </View>
  );
};

export default StyledTextInput;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 50,
  },
});
