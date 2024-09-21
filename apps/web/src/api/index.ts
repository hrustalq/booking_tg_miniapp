import axios from 'axios';
import WebApp from '@twa-dev/sdk';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
const GIZMO_API_BASE_URL = import.meta.env.VITE_GIZMO_API_BASE_URL || '';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

export const gizmoApiClient = axios.create({
  baseURL: GIZMO_API_BASE_URL,
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
    // Handle specific error codes
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Handle unauthorized access
          break;
        case 404:
          // Handle not found
          break;
        // Add more cases as needed
      }
    }
    return Promise.reject(error);
  }
);

export { default as branchesApi } from "./branches";
export { default as zonesApi } from "./zones";
export { default as pcsApi } from "./pcs";
export { default as gizmoUsersApi } from "./gizmo-users";
export { default as bookingsApi } from "./bookings";
export { default as userGroupsApi } from "./usergroups";
export { default as billingProfilesApi } from "./billing-profiles";

export * from "./pcs";
export * from "./branches";
export * from "./zones";
export * from "./types";
export * from "./gizmo-users";
export * from "./bookings";
export * from "./usergroups";
export * from "./billing-profiles";