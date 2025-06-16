
export interface Provider {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialty: string;
  location: string;
  rating: number;
  status: 'active' | 'inactive' | 'pending';
  joinedDate: string;
  totalPatients: number;
  revenue: number;
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  address: string;
  lastVisit: string;
  status: 'active' | 'inactive';
  providerId: string;
  totalAppointments: number;
}

export interface Administrator {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'admin' | 'moderator';
  status: 'active' | 'inactive';
  lastLogin: string;
  permissions: string[];
  createdAt: string;
}

export interface Commission {
  id: string;
  providerId: string;
  providerName: string;
  amount: number;
  percentage: number;
  status: 'pending' | 'paid' | 'cancelled';
  period: string;
  createdAt: string;
  paidAt?: string;
}

export interface Payment {
  id: string;
  patientId: string;
  patientName: string;
  providerId: string;
  providerName: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  method: 'card' | 'bank_transfer' | 'cash';
  transactionId: string;
  createdAt: string;
  processedAt?: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  duration: number; // in minutes
  providerId: string;
  providerName: string;
  status: 'active' | 'inactive';
  rating: number;
  totalBookings: number;
  createdAt: string;
}

export interface Review {
  id: string;
  patientId: string;
  patientName: string;
  providerId: string;
  providerName: string;
  serviceId: string;
  serviceName: string;
  rating: number;
  comment: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export interface Communication {
  id: string;
  type: 'email' | 'sms' | 'notification';
  recipient: string;
  subject: string;
  message: string;
  status: 'sent' | 'delivered' | 'failed' | 'pending';
  scheduledAt?: string;
  sentAt?: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  type: 'system' | 'user' | 'financial' | 'security';
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
  status: 'unread' | 'read';
  recipientId: string;
  createdAt: string;
  readAt?: string;
}
