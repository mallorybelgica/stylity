import axios from "axios";
import { REACT_APP_SERVER_URL } from "@env";

const instance = axios.create({
  baseURL: REACT_APP_SERVER_URL,
});

export default instance;
