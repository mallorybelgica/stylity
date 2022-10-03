import { useState } from "react";
import {
  Dimensions,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const SearchBar = () => {
  const [searchActive, setSearchActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <TouchableOpacity
        style={{ flex: 1, justifyContent: "flex-end" }}
        onPress={() => setSearchActive(true)}
      >
        <TextInput
          value={searchValue}
          onChangeText={setSearchValue}
          style={{
            width: Dimensions.get("window").width - 90,
            backgroundColor: "#fff",
          }}
        />
      </TouchableOpacity>
      {/* <TouchableOpacity style={{ flex: 1 }}>
        <Text>Cancel</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default SearchBar;
