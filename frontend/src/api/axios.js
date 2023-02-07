import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8000/api",
  // baseURL: "https://fullstack-app-101347350.herokuapp.com/api",
});
