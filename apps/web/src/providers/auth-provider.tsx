import React, { useEffect, useCallback, useState } from 'react';
import WebApp from '@twa-dev/sdk';
import { Role, TelegramUser } from '../api/telegram-users/types';
import { 
  Branch, 
  UserGroupDto, 
  BillingProfileModel,
  GizmoUser
} from '@/api';
import { useBranchesQuery } from '@/queries/useBranchesQueries';
import { useLinkedGizmoAccountsQuery } from '@/queries/useUserQueries';
import { useUserGroupsQuery } from '@/queries/useUserGroupsQuery';
import { useBillingProfilesQuery } from '@/queries/useBillingProfilesQuery';
import { useQueryClient } from '@tanstack/react-query';

export interface AuthContextType {
  telegramUser: TelegramUser | null;
  gizmoAccounts: GizmoUser[];
  isLoadingGizmoAccounts: boolean;
  gizmoAccountsError: unknown;
  authenticate: () => void;
  isLoading: boolean;
  error: Error | null;
  branches: Branch[];
  linkedProfiles: GizmoUser[];
  userGroups: UserGroupDto[];
  billingProfiles: BillingProfileModel[];
}

export const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [telegramUser, setTelegramUser] = useState<TelegramUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const { data: branches = [] } = useBranchesQuery();
  const { data: linkedProfiles = [], isLoading: isLoadingGizmoAccounts, error: gizmoAccountsError } = useLinkedGizmoAccountsQuery(telegramUser?.id);

  // Assume we're using the first branch for user groups and billing profiles
  const firstBranchId = branches[0]?.id;
  const { data: userGroups = [] } = useUserGroupsQuery(firstBranchId);
  const { data: billingProfiles = [] } = useBillingProfilesQuery(firstBranchId);

  const authenticate = useCallback(() => {
    setIsLoading(true);
    try {
      if (!WebApp.initDataUnsafe?.user) {
        if (import.meta.env.DEV) {
          // Use a more robust fallback mechanism for development
          const user: TelegramUser = {
            id: +import.meta.env.VITE_FALLBACK_TELEGRAM_ID || 0,
            first_name: import.meta.env.VITE_FALLBACK_TELEGRAM_FIRST_NAME || 'Dev',
            last_name: import.meta.env.VITE_FALLBACK_TELEGRAM_LAST_NAME || 'User',
            username: import.meta.env.VITE_FALLBACK_TELEGRAM_USERNAME || 'devuser',
            language_code: import.meta.env.VITE_FALLBACK_TELEGRAM_LANGUAGE_CODE || 'en',
            is_premium: Boolean(import.meta.env.VITE_FALLBACK_TELEGRAM_IS_PREMIUM),
            allows_write_to_pm: Boolean(import.meta.env.VITE_FALLBACK_TELEGRAM_ALLOWED_WRITE_TO_PM),
            role: Role.ADMIN,
          };
          setTelegramUser(user);
        }
        return;
      }
      const user: TelegramUser = {
        ...WebApp.initDataUnsafe.user,
        role: Role.USER,
      };
      setTelegramUser(user);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    authenticate();
  }, [authenticate]);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (telegramUser) {
      // Предзагрузка важных данных
      queryClient.prefetchQuery({ queryKey: ['branches'] });
      queryClient.prefetchQuery({ queryKey: ['linkedGizmoAccounts', telegramUser.id] });
    }
  }, [telegramUser, queryClient]);

  const contextValue: AuthContextType = {
    telegramUser,
    gizmoAccounts: linkedProfiles,
    isLoadingGizmoAccounts,
    gizmoAccountsError,
    authenticate,
    isLoading,
    error,
    branches,
    linkedProfiles,
    userGroups,
    billingProfiles,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};