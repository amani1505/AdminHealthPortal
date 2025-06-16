
import { apiService } from './api';
import { Administrator } from '@/types/entities';

const dummyAdministrators: Administrator[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice.johnson@admin.com',
    role: 'super_admin',
    status: 'active',
    lastLogin: '2024-01-21T10:30:00Z',
    permissions: ['read', 'write', 'delete', 'admin'],
    createdAt: '2023-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Bob Wilson',
    email: 'bob.wilson@admin.com',
    role: 'admin',
    status: 'active',
    lastLogin: '2024-01-20T15:45:00Z',
    permissions: ['read', 'write', 'moderate'],
    createdAt: '2023-06-15T00:00:00Z'
  },
  {
    id: '3',
    name: 'Carol Davis',
    email: 'carol.davis@admin.com',
    role: 'moderator',
    status: 'inactive',
    lastLogin: '2024-01-18T09:15:00Z',
    permissions: ['read', 'moderate'],
    createdAt: '2023-09-10T00:00:00Z'
  }
];

class AdministratorsService {
  private dummyData: Administrator[] = [...dummyAdministrators];

  async getAdministrators(): Promise<Administrator[]> {
    try {
      return await apiService.get<Administrator[]>('/administrators');
    } catch {
      return this.dummyData;
    }
  }

  async getAdministrator(id: string): Promise<Administrator | null> {
    try {
      return await apiService.get<Administrator>(`/administrators/${id}`);
    } catch {
      return this.dummyData.find(a => a.id === id) || null;
    }
  }

  async createAdministrator(admin: Omit<Administrator, 'id' | 'createdAt'>): Promise<Administrator> {
    try {
      return await apiService.post<Administrator>('/administrators', admin);
    } catch {
      const newAdmin: Administrator = {
        ...admin,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      this.dummyData.push(newAdmin);
      return newAdmin;
    }
  }

  async updateAdministrator(id: string, updates: Partial<Administrator>): Promise<Administrator> {
    try {
      return await apiService.put<Administrator>(`/administrators/${id}`, updates);
    } catch {
      const index = this.dummyData.findIndex(a => a.id === id);
      if (index !== -1) {
        this.dummyData[index] = { ...this.dummyData[index], ...updates };
        return this.dummyData[index];
      }
      throw new Error('Administrator not found');
    }
  }

  async deleteAdministrator(id: string): Promise<void> {
    try {
      await apiService.delete(`/administrators/${id}`);
    } catch {
      const index = this.dummyData.findIndex(a => a.id === id);
      if (index !== -1) {
        this.dummyData.splice(index, 1);
      }
    }
  }
}

export const administratorsService = new AdministratorsService();
