import React, { useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FaUser, FaDesktop, FaClock, FaCalendarAlt } from 'react-icons/fa';
import { formatDate } from '@/lib/utils';
import { Booking, GizmoUser } from '@/api'; // Предполагаем, что эти типы определены

interface BookingCardProps {
  booking: Booking;
  gizmoAccounts?: GizmoUser[];
}

export const BookingCard: React.FC<BookingCardProps> = ({ booking, gizmoAccounts }) => {

  const gizmoAccount = useMemo(() => {
    return gizmoAccounts?.find(account => account.internalId === booking.gizmoAccountId);
  }, [booking.gizmoAccountId, gizmoAccounts]);

  return (
    <Card key={booking.id} className="relative p-3">
      <div className='w-full flex justify-end mb-2'>
        <Badge 
          className="ml-auto" 
          variant={getStatusVariant(booking.status)}
        >
          {getStatusText(booking.status)}
        </Badge>
      </div>
      <CardContent className="flex p-0 flex-col gap-y-2">
        <p className='font-medium text-lg'>#{booking.id}</p>
        <div className="flex items-center gap-x-2">
          <FaUser className="text-blue-600" />
          <p className="text-sm">
            Аккаунт: <span className="font-medium">{gizmoAccount?.username || 'Неизвестно'}</span>
          </p>
        </div>
        <div className="flex items-center gap-x-2">
          <FaDesktop className="text-green-600" />
          <p className="text-sm">
            Компьютер: <span className="font-medium">{booking.pcId}</span>
          </p>
        </div>
        <div className="flex items-center gap-x-2">
          <FaClock className="text-purple-600" />
          <p className="text-sm">
            Начало: <span className="font-medium">{formatDate(booking.startTime)}</span>
          </p>
        </div>
        {booking.endTime && (
          <div className="flex items-center gap-x-2">
            <FaCalendarAlt className="text-red-600" />
            <p className="text-sm">
              Окончание: <span className="font-medium">{formatDate(booking.endTime)}</span>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};


function getStatusVariant(status: string): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case 'PENDING':
      return 'secondary';
    case 'PAYMENT_REQUIRED':
      return 'destructive';
    case 'PAID':
      return 'default';
    case 'CANCELLED':
      return 'outline';
    case 'COMPLETED':
      return 'default';
    default:
      return 'outline';
  }
}

function getStatusText(status: string): string {
  switch (status) {
    case 'PENDING':
      return 'Ожидает подтверждения';
    case 'PAYMENT_REQUIRED':
      return 'Требуется оплата';
    case 'PAID':
      return 'Оплачено';
    case 'CANCELLED':
      return 'Отменено';
    case 'COMPLETED':
      return 'Завершено';
    default:
      return 'Неизвестный статус';
  }
}
