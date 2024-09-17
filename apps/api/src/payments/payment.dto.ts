import { PaymentStatus } from '@prisma/client';

export class CreatePaymentDto {
  amount: number;
  status: PaymentStatus;
  senderCredentialsId?: number;
  receiverCredentialsId?: number;
  senderId: number;
  receiverId: number;
}

export class UpdatePaymentDto {
  amount?: number;
  status?: PaymentStatus;
  senderCredentialsId?: number;
  receiverCredentialsId?: number;
  senderId?: number;
  receiverId?: number;
}
