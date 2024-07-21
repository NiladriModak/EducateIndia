import axios from "axios";
const instance = axios.create({
  // baseURL: "http://localhost:80",
  baseURL: "https://educateindia.onrender.com",
});

export default instance;
