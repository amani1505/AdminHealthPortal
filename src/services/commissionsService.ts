
import { apiService } from './api';
import { Commission } from '@/types/entities';

const dummyCommissions: Commission[] = [
  {
    id: '1',
    providerId: '1',
    providerName: 'Dr. Sarah Johnson',
    amount: 67.50,
    percentage: 15,
    status: 'paid',
    period: '2024-01',
    createdAt: '2024-01-15T10:30:00Z',
    paidAt: '2024-01-20T14:22:00Z'
  },
  {
    id: '2',
    providerId: '2',
    providerName: 'Dr. Michael Chen',
    amount: 42.00,
    percentage: 15,
    status: 'pending',
    period: '2024-01',
    createdAt: '2024-01-18T16:45:00Z'
  },
  {
    id: '3',
    providerId: '3',
    providerName: 'Dr. Emily Rodriguez',
    amount: 48.00,
    percentage: 15,
    status: 'cancelled',
    period: '2024-01',
    createdAt: '2024-01-10T09:15:00Z'
  }
];

class CommissionsService {
  private dummyData: Commission[] = [...dummyCommissions];

  async getCommissions(): Promise<Commission[]> {
    try {
      return await apiService.get<Commission[]>('/commissions');
    } catch {
      return this.dummyData;
    }
  }

  async getCommission(id: string): Promise<Commission | null> {
    try {
      return await apiService.get<Commission>(`/commissions/${id}`);
    } catch {
      return this.dummyData.find(c => c.id === id) || null;
    }
  }

  async createCommission(commission: Omit<Commission, 'id'>): Promise<Commission> {
    try {
      return await apiService.post<Commission>('/commissions', commission);
    } catch {
      const newCommission: Commission = {
        ...commission,
        id: Date.now().toString(),
      };
      this.dummyData.push(newCommission);
      return newCommission;
    }
  }

  async updateCommission(id: string, updates: Partial<Commission>): Promise<Commission> {
    try {
      return await apiService.put<Commission>(`/commissions/${id}`, updates);
    } catch {
      const index = this.dummyData.findIndex(c => c.id === id);
      if (index !== -1) {
        this.dummyData[index] = { ...this.dummyData[index], ...updates };
        return this.dummyData[index];
      }
      throw new Error('Commission not found');
    }
  }

  async deleteCommission(id: string): Promise<void> {
    try {
      await apiService.delete(`/commissions/${id}`);
    } catch {
      const index = this.dummyData.findIndex(c => c.id === id);
      if (index !== -1) {
        this.dummyData.splice(index, 1);
      }
    }
  }
}

export const commissionsService = new CommissionsService();
