import axios from "axios";
import store from "../store/index";

const axiosInstance = axios.create({
    baseURL: "http://localhost:2000/api"
})

export default axiosInstance;