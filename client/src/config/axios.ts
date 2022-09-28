import axios from "axios";
import { REACT_APP_SERVER_URL } from "@env";
console.log({ REACT_APP_SERVER_URL });
const instance = axios.create({
  baseURL: "https://stylity-514.herokuapp.com",
});

export default instance;
