
import { apiService } from './api';
import { Review } from '@/types/entities';

const dummyReviews: Review[] = [
  {
    id: '1',
    patientId: '1',
    patientName: 'John Smith',
    providerId: '1',
    providerName: 'Dr. Sarah Wilson',
    serviceId: '1',
    serviceName: 'Cardiology Consultation',
    rating: 5,
    comment: 'Excellent service! Dr. Wilson was very thorough and professional. Highly recommend!',
    status: 'approved',
    createdAt: '2024-01-19T09:30:00Z',
    updatedAt: '2024-01-19T10:00:00Z'
  },
  {
    id: '2',
    patientId: '2',
    patientName: 'Emma Johnson',
    providerId: '2',
    providerName: 'Dr. Michael Chen',
    serviceId: '2',
    serviceName: 'Dermatology Treatment',
    rating: 2,
    comment: 'Service was okay but the waiting time was too long. The doctor seemed rushed.',
    status: 'pending',
    createdAt: '2024-01-18T16:45:00Z',
    updatedAt: '2024-01-18T16:45:00Z'
  },
  {
    id: '3',
    patientId: '3',
    patientName: 'Michael Davis',
    providerId: '3',
    providerName: 'Dr. Emily Rodriguez',
    serviceId: '3',
    serviceName: 'Pediatric Checkup',
    rating: 4,
    comment: 'Great experience with pediatric care. Dr. Rodriguez was wonderful with my child.',
    status: 'rejected',
    createdAt: '2024-01-17T11:20:00Z',
    updatedAt: '2024-01-17T12:00:00Z'
  }
];

class ReviewsService {
  private dummyData: Review[] = [...dummyReviews];

  async getReviews(): Promise<Review[]> {
    try {
      return await apiService.get<Review[]>('/reviews');
    } catch {
      return this.dummyData;
    }
  }

  async getReview(id: string): Promise<Review | null> {
    try {
      return await apiService.get<Review>(`/reviews/${id}`);
    } catch {
      return this.dummyData.find(r => r.id === id) || null;
    }
  }

  async createReview(review: Omit<Review, 'id'>): Promise<Review> {
    try {
      return await apiService.post<Review>('/reviews', review);
    } catch {
      const newReview: Review = {
        ...review,
        id: Date.now().toString(),
      };
      this.dummyData.push(newReview);
      return newReview;
    }
  }

  async updateReview(id: string, updates: Partial<Review>): Promise<Review> {
    try {
      return await apiService.put<Review>(`/reviews/${id}`, updates);
    } catch {
      const index = this.dummyData.findIndex(r => r.id === id);
      if (index !== -1) {
        this.dummyData[index] = { ...this.dummyData[index], ...updates };
        return this.dummyData[index];
      }
      throw new Error('Review not found');
    }
  }

  async deleteReview(id: string): Promise<void> {
    try {
      await apiService.delete(`/reviews/${id}`);
    } catch {
      const index = this.dummyData.findIndex(r => r.id === id);
      if (index !== -1) {
        this.dummyData.splice(index, 1);
      }
    }
  }
}

export const reviewsService = new ReviewsService();
