import { createContext } from "react";
import type { TelegramUser } from "../api/telegram-users/types";
import type { GizmoUser } from "../api/gizmo-users/types";

interface AuthContextType {
  telegramUser: TelegramUser | null;
  gizmoAccounts: GizmoUser[];
  isLoadingGizmoAccounts: boolean;
  gizmoAccountsError: unknown;
  authenticate: () => void;
}

const AuthContext = createContext<AuthContextType>({
  telegramUser: null,
  gizmoAccounts: [],
  isLoadingGizmoAccounts: false,
  gizmoAccountsError: null,
  authenticate: () => {},
});

export default AuthContext;
