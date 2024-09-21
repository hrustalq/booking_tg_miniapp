import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { zonesApi, Zone } from '@/api';

export const useZonesQuery = (branchId: string | null): UseQueryResult<Zone[], Error> => 
  useQuery<Zone[], Error>({
    queryKey: ['zones', branchId],
    staleTime: 1000 * 60 * 60,
    queryFn: async () => {
      if (!branchId) return [];
      const response = await zonesApi.getZones({ branchId, page: 1, limit: 100 });
      return response.items;
    },
    enabled: !!branchId,
  });