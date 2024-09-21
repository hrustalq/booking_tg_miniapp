import React from 'react';
import { motion, AnimatePresence, Variant, Transition } from 'framer-motion';
import { useBookingStore } from '@/store/bookingStore';

interface BookingContentProps {
  children: React.ReactNode;
}

const stepComponents = [
  { key: 'club', title: 'Выберите компьютерный клуб', path: 'club' },
  { key: 'zone', title: 'Выберите зону', path: 'zone' },
  { key: 'computer', title: 'Выберите компьютер', path: 'computer' },
  { key: 'account', title: 'Выберите аккаунт', path: 'account' },
  { key: 'confirmation', title: 'Подтверждение бронирования', path: 'confirmation' },
];

export const BookingContent: React.FC<BookingContentProps> = ({ children }) => {
  const { step, direction } = useBookingStore();

  const pageVariants: Record<string, Variant> = {
    enter: (direction: 'forward' | 'backward') => ({
      x: direction === 'forward' ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: 'forward' | 'backward') => ({
      x: direction === 'forward' ? '-100%' : '100%',
      opacity: 0,
    }),
  };

  const pageTransition = {
    type: 'tween',
    ease: [0.25, 0.1, 0.25, 1],
    duration: 0.4,
  } satisfies Transition;

  const currentStep = stepComponents[Math.max(0, step - 1)];

  return (
    <div className="flex flex-col overflow-hidden relative">
      <AnimatePresence mode="popLayout" initial={false} custom={direction}>
        <motion.div
          key={currentStep?.key || 'initial'}
          custom={direction}
          variants={pageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={pageTransition}
          className="w-full flex flex-col"
        >
          <h2 className="text-xl font-bold mb-4">{currentStep?.title || 'Начало бронирования'}</h2>
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};