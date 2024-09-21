import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useBookingStore } from '@/store/bookingStore';
import { Loader2 } from 'lucide-react';

export const NavigationButtons: React.FC<{ onConfirmBooking: () => void }> = ({ onConfirmBooking }) => {
  const navigate = useNavigate();
  const { 
    step, 
    isLoading,
    handleButtonClick,
    isNextButtonDisabled,
  } = useBookingStore();

  const handleNavigation = (direction: 'next' | 'prev') => {
    handleButtonClick(direction, navigate);
  };

  const isLastStep = step === 5;
  const canGoBack = step > 1;

  return (
    <div className="flex gap-x-3 mt-4 absolute bottom-20 w-3/4 right-4">
      {canGoBack && (
        <Button onClick={() => handleNavigation('prev')} className="grow">
          Назад
        </Button>
      )}
      {!isLastStep && (
        <Button 
          onClick={() => handleNavigation('next')} 
          disabled={isNextButtonDisabled}
          className="grow"
        >
          { isLoading ? <Loader2 className="animate-spin" /> : 'Далее' }
        </Button>
      )}
      {isLastStep && (
        <Button 
          onClick={onConfirmBooking}
          disabled={isNextButtonDisabled}
          className="grow"
        >
          { isLoading ? <Loader2 className="animate-spin" /> : 'Подтвердить бронирование' }
        </Button>
      )}
    </div>
  );
};