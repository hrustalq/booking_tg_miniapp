import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { branchesApi, Branch } from '@/api';

export const useBranchesQuery = (): UseQueryResult<Branch[], Error> => 
  useQuery<Branch[], Error>({
    queryKey: ['branches'],
    staleTime: 1000 * 60 * 60,
    queryFn: async () => {
      const response = await branchesApi.getBranches({ page: 1, limit: 100 });
      return response.items;
    },
  });