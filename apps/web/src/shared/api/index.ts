import axios from 'axios';
import WebApp from '@twa-dev/sdk';

const API_BASE_URL = process.env.VITE_API_BASE_URL;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Request interceptor
apiClient.interceptors.request.use((config) => {
  const initData = WebApp.initData;
  if (initData) {
    config.headers['Telegram-Init-Data'] = initData;
  }
  return config;
});

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors (e.g., unauthorized, server errors)
    return Promise.reject(error);
  }
);

export default apiClient;
