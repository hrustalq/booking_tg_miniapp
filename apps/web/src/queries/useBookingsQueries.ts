import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { bookingsApi, Booking, PaginatedResponse } from '@/api';

export const useConfirmBookingQuery = (userId: number, branchId: string, zoneId: string, pcId: number, gizmoAccountId: number): UseQueryResult<Booking, Error> => 
  useQuery<Booking, Error>({
    queryKey: ['confirmBooking', userId, branchId, zoneId, pcId, gizmoAccountId],
    queryFn: async () => {
      const response = await bookingsApi.createBooking({
        userId,
        branchId,
        zoneId,
        pcId,
        gizmoAccountId,
      });
      return response;
    },
    enabled: !!userId && !!branchId && !!zoneId && !!pcId && !!gizmoAccountId,
  });

export const useBookingsQuery = (telegramUserId: number, page: number = 1, limit: number = 10): UseQueryResult<PaginatedResponse<Booking>, Error> => 
  useQuery<PaginatedResponse<Booking>, Error>({
    queryKey: ['bookings', telegramUserId],
    refetchInterval: 1000 * 10,
    staleTime: 1000 * 10,
    queryFn: () => bookingsApi.getBookingsByUserId({ userId: telegramUserId, page, limit }),
    enabled: !!telegramUserId,
  });