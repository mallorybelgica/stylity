import axios from "../config/axios";
import { isExpired } from "react-jwt";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AUTH_URL = "v1/auth";

let AUTH: string, USER: object;

export const getToken = () => {
  return AsyncStorage.getItem("@stylity_token");
};

export const getAuthUser = () => {
  return AsyncStorage.getItem("@stylity_user");
};

export const register = async (data: object) => {
  try {
    const res = await axios.post(`${AUTH_URL}/register`, data);

    return res.data;
  } catch (err) {
    return err;
  }
};

export const login = async (data: object) => {
  try {
    const res = await axios.post(`${AUTH_URL}/login`, data);

    AUTH = res.data.token;
    USER = res.data.authUser._id;

    AsyncStorage.setItem("@stylity_token", AUTH);
    AsyncStorage.setItem("@stylity_user", JSON.stringify(USER));

    return USER;
  } catch (err) {
    return err;
  }
};

export const userExists = async (email: string) => {
  return await axios.post(`${AUTH_URL}/login`, email);
};

export const isAuthenticated = async () => {
  const token = await AsyncStorage.getItem("@stylity_token");
  if (token) {
    const isTokenExpired = isExpired(token);

    if (isTokenExpired) {
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
};

export const logout = () => {
  AUTH = "";
  USER = {};
  AsyncStorage.removeItem("@stylity_token");
  AsyncStorage.removeItem("@stylity_user");
};
