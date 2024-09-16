import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import WebApp from '@twa-dev/sdk';

type TelegramUser = typeof WebApp.initDataUnsafe.user;

type GizmoUser = {
  username: string;
  id: number;
};

type User = {
  telegramData: TelegramUser;
  gizmoData: GizmoUser | null;
}

interface AuthContextType {
  user: User | null;
  authenticate: (user: TelegramUser) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

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