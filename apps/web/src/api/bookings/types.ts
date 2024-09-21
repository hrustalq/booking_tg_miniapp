export interface Booking {
  id: string;
  userId: number;
  pcId: number;
  gizmoAccountId: number;
  branchId: string;
  startTime: Date;
  endTime: Date | null;
  status: BookingStatus;
}

export enum BookingStatus {
  PENDING = 'PENDING',
  PAYMENT_REQUIRED = 'PAYMENT_REQUIRED',
  PAID = 'PAID',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED'
}