import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { billingProfilesApi, BillingProfileModel } from '@/api';

export const useBillingProfilesQuery = (branchId: string): UseQueryResult<BillingProfileModel[], Error> => 
  useQuery<BillingProfileModel[], Error>({
    queryKey: ['billingProfiles', branchId],
    queryFn: async () => {
      const response = await billingProfilesApi.getBillingProfiles({ branchId, userGroupId: 0 });
      return response.data || []; // Assuming the API returns a paginated response
    },
    enabled: !!branchId,
  });