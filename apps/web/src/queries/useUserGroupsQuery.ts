import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { userGroupsApi, UserGroupDto } from '@/api';

export const useUserGroupsQuery = (branchId: string): UseQueryResult<UserGroupDto[], Error> => 
  useQuery<UserGroupDto[], Error>({
    queryKey: ['userGroups', branchId],
    queryFn: async () => {
      const response = await userGroupsApi.getUserGroups({ branchId });
      return response.data || []; // Assuming the API returns a paginated response
    },
    enabled: !!branchId,
  });
