import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";

const ActivityLoader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default ActivityLoader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "center",
    boxSizing: "border-box",
  },
});
