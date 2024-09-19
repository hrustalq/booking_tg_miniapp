import axios from 'axios';
import WebApp from '@twa-dev/sdk';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

export const gizmoApiClient = axios.create({
  baseURL: import.meta.env.VITE_GIZMO_API_BASE_URL,
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

export { default as branchesApi } from "./branches";
export { default as zonesApi } from "./zones";
export { default as pcsApi } from "./pcs";
export { default as gizmoUsersApi } from "./gizmo-users";
export * from "./pcs";
export * from "./branches";
export * from "./zones";
export * from "./types";
export * from "./gizmo-users";
