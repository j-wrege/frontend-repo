import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5001/api", // Your backend base URL
});

// Automatically add Authorization header to all requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token"); // Get token from localStorage
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));

export default api;
