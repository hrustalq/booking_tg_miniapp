import { List, Lock } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const BookingLinksPage: React.FC = () => {
  return (
    <div className='flex h-full overflow-x-hidden overflow-y-auto flex-gol gap-6 justify-center items-center'>
      <div className='flex flex-col gap-y-4'>
        <div className='py-4 px-6 flex items-center gap-x-4 rounded-md border'>
          <List className='size-7' />
          <Link className='dark:bg-gray-900 font-medium text-lg' to='/booking/list-bookings'>Список бронирований</Link>
        </div>
        <div className='flex items-center gap-x-3 py-4 px-6 rounded-md border'>
          <Lock className='size-7' />
          <Link className='dark:bg-gray-900 font-medium text-lg' to='/booking/create-booking'>Создать бронирование</Link>
        </div>
      </div>
    </div>
  )
};

export default BookingLinksPage;
