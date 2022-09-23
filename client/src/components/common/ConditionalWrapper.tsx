import { FC } from "react";
import { StyleSheet, Animated } from "react-native";
import { colors } from "../../styles/base";

interface Props {
  condition: boolean;
  children: React.ReactElement;
}

const ConditionalWrapper: FC<Props> = ({ condition, children }) =>
  condition ? (
    <Animated.View style={conditionalWrapperStyles.container}>
      {children}
    </Animated.View>
  ) : (
    children
  );

export default ConditionalWrapper;

const conditionalWrapperStyles = StyleSheet.create({
  container: {
    borderWidth: 2.5,
    borderColor: colors.accent,
  },
});
