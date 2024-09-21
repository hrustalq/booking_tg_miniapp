import React from 'react';
import { Calendar } from 'lucide-react';

export const BookingHeader: React.FC = () => (
  <div className="flex items-center gap-x-3 justify-start mb-6">
    <Calendar />
    <h1 className="text-3xl font-bold">Бронирование</h1>
  </div>
);