import { apiClient } from "@/api";
import { BillingProfileRateDto } from "../types";
import { UpdateResult } from "../types";

export default async function updateBillingProfileRate(branchId: string, data: BillingProfileRateDto): Promise<UpdateResult> {
  const { data: result } = await apiClient.put(`/billing-profiles/${branchId}/rates`, data);
  return result;
}