import axios from "../config/axios";
import queryString from "query-string";
import { getToken, isAuthenticated } from "./auth";

const USER_URL = "/v1/users";

export const getUsers = async (filters: object) => {
  try {
    const query = queryString.stringify(filters);
    const authenticated = await isAuthenticated();
    const token = await getToken();

    if (authenticated) {
      const res = await axios.get(`${USER_URL}?${query}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    }
  } catch (err) {
    return err;
  }
};

export const getUser = async (id: string) => {
  try {
    const authenticated = await isAuthenticated();
    const token = await getToken();

    if (authenticated) {
      const res = await axios.get(`${USER_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    }
  } catch (err) {
    return err;
  }
};

export const updateUser = async (id: string, data: object) => {
  try {
    const authenticated = await isAuthenticated();
    const token = await getToken();

    if (authenticated) {
      const res = await axios.put(`${USER_URL}/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    }
  } catch (err) {
    return err;
  }
};

export const deleteUser = async (id: string) => {
  try {
    const authenticated = await isAuthenticated();
    const token = await getToken();

    if (authenticated) {
      const res = await axios.delete(`${USER_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    }
  } catch (err) {
    return err;
  }
};

export const updateUserPassword = async (id: string, data: object) => {
  try {
    const authenticated = await isAuthenticated();
    const token = await getToken();

    if (authenticated) {
      const res = await axios.put(`${USER_URL}/${id}/password`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log({ res });
      return { status: res.status, data: res.data };
    }
  } catch (err: any) {
    return {
      status: err.response.data.status,
      errorMessage: err.response.data.message,
    };
  }
};
