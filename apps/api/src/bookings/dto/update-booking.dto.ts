import { BookingStatus } from '@prisma/client';

export class UpdateBookingDto {
  status: BookingStatus;
  endTime: Date;
}
