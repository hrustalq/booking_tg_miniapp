import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { pcsApi, Pc } from '@/api';

export const usePcsQuery = (zoneId: string | null, branchId: string | null): UseQueryResult<Pc[], Error> => 
  useQuery<Pc[], Error>({
    queryKey: ['pcs', zoneId, branchId],
    staleTime: 1000 * 5,
    queryFn: async () => {
      if (!zoneId || !branchId) return [];
      const response = await pcsApi.getPcs({ zoneId, branchId, page: 1, limit: 100 });
      return response.items;
    },
    enabled: !!zoneId && !!branchId,
  });