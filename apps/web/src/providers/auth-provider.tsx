import React, { useEffect, useState, useCallback } from 'react';
import WebApp from '@twa-dev/sdk';
import AuthContext from '../context/auth-context';

export type TelegramUser = typeof WebApp.initDataUnsafe.user;

export type GizmoUser = {
  username: string;
  id: number;
};

export type User = {
  telegramData: TelegramUser;
  gizmoData: GizmoUser | null;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const authenticate = useCallback(() => {
    if (!WebApp) {
      return;
    }
    if (!user) {
      const telegramUser = WebApp.initDataUnsafe.user;
      setUser({ telegramData: telegramUser, gizmoData: null });
    }
  }, [user]);

  useEffect(() => {
    authenticate();
  }, [authenticate]);

  return (
    <AuthContext.Provider value={{ user, authenticate }}>
      {children}
    </AuthContext.Provider>
  );
};