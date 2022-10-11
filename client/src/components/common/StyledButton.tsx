import React, { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { colors } from "../../styles/base";
import { globalStyles } from "../../styles/global";

interface Props {
  icon?: string;
  title: string | JSX.Element;
  bgColor?: string;
  titleColor?: string;
  customButtonStyles?: object;
  customTitleStyles?: object;
  handler: () => void;
}

const StyledButton: FC<Props> = ({
  icon,
  title,
  bgColor,
  titleColor,
  customButtonStyles,
  customTitleStyles,
  handler,
}) => {
  return (
    <TouchableOpacity
      onPress={handler}
      style={[
        globalStyles.detailedButton,
        globalStyles.listButton,
        customButtonStyles ? customButtonStyles : {},
        {
          backgroundColor: bgColor ? bgColor : "#fff",
          borderColor: titleColor ? titleColor : colors.primaryText,
        },
      ]}
    >
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={26}
          color={titleColor ? titleColor : colors.primaryText}
        />
      )}
      {typeof title === "string" ? (
        <Text
          style={[
            globalStyles.listButtonText,
            customTitleStyles ? customTitleStyles : {},
            { color: titleColor ? titleColor : colors.primaryText },
          ]}
        >
          {title}
        </Text>
      ) : (
        <View>{title}</View>
      )}
    </TouchableOpacity>
  );
};

export default StyledButton;
