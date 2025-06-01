// lib/axios.ts
import axios from "axios";

export const apiClient = axios.create({
    baseURL: "http://localhost:8010/api", // Your Django backend
    headers: {
        "Content-Type": "application/json",
    },
});

// // Add request interceptor for auth tokens if needed
// apiClient.interceptors.request.use((config) => {
//     const token = localStorage.getItem("token"); // Example
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// });