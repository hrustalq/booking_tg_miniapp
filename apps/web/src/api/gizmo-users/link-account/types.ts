import { TelegramUser } from "@/api/telegram-users";

export interface LinkAccountParams {
  gizmoAccountInternalId: number;
  branchId: string;
  credentials: {
    username: string;
    password: string;
  };
  data: Omit<TelegramUser, 'role' | 'gizmoProfile'>;
}