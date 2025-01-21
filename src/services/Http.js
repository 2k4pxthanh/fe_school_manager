import axios from "axios";
const Http = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: { "Content-Type": "multipart/form-data" },
});
export default Http;
