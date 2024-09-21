import React from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useBookingStore } from '@/store/bookingStore';
import { ConfirmationContent } from './ConfirmationContent';
import { BookingCreationContent } from './BookingCreationContent';

interface ConfirmationDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  onOpenChange,
}) => {
  const { bookingStatus } = useBookingStore();

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="mx-auto sm:mx-0 w-[95%]">
        {bookingStatus === 'confirmation' ? (
          <ConfirmationContent onOpenChange={onOpenChange} />
        ) : (
          <BookingCreationContent />
        )}
      </DialogContent>
    </Dialog>
  );
};