import axios from "axios";

export default function setBaseUrl(url: string) {
  axios.defaults.baseURL = url;
}
