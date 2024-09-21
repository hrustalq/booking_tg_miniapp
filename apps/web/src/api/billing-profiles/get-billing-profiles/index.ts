import { apiClient } from "@/api";
import { GetBillingProfilesParams, GetBillingProfilesResponse } from "./types";

export default async function getBillingProfiles(params: GetBillingProfilesParams): Promise<GetBillingProfilesResponse> {
  const { branchId, userGroupId, ...queryParams } = params;
  const { data } = await apiClient.get(`/billing-profiles/${branchId}`, { params: { userGroupId, ...queryParams } });
  return data;
}