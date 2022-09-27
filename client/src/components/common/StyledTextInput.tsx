import React, { FC, Dispatch, SetStateAction } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput } from "react-native";
import { colors } from "../../styles/base";
import { globalStyles } from "../../styles/global";

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
    <View style={{ marginVertical: 5, paddingVertical: 10 }}>
      <Text
        style={[
          globalStyles.headerText,
          {
            top: 0,
            left: 25,
            backgroundColor: "#fff",
            position: "absolute",
            paddingHorizontal: 5,
          },
        ]}
      >
        {label}
      </Text>
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
    height: 50,
    padding: 10,
    borderWidth: 2,
    borderColor: colors.lightText,
    borderRadius: 50,
  },
});
