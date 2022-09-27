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
  detailedButton: {
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  listButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 50,
    padding: 5,
    textAlign: "center",
    borderRadius: 5,
    borderWidth: 1.5,
    marginVertical: 5,
    borderColor: colors.accent,
  },
  listButtonText: {
    textTransform: "uppercase",
    fontWeight: "700",
    fontSize: 14,
    paddingHorizontal: 15,
    textAlign: "center",
    whiteSpace: "normal",
    color: colors.accent,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  text: {
    fontSize: 16,
  },
  profilePic: {
    height: 50,
    width: 50,
    borderRadius: 100,
  },
});
