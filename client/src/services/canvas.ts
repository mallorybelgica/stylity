import axios from "../config/axios";
import queryString from "query-string";
import { getToken, isAuthenticated } from "./auth";

const CANVAS_URL = "/v1/canvases";

export const getCanvases = async (filters: object) => {
  try {
    const query = queryString.stringify(filters);
    const authenticated = await isAuthenticated();
    const token = await getToken();

    if (authenticated) {
      const res = await axios.get(`${CANVAS_URL}?${query}`, {
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

export const getCanvas = async (id: string) => {
  try {
    const authenticated = await isAuthenticated();
    const token = await getToken();

    if (authenticated) {
      const res = await axios.get(`${CANVAS_URL}/${id}`, {
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

export const createCanvas = async (data: object) => {
  try {
    const authenticated = await isAuthenticated();
    const token = await getToken();

    if (authenticated) {
      const res = await axios.post(`${CANVAS_URL}`, data, {
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

export const updateCanvas = async (id: string, data: object) => {
  try {
    const authenticated = await isAuthenticated();
    const token = await getToken();

    if (authenticated) {
      const res = await axios.put(`${CANVAS_URL}/${id}`, data, {
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

export const deleteCanvas = async (id: string) => {
  try {
    const authenticated = await isAuthenticated();
    const token = await getToken();

    if (authenticated) {
      const res = await axios.delete(`${CANVAS_URL}/${id}`, {
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
