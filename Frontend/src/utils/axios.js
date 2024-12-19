import axios from 'axios';

export const BASE_URL = import.meta.env.VITE_BASE_URL;
//const token = localStorage.getItem('token');

const apiClient = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json'
        // Authorization: `Bearer ${token}`
    }
});

export default apiClient;