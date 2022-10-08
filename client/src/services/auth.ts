import axios from "../config/axios";
import { decodeToken, isExpired } from "react-jwt";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosError, AxiosResponse } from "axios";

const AUTH_URL = "v1/auth";

let AUTH: string, USER: object;

export const getToken = async () => {
  return await AsyncStorage.getItem("@stylity_token");
};

export const getAuthUser = async () => {
  return await AsyncStorage.getItem("@stylity_user");
};

export const register = async (data: object) => {
  try {
    const res = await axios.post(`${AUTH_URL}/register`, data);

    AUTH = res.data.token;
    USER = res.data.authUser;

    AsyncStorage.setItem("@stylity_token", AUTH);
    AsyncStorage.setItem("@stylity_user", JSON.stringify(USER));

    return { AUTH, USER };
  } catch (err) {
    return err;
  }
};

export const login = async (data: object) => {
  try {
    const res = await axios.post(`${AUTH_URL}/login`, data);

    AUTH = res.data.token;
    USER = res.data.authUser;

    AsyncStorage.setItem("@stylity_token", AUTH);
    AsyncStorage.setItem("@stylity_user", JSON.stringify(USER));

    return { status: res.status, AUTH, USER };
  } catch (err: any) {
    return {
      status: err.response.data.status,
      errorMessage: err.response.data.message,
    };
  }
};

export const userExists = async (email: string) => {
  return await axios.post(`${AUTH_URL}/login`, email);
};

export const isAuthenticated = async () => {
  const token: any = await AsyncStorage.getItem("@stylity_token");

  if (token) {
    return true;
  } else {
    return false;
  }
  // if (token) {
  //   const isTokenExpired = isExpired(token);

  //   if (isTokenExpired) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // } else {
  //   return false;
  // }
};

export const logout = () => {
  AUTH = "";
  USER = {};
  AsyncStorage.removeItem("@stylity_token");
  AsyncStorage.removeItem("@stylity_user");
};
