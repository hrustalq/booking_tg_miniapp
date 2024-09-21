import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { useBookingStore } from '@/store/bookingStore';

interface ConfirmationContentProps {
  onOpenChange: (open: boolean) => void;
}

export const ConfirmationContent: React.FC<ConfirmationContentProps> = ({ onOpenChange }) => {
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const { setBookingStatus } = useBookingStore();

  const handleConfirm = () => {
    setBookingStatus('idle');
  };

  return (
    <>
      <DialogDescription>
        Подтверждение бронирования
      </DialogDescription>
      <DialogHeader>
        <DialogTitle>Бронирование</DialogTitle>
      </DialogHeader>
      <div className="py-4">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          После начала бронирования, начнется сеанс на компьютере, который вы выбрали.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          За это время будет списана плата за аренду компьютера.
        </p>
        <Accordion type="single" collapsible className="mb-4">
          <AccordionItem value="terms">
            <AccordionTrigger className='text-sm pb-2'>Условия бронирования</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Бронирование действительно в течение 15 минут после подтверждения.</li>
                <li>Оплата начинается с момента активации компьютера.</li>
                <li>Отмена бонирования возможна не позднее чем за 30 минут до начала сеанса.</li>
                <li>При опоздании более чем на 15 минут бронь может быть отменена.</li>
                <li>Администрация клуба оставляет за собой право отказать в обслуживании.</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            checked={agreedToTerms}
            onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
          />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Я согласен с условиями бронирования
          </label>
        </div>
      </div>
      <DialogFooter>
        <div className='flex flex-row items-center justify-center gap-x-4'>
          <Button className='grow shrink-0' onClick={() => onOpenChange(false)}>Отмена</Button>
          <Button
            className='grow shrink-0' 
            onClick={handleConfirm}
            disabled={!agreedToTerms}
          >
            Подтвердить
          </Button>
        </div>
      </DialogFooter>
    </>
  );
};
