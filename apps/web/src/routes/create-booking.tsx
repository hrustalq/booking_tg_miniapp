import React, { useCallback, useEffect, useState } from 'react';
import { useBookingStore } from '@/store/bookingStore';
import { NavigationButtons } from '@/components/booking/NavigationButtons';
import { BookingContent } from '@/components/booking/BookingContent';
import { Calendar } from 'lucide-react';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { ClubSelection } from '@/components/booking/ClubSelection';
import { ZoneSelection } from '@/components/booking/ZoneSelection';
import { ComputerSelection } from '@/components/booking/ComputerSelection';
import { AccountSelection } from '@/components/booking/AccountSelection';
import { BookingConfirmation } from '@/components/booking/BookingConfirmation';
import { ConfirmationDialog } from '@/components/booking/ConfirmationDialog';
import { useBookingsQuery } from '@/queries/useBookingsQueries';
import { useAuth } from '@/hooks/use-auth';
import { BookingStatus } from '@/api';
import { redirect } from 'react-router-dom';

const CreateBookingPage: React.FC = () => {
  const { telegramUser } = useAuth();
  const { data: bookings } = useBookingsQuery(telegramUser!.id);
  const { resetBooking, step, setBookingStatus } = useBookingStore();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [blockedNavigation, setBlockedNavigation] = useState<(() => void) | null>(null);

  const handleConfirmNavigation = () => {
    setShowConfirmDialog(false);
    resetBooking();
    if (blockedNavigation) {
      blockedNavigation();
      setBlockedNavigation(null);
    }
  };

  const handleCancelNavigation = () => {
    setShowConfirmDialog(false);
    setBlockedNavigation(null);
  };

  useEffect(() => {
    if (!showConfirmDialog) setBookingStatus('confirmation');
  }, [setBookingStatus, showConfirmDialog])

  useEffect(() => {
    if (bookings?.items.find((booking) => booking.status === BookingStatus.PENDING)) {
      resetBooking();
      redirect('/booking/list-bookings');
    }
  }, [bookings, resetBooking, setBookingStatus]);

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return <ClubSelection />;
      case 2:
        return <ZoneSelection />;
      case 3:
        return <ComputerSelection />;
      case 4:
        return <AccountSelection />;
      case 5:
        return <BookingConfirmation />;
      default:
        return null;
    }
  };

  const handleConfirmBooking = useCallback(() => {
    setShowConfirmDialog(true);
  }, []);

  return (
    <div className="">
      <div className="flex gap-x-3 items-center mb-2">
        <Calendar className="size-7" />
        <h1 className="text-3xl font-bold">
          Бронирование
        </h1>
      </div>
      <BookingContent>
        {renderStepContent()}
      </BookingContent>
      <NavigationButtons onConfirmBooking={handleConfirmBooking} />
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Подтвердите действие</AlertDialogTitle>
            <AlertDialogDescription>
              Вы уверены, что хотите покинуть страницу бронирования? Все несохраненные данные будут утеряны.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelNavigation}>Отмена</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmNavigation}>Подтвердить</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <ConfirmationDialog 
        isOpen={showConfirmDialog}
        onOpenChange={setShowConfirmDialog}
      />
    </div>
  );
};

export default CreateBookingPage;