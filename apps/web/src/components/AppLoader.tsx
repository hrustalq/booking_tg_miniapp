import React, { useMemo } from 'react';
import { useAuth } from '../hooks/use-auth';
import { useQueryClient } from '@tanstack/react-query';
import { LoaderCircle } from 'lucide-react';

const AppLoader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoading: isAuthLoading, telegramUser } = useAuth();
  const queryClient = useQueryClient();

  const branchesQuery = queryClient.getQueryState(['branches']);
  const linkedAccountsQuery = queryClient.getQueryState(['linkedGizmoAccounts', telegramUser?.id]);

  const isLoading = useMemo(() => 
    isAuthLoading 
    || branchesQuery?.status === 'pending' 
    || linkedAccountsQuery?.status === 'pending',
  [isAuthLoading, branchesQuery, linkedAccountsQuery]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <LoaderCircle className="w-16 h-16 animate-spin text-blue-500" />
      </div>
    );
  }

  return <>{children}</>;
};

export default AppLoader;