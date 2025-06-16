
import { apiService } from './api';
import { Payment } from '@/types/entities';

const dummyPayments: Payment[] = [
  {
    id: '1',
    patientId: '1',
    patientName: 'John Smith',
    providerId: '1',
    providerName: 'Dr. Sarah Johnson',
    amount: 450.00,
    status: 'completed',
    method: 'card',
    transactionId: 'txn_1234567890',
    createdAt: '2024-01-19T10:30:00Z',
    processedAt: '2024-01-19T10:31:00Z'
  },
  {
    id: '2',
    patientId: '2',
    patientName: 'Jane Doe',
    providerId: '2',
    providerName: 'Dr. Michael Chen',
    amount: 280.00,
    status: 'pending',
    method: 'bank_transfer',
    transactionId: 'txn_0987654321',
    createdAt: '2024-01-18T14:15:00Z'
  },
  {
    id: '3',
    patientId: '3',
    patientName: 'Bob Johnson',
    providerId: '1',
    providerName: 'Dr. Sarah Johnson',
    amount: 180.00,
    status: 'failed',
    method: 'card',
    transactionId: 'txn_1122334455',
    createdAt: '2024-01-17T16:45:00Z'
  }
];

class PaymentsService {
  private dummyData: Payment[] = [...dummyPayments];

  async getPayments(): Promise<Payment[]> {
    try {
      return await apiService.get<Payment[]>('/payments');
    } catch {
      return this.dummyData;
    }
  }

  async getPayment(id: string): Promise<Payment | null> {
    try {
      return await apiService.get<Payment>(`/payments/${id}`);
    } catch {
      return this.dummyData.find(p => p.id === id) || null;
    }
  }

  async createPayment(payment: Omit<Payment, 'id'>): Promise<Payment> {
    try {
      return await apiService.post<Payment>('/payments', payment);
    } catch {
      const newPayment: Payment = {
        ...payment,
        id: Date.now().toString(),
      };
      this.dummyData.push(newPayment);
      return newPayment;
    }
  }

  async updatePayment(id: string, updates: Partial<Payment>): Promise<Payment> {
    try {
      return await apiService.put<Payment>(`/payments/${id}`, updates);
    } catch {
      const index = this.dummyData.findIndex(p => p.id === id);
      if (index !== -1) {
        this.dummyData[index] = { ...this.dummyData[index], ...updates };
        return this.dummyData[index];
      }
      throw new Error('Payment not found');
    }
  }

  async deletePayment(id: string): Promise<void> {
    try {
      await apiService.delete(`/payments/${id}`);
    } catch {
      const index = this.dummyData.findIndex(p => p.id === id);
      if (index !== -1) {
        this.dummyData.splice(index, 1);
      }
    }
  }
}

export const paymentsService = new PaymentsService();
