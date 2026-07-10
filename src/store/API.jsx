import axios from "axios";
import { domain } from ".";

const api = axios.create({
  baseURL: `${domain}/api`,
});

export default api;
