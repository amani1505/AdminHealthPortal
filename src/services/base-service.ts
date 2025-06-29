import { getAuthHeaders } from '@/config/api';
import axios from 'axios';

// Create axios instance with default config
const apiClient = axios.create({
  timeout: 10000,
});

// Request interceptor to add auth headers
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const makeAuthenticatedRequest = async (
  url: string,
  method: 'get' | 'post' | 'put' | 'delete' = 'get',
  data?: any,
  params?: any,
  config?: Record<string, any>
) => {
  try {
    const response = await apiClient({
      url,
      method,
      data,
      params,
      headers: getAuthHeaders(),
      ...config,
    });
    
    return response.data;
  } catch (error) {
    console.error(`API request failed: ${method.toUpperCase()} ${url}`, error);
    throw error;
  }
};
