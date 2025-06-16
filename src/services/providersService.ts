
import { apiService } from './api';
import { Provider } from '@/types/entities';

// Dummy data for providers
const dummyProviders: Provider[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@healthcare.com',
    phone: '+1-555-0123',
    specialty: 'Cardiology',
    location: 'New York, NY',
    rating: 4.8,
    status: 'active',
    joinedDate: '2023-01-15',
    totalPatients: 156,
    revenue: 125000
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    email: 'michael.chen@healthcare.com',
    phone: '+1-555-0124',
    specialty: 'Dermatology',
    location: 'Los Angeles, CA',
    rating: 4.6,
    status: 'active',
    joinedDate: '2023-03-22',
    totalPatients: 98,
    revenue: 87500
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    email: 'emily.rodriguez@healthcare.com',
    phone: '+1-555-0125',
    specialty: 'Pediatrics',
    location: 'Chicago, IL',
    rating: 4.9,
    status: 'pending',
    joinedDate: '2024-01-10',
    totalPatients: 45,
    revenue: 32000
  }
];

class ProvidersService {
  private dummyData: Provider[] = [...dummyProviders];

  async getProviders(): Promise<Provider[]> {
    try {
      return await apiService.get<Provider[]>('/providers');
    } catch {
      return this.dummyData;
    }
  }

  async getProvider(id: string): Promise<Provider | null> {
    try {
      return await apiService.get<Provider>(`/providers/${id}`);
    } catch {
      return this.dummyData.find(p => p.id === id) || null;
    }
  }

  async createProvider(provider: Omit<Provider, 'id'>): Promise<Provider> {
    try {
      return await apiService.post<Provider>('/providers', provider);
    } catch {
      const newProvider: Provider = {
        ...provider,
        id: Date.now().toString(),
      };
      this.dummyData.push(newProvider);
      return newProvider;
    }
  }

  async updateProvider(id: string, updates: Partial<Provider>): Promise<Provider> {
    try {
      return await apiService.put<Provider>(`/providers/${id}`, updates);
    } catch {
      const index = this.dummyData.findIndex(p => p.id === id);
      if (index !== -1) {
        this.dummyData[index] = { ...this.dummyData[index], ...updates };
        return this.dummyData[index];
      }
      throw new Error('Provider not found');
    }
  }

  async deleteProvider(id: string): Promise<void> {
    try {
      await apiService.delete(`/providers/${id}`);
    } catch {
      const index = this.dummyData.findIndex(p => p.id === id);
      if (index !== -1) {
        this.dummyData.splice(index, 1);
      }
    }
  }
}

export const providersService = new ProvidersService();
