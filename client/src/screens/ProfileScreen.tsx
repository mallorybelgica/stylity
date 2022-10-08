import React, { FC, useCallback, useEffect, useState } from "react";
import { RouteProp } from "@react-navigation/native";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { getCanvases } from "../services/canvas";
import { user } from "../store/selectors";
import {
  CanvasType,
  FollowerType,
  RootStackParamsList,
  UserType,
} from "../types";
import { getUser } from "../services/user";
import ActivityLoader from "../components/common/ActivityLoader";
import { colors } from "../styles/base";
import { REACT_APP_AWS_URL } from "@env";
import { globalStyles } from "../styles/global";
import {
  createFollower,
  deleteFollower,
  getFollowList,
} from "../services/followers";
import { StackNavigationProp } from "@react-navigation/stack";

interface Props {
  navigation: StackNavigationProp<RootStackParamsList>;
  route: RouteProp<RootStackParamsList, "Profile">;
}

const ProfileScreen: FC<Props> = (props) => {
  const { route, navigation } = props;
  const { currentUser } = useSelector(user);
  const profileUserId = route.params
    ? route.params.profileUserId
    : currentUser._id;
  const [profileUser, setProfileUser] = useState<UserType>();
  const [profileCanvases, setProfileCanvases] = useState([]);
  const [followingList, setFollowingList] = useState<Array<FollowerType>>([]);
  const [followerList, setFollowerList] = useState<Array<FollowerType>>([]);
  const [reloadKey, setReloadKey] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const getProfileData = async () => {
    const user = await getUser(profileUserId);

    if (user) {
      const canvases = await getCanvases({ user_id: user.data._id });
      const followerList = await getFollowList({ followee_id: user.data._id });
      const followingList = await getFollowList({ follower_id: user.data._id });

      setProfileUser(user.data);
      setProfileCanvases(canvases.data);
      setFollowerList(followerList.data);
      setFollowingList(followingList.data);
    }
    setIsLoading(false);
  };

  const handleFollow = async () => {
    if (
      followerList.some((follower: FollowerType) =>
        follower.follower_id.includes(currentUser._id)
      )
    ) {
      const followerItem: any = followerList.find(
        (follower) => follower.follower_id === currentUser._id
      );
      console.log({ followerItem });
      deleteFollower(followerItem._id);
    } else {
      createFollower({
        follower_id: currentUser._id,
        followee_id: profileUserId,
      });
    }
    reload();
  };

  const reload = useCallback(() => {
    setReloadKey((prevReloadKey) => prevReloadKey + 1);
  }, []);

  useEffect(() => {
    getProfileData();
  }, [profileUserId, reloadKey]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setIsLoading(true);

      getProfileData();
    });

    return unsubscribe;
  }, []);

  if (isLoading) {
    return <ActivityLoader />;
  }
  return (
    <SafeAreaView style={profileStyles.container}>
      {profileUser && (
        <View>
          {profileUser.profile_pic ? (
            <Image
              source={{
                uri: `${REACT_APP_AWS_URL}/${profileUser.profile_pic}.jpeg`,
              }}
              style={[globalStyles.profilePic, { alignSelf: "center" }]}
            />
          ) : (
            <MaterialCommunityIcons
              name="account-circle"
              color={"black"}
              size={50}
              style={[globalStyles.profilePic, { alignSelf: "center" }]}
            />
          )}
          <Text style={[globalStyles.headerText, { textAlign: "center" }]}>
            {profileUser.full_name}
          </Text>
          <Text style={[globalStyles.text, { textAlign: "center" }]}>
            {profileUser.bio}
          </Text>
          {profileUser._id !== currentUser._id && (
            <TouchableOpacity
              onPress={handleFollow}
              style={profileStyles.followButton}
            >
              <Text style={profileStyles.followButtonText}>
                {followerList?.some((follower: FollowerType) =>
                  follower.follower_id.includes(currentUser._id)
                )
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
            <TouchableOpacity
              onPress={() =>
                navigation.push("UserList", {
                  userList: followerList.map(
                    (follower) => follower.follower_id
                  ),
                  name: `${profileUser.display_name}'s Followers`,
                })
              }
            >
              <Text style={profileStyles.statsText}>
                {followerList.length}
                {followerList.length === 1 ? " follower" : " followers"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.push("UserList", {
                  userList: followingList.map(
                    (follower) => follower.followee_id
                  ),
                  name: `${profileUser.display_name}'s Follows`,
                })
              }
            >
              <Text style={profileStyles.statsText}>
                {followingList.length} following
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <ScrollView
        style={profileStyles.canvasesContainer}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            { flexWrap: "wrap" },
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
                      navigation.push("Canvas", { canvasId: canvas._id })
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
      </ScrollView>
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
