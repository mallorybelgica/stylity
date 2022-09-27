import { FC, SetStateAction, Dispatch } from "react";
import { View, StyleSheet } from "react-native";
import { Snackbar } from "react-native-paper";

interface Props {
  children: React.ReactElement;
  showSnackbar: boolean;
  setShowSnackbar: Dispatch<SetStateAction<boolean>>;
}

const StyledSnackbar: FC<Props> = ({
  children,
  showSnackbar,
  setShowSnackbar,
}) => {
  const onDismissSnackbar = () => setShowSnackbar(false);

  return (
    <View style={snackbarStyles.container}>
      <Snackbar
        wrapperStyle={{ top: 100 }}
        duration={5000}
        visible={showSnackbar}
        onDismiss={onDismissSnackbar}
        action={{ label: "Hide", onPress: () => onDismissSnackbar() }}
      >
        {children}
      </Snackbar>
    </View>
  );
};

export default StyledSnackbar;

const snackbarStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
});
