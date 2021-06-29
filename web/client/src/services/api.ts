import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "54.207.108.57"
    : "http://localhost:3333/";

const api = axios.create({
  baseURL,
});

export default api;
