
import { apiService } from './api';
import { Communication } from '@/types/entities';

const dummyCommunications: Communication[] = [
  {
    id: '1',
    type: 'email',
    recipient: 'john.smith@email.com',
    subject: 'Appointment Confirmation',
    message: 'Your appointment with Dr. Sarah Johnson has been confirmed for tomorrow at 2:00 PM.',
    status: 'sent',
    sentAt: '2024-01-19T10:30:00Z',
    createdAt: '2024-01-19T10:25:00Z'
  },
  {
    id: '2',
    type: 'sms',
    recipient: '+1-555-0202',
    subject: 'Reminder',
    message: 'Reminder: Your appointment is in 1 hour.',
    status: 'delivered',
    sentAt: '2024-01-19T13:00:00Z',
    createdAt: '2024-01-19T12:55:00Z'
  },
  {
    id: '3',
    type: 'notification',
    recipient: 'provider_123',
    subject: 'New Patient Booking',
    message: 'You have a new appointment booking from Jane Doe.',
    status: 'pending',
    scheduledAt: '2024-01-20T09:00:00Z',
    createdAt: '2024-01-19T16:45:00Z'
  }
];

class CommunicationsService {
  private dummyData: Communication[] = [...dummyCommunications];

  async getCommunications(): Promise<Communication[]> {
    try {
      return await apiService.get<Communication[]>('/communications');
    } catch {
      return this.dummyData;
    }
  }

  async getCommunication(id: string): Promise<Communication | null> {
    try {
      return await apiService.get<Communication>(`/communications/${id}`);
    } catch {
      return this.dummyData.find(c => c.id === id) || null;
    }
  }

  async createCommunication(communication: Omit<Communication, 'id'>): Promise<Communication> {
    try {
      return await apiService.post<Communication>('/communications', communication);
    } catch {
      const newCommunication: Communication = {
        ...communication,
        id: Date.now().toString(),
      };
      this.dummyData.push(newCommunication);
      return newCommunication;
    }
  }

  async updateCommunication(id: string, updates: Partial<Communication>): Promise<Communication> {
    try {
      return await apiService.put<Communication>(`/communications/${id}`, updates);
    } catch {
      const index = this.dummyData.findIndex(c => c.id === id);
      if (index !== -1) {
        this.dummyData[index] = { ...this.dummyData[index], ...updates };
        return this.dummyData[index];
      }
      throw new Error('Communication not found');
    }
  }

  async deleteCommunication(id: string): Promise<void> {
    try {
      await apiService.delete(`/communications/${id}`);
    } catch {
      const index = this.dummyData.findIndex(c => c.id === id);
      if (index !== -1) {
        this.dummyData.splice(index, 1);
      }
    }
  }
}

export const communicationsService = new CommunicationsService();
