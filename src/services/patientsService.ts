
import { apiService } from './api';
import { Patient } from '@/types/entities';

const dummyPatients: Patient[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1-555-0201',
    age: 35,
    gender: 'male',
    address: '123 Main St, New York, NY 10001',
    lastVisit: '2024-01-15',
    status: 'active',
    providerId: '1',
    totalAppointments: 12
  },
  {
    id: '2',
    name: 'Jane Doe',
    email: 'jane.doe@email.com',
    phone: '+1-555-0202',
    age: 28,
    gender: 'female',
    address: '456 Oak Ave, Los Angeles, CA 90210',
    lastVisit: '2024-01-20',
    status: 'active',
    providerId: '2',
    totalAppointments: 8
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob.johnson@email.com',
    phone: '+1-555-0203',
    age: 42,
    gender: 'male',
    address: '789 Pine St, Chicago, IL 60601',
    lastVisit: '2023-12-10',
    status: 'inactive',
    providerId: '1',
    totalAppointments: 15
  }
];

class PatientsService {
  private dummyData: Patient[] = [...dummyPatients];

  async getPatients(): Promise<Patient[]> {
    try {
      return await apiService.get<Patient[]>('/patients');
    } catch {
      return this.dummyData;
    }
  }

  async getPatient(id: string): Promise<Patient | null> {
    try {
      return await apiService.get<Patient>(`/patients/${id}`);
    } catch {
      return this.dummyData.find(p => p.id === id) || null;
    }
  }

  async createPatient(patient: Omit<Patient, 'id'>): Promise<Patient> {
    try {
      return await apiService.post<Patient>('/patients', patient);
    } catch {
      const newPatient: Patient = {
        ...patient,
        id: Date.now().toString(),
      };
      this.dummyData.push(newPatient);
      return newPatient;
    }
  }

  async updatePatient(id: string, updates: Partial<Patient>): Promise<Patient> {
    try {
      return await apiService.put<Patient>(`/patients/${id}`, updates);
    } catch {
      const index = this.dummyData.findIndex(p => p.id === id);
      if (index !== -1) {
        this.dummyData[index] = { ...this.dummyData[index], ...updates };
        return this.dummyData[index];
      }
      throw new Error('Patient not found');
    }
  }

  async deletePatient(id: string): Promise<void> {
    try {
      await apiService.delete(`/patients/${id}`);
    } catch {
      const index = this.dummyData.findIndex(p => p.id === id);
      if (index !== -1) {
        this.dummyData.splice(index, 1);
      }
    }
  }
}

export const patientsService = new PatientsService();
