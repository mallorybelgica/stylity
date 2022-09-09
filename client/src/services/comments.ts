import axios from "../config/axios";
import queryString from "query-string";
import { getToken, isAuthenticated } from "./auth";

const COMMENTS_URL = "/v1/comments";

export const getComments = async (filters: object) => {
  try {
    const query = queryString.stringify(filters);
    const authenticated = await isAuthenticated();
    const token = await getToken();

    if (authenticated) {
      const res = await axios.get(`${COMMENTS_URL}?${query}`, {
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

export const getComment = async (id: string) => {
  try {
    const authenticated = await isAuthenticated();
    const token = await getToken();

    if (authenticated) {
      const res = await axios.get(`${COMMENTS_URL}/${id}`, {
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

export const createComment = async (data: object) => {
  try {
    const authenticated = await isAuthenticated();
    const token = await getToken();

    if (authenticated) {
      const res = await axios.post(`${COMMENTS_URL}`, data, {
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

export const updateComment = async (id: string, data: object) => {
  try {
    const authenticated = await isAuthenticated();
    const token = await getToken();

    if (authenticated) {
      const res = await axios.put(`${COMMENTS_URL}/${id}`, data, {
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

export const deleteComment = async (id: string) => {
  try {
    const authenticated = await isAuthenticated();
    const token = await getToken();

    if (authenticated) {
      const res = await axios.delete(`${COMMENTS_URL}/${id}`, {
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
