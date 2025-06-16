
import { apiService } from './api';
import { Service } from '@/types/entities';

const dummyServices: Service[] = [
  {
    id: '1',
    name: 'Comprehensive Cardiology Consultation',
    description: 'Complete cardiac evaluation including ECG, stress test, and consultation',
    category: 'Cardiology',
    price: 450.00,
    duration: 60,
    providerId: '1',
    providerName: 'Dr. Sarah Johnson',
    status: 'active',
    rating: 4.8,
    totalBookings: 156,
    createdAt: '2023-01-15T10:30:00Z'
  },
  {
    id: '2',
    name: 'Dermatology Skin Cancer Screening',
    description: 'Comprehensive skin examination and mole mapping',
    category: 'Dermatology',
    price: 280.00,
    duration: 45,
    providerId: '2',
    providerName: 'Dr. Michael Chen',
    status: 'active',
    rating: 4.6,
    totalBookings: 98,
    createdAt: '2023-03-22T14:15:00Z'
  },
  {
    id: '3',
    name: 'Pediatric Well-Child Checkup',
    description: 'Routine health assessment for children ages 0-18',
    category: 'Pediatrics',
    price: 180.00,
    duration: 30,
    providerId: '3',
    providerName: 'Dr. Emily Rodriguez',
    status: 'inactive',
    rating: 4.9,
    totalBookings: 45,
    createdAt: '2024-01-10T09:15:00Z'
  }
];

class ServicesService {
  private dummyData: Service[] = [...dummyServices];

  async getServices(): Promise<Service[]> {
    try {
      return await apiService.get<Service[]>('/services');
    } catch {
      return this.dummyData;
    }
  }

  async getService(id: string): Promise<Service | null> {
    try {
      return await apiService.get<Service>(`/services/${id}`);
    } catch {
      return this.dummyData.find(s => s.id === id) || null;
    }
  }

  async createService(service: Omit<Service, 'id'>): Promise<Service> {
    try {
      return await apiService.post<Service>('/services', service);
    } catch {
      const newService: Service = {
        ...service,
        id: Date.now().toString(),
      };
      this.dummyData.push(newService);
      return newService;
    }
  }

  async updateService(id: string, updates: Partial<Service>): Promise<Service> {
    try {
      return await apiService.put<Service>(`/services/${id}`, updates);
    } catch {
      const index = this.dummyData.findIndex(s => s.id === id);
      if (index !== -1) {
        this.dummyData[index] = { ...this.dummyData[index], ...updates };
        return this.dummyData[index];
      }
      throw new Error('Service not found');
    }
  }

  async deleteService(id: string): Promise<void> {
    try {
      await apiService.delete(`/services/${id}`);
    } catch {
      const index = this.dummyData.findIndex(s => s.id === id);
      if (index !== -1) {
        this.dummyData.splice(index, 1);
      }
    }
  }
}

export const servicesService = new ServicesService();
