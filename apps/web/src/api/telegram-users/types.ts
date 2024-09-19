import { GizmoUser } from "../gizmo-users/types";

export interface TelegramUser {
  id: number;
  is_bot?: boolean;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
  photo_url?: string;
  added_to_attachment_menu?: boolean;
  allows_write_to_pm?: boolean;

  role: Role;

  gizmoProfile?: GizmoUser[];

  // bookings?: Booking[];

  // senderPayments?: Payment[];
  // receiverPayments?: Payment[];

  // notifications?: Notification[];
  // paymentCredentials?: PaymentCredentials[];
}

export enum Role {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  USER = 'USER',
  GUEST = 'GUEST',
}
