import axios from "axios";

const API = axios.create({
    baseURL: "https://nordholm-1.onrender.com "
});

// JWT https://nordholm-1.onrender.com http://localhost:8080

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default API;
