import { RouteProp } from "@react-navigation/native";
import { FC } from "react";
import { ScrollView } from "react-native";
import User from "../components/User";
import { RootStackParamsList } from "../types";

interface Props {
  route: RouteProp<RootStackParamsList, "UserList">;
}

const UserListScreen: FC<Props> = ({ route }) => {
  const userList = route.params.userList;

  return (
    <ScrollView>
      {userList.map((userId, index) => {
        return <User userId={userId} key={index} />;
      })}
    </ScrollView>
  );
};

export default UserListScreen;
