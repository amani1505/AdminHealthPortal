
// Generic API service that can be easily switched from dummy data to real backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class ApiService {
  private baseUrl: string;
  private useDummyData: boolean;

  constructor(baseUrl: string = API_BASE_URL, useDummyData: boolean = true) {
    this.baseUrl = baseUrl;
    this.useDummyData = useDummyData;
  }

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    if (this.useDummyData) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Return dummy data based on endpoint
      return this.getDummyData<T>(endpoint, options.method || 'GET');
    }

    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  }

  private getDummyData<T>(endpoint: string, method: string): T {
    // This will be implemented per service
    throw new Error(`Dummy data not implemented for ${method} ${endpoint}`);
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const apiService = new ApiService();
