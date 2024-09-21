import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/hooks/use-auth';
import { BookingCard } from '@/components/booking-card';
import { useBookingsQuery } from '@/queries/useBookingsQueries';
const BookingList: React.FC = () => {
  const { telegramUser, gizmoAccounts } = useAuth();
  const { data: bookings, isLoading } = useBookingsQuery(telegramUser!.id);
  
  if (!telegramUser) {
    return (
      <p className="text-center text-gray-500">Ошибка при загрузке данных пользователя</p>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <Skeleton key={index} className="h-32 w-full bg-gray-700 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {bookings?.items.map((booking) => {
        return (
          <BookingCard key={booking.id} booking={booking} gizmoAccounts={gizmoAccounts} />
        );
      })}
    </div>
  );
};

export default BookingList;