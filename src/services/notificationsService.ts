
import { apiService } from './api';
import { Notification } from '@/types/entities';

const dummyNotifications: Notification[] = [
  {
    id: '1',
    type: 'system',
    title: 'System Maintenance',
    message: 'Scheduled maintenance will occur tonight from 2:00 AM to 4:00 AM EST.',
    priority: 'high',
    status: 'unread',
    recipientId: 'admin_1',
    createdAt: '2024-01-19T15:30:00Z'
  },
  {
    id: '2',
    type: 'financial',
    title: 'Commission Payment Processed',
    message: 'Your commission payment of $1,250.00 has been processed.',
    priority: 'medium',
    status: 'read',
    recipientId: 'provider_1',
    createdAt: '2024-01-19T10:15:00Z',
    readAt: '2024-01-19T11:00:00Z'
  },
  {
    id: '3',
    type: 'security',
    title: 'Suspicious Login Attempt',
    message: 'A login attempt was made from an unrecognized device.',
    priority: 'high',
    status: 'unread',
    recipientId: 'admin_2',
    createdAt: '2024-01-19T08:45:00Z'
  }
];

class NotificationsService {
  private dummyData: Notification[] = [...dummyNotifications];

  async getNotifications(): Promise<Notification[]> {
    try {
      return await apiService.get<Notification[]>('/notifications');
    } catch {
      return this.dummyData;
    }
  }

  async getNotification(id: string): Promise<Notification | null> {
    try {
      return await apiService.get<Notification>(`/notifications/${id}`);
    } catch {
      return this.dummyData.find(n => n.id === id) || null;
    }
  }

  async createNotification(notification: Omit<Notification, 'id'>): Promise<Notification> {
    try {
      return await apiService.post<Notification>('/notifications', notification);
    } catch {
      const newNotification: Notification = {
        ...notification,
        id: Date.now().toString(),
      };
      this.dummyData.push(newNotification);
      return newNotification;
    }
  }

  async updateNotification(id: string, updates: Partial<Notification>): Promise<Notification> {
    try {
      return await apiService.put<Notification>(`/notifications/${id}`, updates);
    } catch {
      const index = this.dummyData.findIndex(n => n.id === id);
      if (index !== -1) {
        this.dummyData[index] = { ...this.dummyData[index], ...updates };
        return this.dummyData[index];
      }
      throw new Error('Notification not found');
    }
  }

  async deleteNotification(id: string): Promise<void> {
    try {
      await apiService.delete(`/notifications/${id}`);
    } catch {
      const index = this.dummyData.findIndex(n => n.id === id);
      if (index !== -1) {
        this.dummyData.splice(index, 1);
      }
    }
  }
}

export const notificationsService = new NotificationsService();
