import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { canvas } from "../../../store/selectors";
import { CanvasElementType } from "../../../types";
import CaptionModal from "./CaptionModal";
import ColorModal from "./ColorModal";
import FontFamilyModal from "./FontFamilyModal";
import PositionModal from "./PositionModal";
import TextFormatModal from "./TextFormatModal";

interface Props {
  currentElement: CanvasElementType | undefined;
}

const EditPanel: FC<Props> = ({ currentElement }) => {
  const { elements } = useSelector(canvas);

  return (
    <View style={panelStyles.container}>
      {!currentElement && <CaptionModal />}
      {(currentElement?.type === "text" || !currentElement) && (
        <ColorModal currentElement={currentElement} />
      )}
      {currentElement?.type === "text" && (
        <>
          <FontFamilyModal currentElement={currentElement} />
          <TextFormatModal currentElement={currentElement} />
        </>
      )}
      {elements.length > 1 && <PositionModal currentElement={currentElement} />}
    </View>
  );
};

export default EditPanel;

const panelStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
