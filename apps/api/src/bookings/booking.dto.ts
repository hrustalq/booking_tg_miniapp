import { BookingStatus } from '@prisma/client';

export class CreateBookingDto {
  userId?: number;
  pcId: string;
  startTime: Date;
  endTime: Date;
  status?: BookingStatus;
  paymentId?: string;
}

export class UpdateBookingDto {
  userId?: number;
  pcId?: string;
  startTime?: Date;
  endTime?: Date;
  status?: BookingStatus;
  paymentId?: string;
}
