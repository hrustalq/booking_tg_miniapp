import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import axiosRetry from 'axios-retry';

@Injectable()
export class ApiClientService {
  private client: AxiosInstance;

  initialize(apiUrl: string, config: AxiosRequestConfig = {}) {
    if (!apiUrl) {
      throw new Error('API_URL is not defined');
    }
    this.client = axios.create({
      baseURL: `${apiUrl}`,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      ...config,
    });

    axiosRetry(this.client, {
      retries: 3,
      retryDelay: axiosRetry.exponentialDelay,
    });
  }

  getAxiosInstance(): AxiosInstance {
    if (!this.client) {
      throw new Error(
        'ApiClientService not initialized. Call initialize() first.',
      );
    }
    return this.client;
  }

  async get<T>(url: string, params?: AxiosRequestConfig) {
    if (!this.client) {
      throw new Error(
        'ApiClientService not initialized. Call initialize() first.',
      );
    }
    return this.client.get<T>(url, { params });
  }

  async post(url: string, data: any, params?: AxiosRequestConfig) {
    if (!this.client) {
      throw new Error(
        'ApiClientService not initialized. Call initialize() first.',
      );
    }
    return this.client.post(url, data, params);
  }

  async put(url: string, data: any, params?: AxiosRequestConfig) {
    if (!this.client) {
      throw new Error(
        'ApiClientService not initialized. Call initialize() first.',
      );
    }
    return this.client.put(url, data, params);
  }

  async delete(url: string, params?: AxiosRequestConfig) {
    if (!this.client) {
      throw new Error(
        'ApiClientService not initialized. Call initialize() first.',
      );
    }
    return this.client.delete(url, params);
  }
}
