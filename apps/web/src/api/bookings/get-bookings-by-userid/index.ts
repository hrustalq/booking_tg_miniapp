import { apiClient, Booking, PaginatedResponse } from '@/api';
import { GetBookingsByUserIdParams } from './types';

export * from './types';
export default async function(params: GetBookingsByUserIdParams) {
  const { data } = await apiClient.get<PaginatedResponse<Booking>>(
    `/bookings/user/${params.userId}?page=${params.page}&limit=${params.limit}`
  );
  return data;
}
