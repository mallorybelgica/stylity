import React, {
  FC,
  JSXElementConstructor,
  ReactElement,
  SetStateAction,
} from "react";
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Dimensions,
  Platform,
} from "react-native";
import { useDispatch } from "react-redux";
import { toggle_modal } from "../../store/modal/modalSlice";

interface Props {
  showModal: boolean;
  setShowModal: SetStateAction<any>;
  customHeight?: number;
  children: ReactElement<any, string | JSXElementConstructor<any>>;
}

const { width, height } = Dimensions.get("window");

const BottomSheet: FC<Props> = ({
  children,
  showModal,
  setShowModal,
  customHeight,
}) => {
  const dispatch = useDispatch();
  const modalHeight = customHeight ? customHeight : 0.65;
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(false);
          dispatch(toggle_modal(false));
        }}
      >
        <Pressable
          style={styles.outsideModal}
          onPress={(event: any) => {
            if (
              Platform.OS === "web" &&
              event.target === event.currentTarget.firstChild
            ) {
              setShowModal(false);
              dispatch(toggle_modal(false));
            } else if (
              Platform.OS !== "web" &&
              event.target === event.currentTarget._children[0]
            ) {
              setShowModal(false);
              dispatch(toggle_modal(false));
            }
          }}
        >
          <View style={styles.centeredView}>
            <View style={[styles.modalView, { height: height * modalHeight }]}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setShowModal(false)}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
              {children}
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  modalView: {
    flex: 1,
    width,
    bottom: 0,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: "stretch",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  outsideModal: {
    flex: 1,
  },
});

export default BottomSheet;
