import axios from "axios";
import { REACT_APP_SERVER_URL } from "@env";
console.log({ REACT_APP_SERVER_URL });
const instance = axios.create({
  baseURL: "http://192.168.2.15:8000",
});

export default instance;
