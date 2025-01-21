import axios from "axios";
const Http = axios.create({
  baseURL: "https://be-school-manager.onrender.com/api/v1",
  headers: { "Content-Type": "multipart/form-data" },
});
export default Http;
