import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, XCircle, CheckCircle, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useBookingStore } from '@/store/bookingStore';
import { useConfirmBookingQuery } from '@/queries/useBookingsQueries';
import { useAuth } from '@/hooks/use-auth';

export const BookingCreationContent: React.FC = () => {
  const { bookingStatus, setBookingStatus, selectedClubId, selectedZoneId, selectedComputerId, selectedGizmoAccountId } = useBookingStore();
  const { telegramUser } = useAuth();
  const { data, isLoading, refetch, error } = useConfirmBookingQuery(telegramUser!.id, selectedClubId!, selectedZoneId!, selectedComputerId!, selectedGizmoAccountId!);

  useEffect(() => {
    if (isLoading) setBookingStatus("loading");
    else if (error) setBookingStatus("error");
    else if (data) setBookingStatus("success");
  }, [isLoading, error, setBookingStatus, data])

  if (bookingStatus === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center">
        <Loader2 className="size-20 animate-spin text-primary" />
        <p className="mt-4 text-lg font-medium">Создание бронирования...</p>
      </div>
    );
  }

  if (bookingStatus === 'error') {
    return (
      <div className="flex flex-col items-center justify-center">
        <XCircle className="size-20 text-destructive" />
        <p className="mt-4 text-lg font-medium">Ошибка при создании бронирования</p>
        <Button onClick={() => refetch()} className="mt-4">
          Попробовать снова
        </Button>
      </div>
    );
  }

  if (bookingStatus === 'success') {
    return (
      <div className="flex flex-col items-center justify-center">
        <CheckCircle className="size-20 text-green-500" />
        <p className="mt-4 text-lg font-medium">Бронирование успешно создано</p>
        <div className="flex flex-col gap-4 mt-6 w-full">
          <Button asChild className="w-full">
            <Link to="/booking/list-bookings">Перейти к бронированиям</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Вернуться на главную
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return null;
};