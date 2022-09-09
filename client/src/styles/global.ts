import { colors } from "./base";
import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
    boxSizing: "border-box",
    color: colors.primaryText,
  },
  border: {
    borderBottomColor: colors.lightText,
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});
