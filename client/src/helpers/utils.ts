import * as ImagePicker from "expo-image-picker";
import { uploadImage } from "../services/assets";

export const imageUploader = async (ownerId: string, ownerType: string) => {
  try {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 0,
    });

    if (!result.cancelled) {
      const res = await uploadImage({
        owner_id: ownerId,
        owner_type: ownerType,
        uri: result.uri,
      });

      return res;
    }
  } catch (err) {
    return err;
  }
};
