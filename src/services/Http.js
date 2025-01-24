import axios from "axios";

const Http = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 10000, // Timeout of 10 seconds
});

export default Http;
