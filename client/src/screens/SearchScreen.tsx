import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { Fragment, useEffect, useLayoutEffect, useState } from "react";
import {
  Dimensions,
  Text,
  StyleSheet,
  TextInput,
  View,
  ScrollView,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import UserDetails from "../components/user/UserDetails";
import { getUserSearchResults } from "../services/user";
import { colors } from "../styles/base";
import { RootStackParamsList, UserType } from "../types";

const SearchScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamsList>>();
  const [searchText, onChangeSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const getSearchResults = async () => {
    const results = await getUserSearchResults({ searchValue: searchText });

    if (results) {
      setSearchResults(results.data);
    }
  };

  useEffect(() => {
    if (!searchText) {
      setSearchResults([]);
    } else {
      getSearchResults();
    }
  }, [searchText]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={{ position: "relative" }}>
          <View style={{ position: "absolute", top: 7, left: 7, zIndex: 10 }}>
            <MaterialCommunityIcons
              color={colors.primaryText}
              name={"magnify"}
              size={22}
            />
          </View>
          <TextInput
            autoFocus={true}
            placeholder="Search"
            placeholderTextColor={colors.primaryText}
            value={searchText}
            onChangeText={(e) => onChangeSearchText(e)}
            style={searchStyles.input}
          />
        </View>
      ),
    });
  }, [navigation, searchText]);

  return (
    <View>
      <ScrollView>
        {searchResults.map((result: UserType, index: number) => {
          return (
            <View style={searchStyles.container} key={index}>
              <UserDetails user={result} />
            </View>
          );
        })}
      </ScrollView>
      <View style={searchStyles.textContainer}>
        <Fragment>
          {!searchText && (
            <Text style={searchStyles.text}>Search for a friend</Text>
          )}
          {searchText && searchResults.length < 1 && (
            <Text style={searchStyles.text}>No results for "{searchText}"</Text>
          )}
        </Fragment>
      </View>
    </View>
  );
};

export default SearchScreen;

const searchStyles = StyleSheet.create({
  container: {
    flex: 1,
    height: 80,
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    marginVertical: 20,
    alignItems: "center",
  },
  text: {
    color: colors.primaryText,
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    fontSize: 16,
    width: Dimensions.get("window").width - 30,
    height: 35,
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingVertical: 10,
    paddingLeft: 35,
    paddingRight: 10,
  },
});
