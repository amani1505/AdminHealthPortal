
// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Authentication Endpoints
export const AUTH_ENDPOINTS = {
  REGISTER: `${API_BASE_URL}/auth/register`,
  LOGIN: `${API_BASE_URL}/auth/login`,
  LOGOUT: `${API_BASE_URL}/auth/logout`,
  REFRESH: `${API_BASE_URL}/auth/refresh`,
};

// Player Type Endpoints
export const PLAYER_TYPE_ENDPOINTS = {
  CATEGORIES: `${API_BASE_URL}/player-types/categories`,
  PLAYER_TYPES: `${API_BASE_URL}/player-types`,
  PLAYER_TYPE_BY_ID: (id: string | number) => `${API_BASE_URL}/player-types/${id}`,
  CHILDREN: (id: string | number) => `${API_BASE_URL}/player-types/${id}/children`,
  SPECIALIZATIONS: (id: string | number) => `${API_BASE_URL}/player-types/${id}/specializations`,
  ATTRIBUTES: (id: string | number) => `${API_BASE_URL}/player-types/${id}/attributes`,
  SUBMIT_DATA: (userId: string | number) => `${API_BASE_URL}/users/${userId}/player-type-data`,
};

// Default headers for API requests
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

// Helper function to get auth headers
export const getAuthHeaders = () => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  return token ? { ...DEFAULT_HEADERS, Authorization: `Bearer ${token}` } : DEFAULT_HEADERS;
};
