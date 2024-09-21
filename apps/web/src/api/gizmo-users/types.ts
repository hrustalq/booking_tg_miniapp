import { Branch } from "../branches/types";
import { TelegramUser } from "../telegram-users";

export interface GizmoUser {
  id: number;
  guid: string;
  username: string;

  balance: number;
  phone: string;

  internalId: number;

  branch?: Branch;
  branchId: string;

  telegramUser: TelegramUser;
  telegramUserId: number;
}