import axios from "axios";
const Http = axios.create({
  baseURL: process.env.URL_API,
  headers: { "Content-Type": "multipart/form-data" },
});
export default Http;
