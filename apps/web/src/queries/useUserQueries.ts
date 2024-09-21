import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { gizmoUsersApi, GizmoUser } from '@/api';

export const useLinkedGizmoAccountsQuery = (telegramUserId: number | undefined): UseQueryResult<GizmoUser[], Error> => 
  useQuery<GizmoUser[], Error>({
    queryKey: ['linkedGizmoAccounts', telegramUserId],
    staleTime: 1000 * 60 * 60,
    queryFn: async () => {
      if (!telegramUserId) return [];
      return gizmoUsersApi.getLinkedAccount(telegramUserId);
    },
    enabled: !!telegramUserId,
  });
