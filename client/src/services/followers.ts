import axios from "../config/axios";
import queryString from "query-string";
import { getToken, isAuthenticated } from "./auth";

const FOLLOWER_URL = "/v1/followers";

export const getFollowList = async (filters: object) => {
  try {
    const query = queryString.stringify(filters);
    const authenticated = await isAuthenticated();
    const token = await getToken();

    if (authenticated) {
      const res = await axios.get(`${FOLLOWER_URL}?${query}`, {
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

export const getFollower = async (id: string) => {
  try {
    const authenticated = await isAuthenticated();
    const token = await getToken();

    if (authenticated) {
      const res = await axios.get(`${FOLLOWER_URL}/${id}`, {
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

export const createFollower = async (data: any) => {
  try {
    const authenticated = await isAuthenticated();
    const token = await getToken();

    const { follower_id, followee_id } = data;

    const followData = {
      follower_id,
      followee_id,
      timestamp: new Date(),
    };

    if (authenticated) {
      const res = await axios.post(`${FOLLOWER_URL}`, followData, {
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

export const updateFollower = async (id: string, data: object) => {
  try {
    const authenticated = await isAuthenticated();
    const token = await getToken();

    if (authenticated) {
      const res = await axios.put(`${FOLLOWER_URL}/${id}`, data, {
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

export const deleteFollower = async (id: string) => {
  try {
    const authenticated = await isAuthenticated();
    const token = await getToken();

    if (authenticated) {
      const res = await axios.delete(`${FOLLOWER_URL}/${id}`, {
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
