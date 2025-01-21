import axios from "axios";
const Http = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  headers: { "Content-Type": "multipart/form-data" },
});
export default Http;
