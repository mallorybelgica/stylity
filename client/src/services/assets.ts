import axios from "../config/axios";
import { getToken, isAuthenticated } from "./auth";
import FormData from "form-data";
import { Platform } from "react-native";

const ASSET_URL = "/v1/assets";

export const uploadImage = async (data: any) => {
  console.log({ Platform });
  const { owner_id, owner_type, uri } = data;

  try {
    const authenticated = await isAuthenticated();
    const token = await getToken();

    const assetData = {
      owner_id,
      owner_type,
      type: "image",
      createdAt: new Date(),
    };

    if (authenticated) {
      const res = await axios.post(ASSET_URL, assetData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res) {
        const data = new FormData();

        data.append("photo", {
          name: res.data.asset._id,
          type: "image/jpeg",
          uri: Platform.OS === "android" ? uri : uri.replace("file://", ""),
        });

        await axios.put(`${ASSET_URL}/upload_image`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        return res;
      }
    }
  } catch (err) {
    return err;
  }
};
