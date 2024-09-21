import { apiClient } from "@/api";
import { BillingProfileRateDto } from "../types";
import { CreateResult } from "../types";

export default async function createBillingProfileRate(branchId: string, id: number, data: BillingProfileRateDto): Promise<CreateResult> {
  const { data: result } = await apiClient.post(`/billing-profiles/${branchId}/${id}/rates`, data);
  return result;
}