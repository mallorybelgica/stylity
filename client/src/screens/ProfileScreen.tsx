import React, { FC, useCallback, useEffect, useState } from "react";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { useSelector } from "react-redux";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { getCanvases } from "../services/canvas";
import { user } from "../store/selectors";
import { CanvasType, RootStackParamsList, UserType } from "../types";
import { getUser, updateUser } from "../services/user";
import ActivityLoader from "../components/common/ActivityLoader";
import { colors } from "../styles/base";
import { REACT_APP_AWS_URL } from "@env";

interface Props {
  navigation: NavigationProp<RootStackParamsList>;
  route: RouteProp<RootStackParamsList, "Profile">;
}

const ProfileScreen: FC<Props> = (props) => {
  const { navigation, route } = props;
  const { currentUser } = useSelector(user);
  const profileUserId = route.params
    ? route.params.profileUserId
    : currentUser._id;
  const [profileUser, setProfileUser] = useState<UserType>();
  const [profileCanvases, setProfileCanvases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reloadKey, setReloadKey] = useState(0);

  const getProfileData = async () => {
    const user = await getUser(profileUserId);

    if (user) {
      const canvases = await getCanvases({ user_id: user.data._id });

      if (canvases) {
        setProfileUser(user.data);
        setProfileCanvases(canvases.data);
        setIsLoading(false);
      }
    }
  };

  const reload = useCallback(() => {
    setReloadKey((prevReloadKey) => prevReloadKey + 1);
    setIsLoading(true);
  }, []);

  const handleFollow = () => {
    if (profileUser) {
      const newArray = [...profileUser.followers];
      const index = newArray.indexOf(currentUser._id);
      if (newArray.includes(currentUser._id)) {
        newArray.splice(index, 1);
      } else {
        newArray.push(currentUser._id);
      }

      updateUser(profileUserId, { ...profileUser, followers: newArray });
    }
  };

  useEffect(() => {
    getProfileData();
  }, [reloadKey]);

  useEffect(() => {
    getProfileData();
  }, [profileUserId]);

  if (isLoading) {
    return <ActivityLoader />;
  }

  return (
    <SafeAreaView style={profileStyles.container}>
      {profileUser && (
        <View>
          {profileUser.profile_pic ? (
            <Image
              source={{ uri: profileUser.profile_pic }}
              style={profileStyles.profilePic}
            />
          ) : (
            <MaterialCommunityIcons
              name="account-circle"
              color={"black"}
              size={50}
              style={profileStyles.profilePic}
            />
          )}
          <Text style={profileStyles.displayName}>{profileUser.full_name}</Text>
          <Text style={profileStyles.bio}>{profileUser.bio}</Text>
          {profileUser._id !== currentUser._id && (
            <TouchableOpacity style={profileStyles.followButton}>
              <Text style={profileStyles.followButtonText}>
                {profileUser.followers?.includes(currentUser._id)
                  ? "Unfollow"
                  : "Follow"}
              </Text>
            </TouchableOpacity>
          )}
          <View style={profileStyles.stats}>
            <Text style={profileStyles.statsText}>
              {profileCanvases.length}
              {profileCanvases.length === 1 ? " canvas" : " canvases"}
            </Text>
            <Text style={profileStyles.statsText}>
              {profileUser.followers?.length}
              {profileUser.followers?.length === 1 ? " follower" : " followers"}
            </Text>
            <Text style={profileStyles.statsText}>
              {profileUser.following?.length} following
            </Text>
          </View>
        </View>
      )}
      <View
        style={[
          profileStyles.canvasesContainer,
          profileCanvases.length > 0
            ? profileStyles.populatedProfile
            : profileStyles.emptyProfile,
        ]}
      >
        {profileCanvases.length > 0 ? (
          profileCanvases.map((canvas: CanvasType, index: number) => {
            return (
              <View style={profileStyles.canvas} key={index}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Canvas", { canvas: canvas })
                  }
                >
                  <Image
                    source={{
                      uri: `${REACT_APP_AWS_URL}/${canvas.screenshot}.jpeg`,
                    }}
                    style={profileStyles.screenshot}
                  />
                </TouchableOpacity>
              </View>
            );
          })
        ) : (
          <Text style={profileStyles.emptyCanvas}>No Canvases Yet.</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "center",
    textAlign: "center",
    margin: 10,
  },
  profilePic: {
    alignSelf: "center",
    height: 50,
    width: 50,
    borderRadius: 100,
    marginBottom: 10,
  },
  displayName: {
    fontWeight: "bold",
    fontSize: 16,
    alignSelf: "center",
  },
  followButton: {
    width: 100,
    height: 30,
    backgroundColor: colors.background,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  followButtonText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  bio: {
    fontSize: 16,
    alignSelf: "center",
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
    backgroundColor: colors.accent,
  },
  statsText: {
    fontSize: 15,
    color: colors.whiteText,
  },
  canvas: {
    textAlign: "center",
    width: (Dimensions.get("window").width - 50) / 2,
    margin: 5,
    borderRadius: 10,
  },
  canvasesContainer: {
    flexWrap: "wrap",
    flexGrow: 1,
    backgroundColor: colors.primary,
    padding: 5,
    borderRadius: 20,
  },
  emptyCanvas: {
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "center",
    padding: 10,
  },
  emptyProfile: {
    flexDirection: "column",
  },
  populatedProfile: {
    flexDirection: "row",
  },
  screenshot: {
    height: (Dimensions.get("window").width / 2) * 1.2,
    borderRadius: 10,
  },
});
