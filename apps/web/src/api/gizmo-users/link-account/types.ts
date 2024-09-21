import { TelegramUser } from "@/api/telegram-users";

export interface LinkAccountParams {
  gizmoAccountInternalId: number;
  branchId: string;
  data: {
    username: string;
    password: string;
  };
  credentials: Omit<TelegramUser, 'role' | 'gizmoProfile'>;
}