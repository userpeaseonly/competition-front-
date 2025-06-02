// lib/axios.ts
import axios from "axios";


const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const apiClient = axios.create({
    baseURL: `${BASE_URL}/api`,
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