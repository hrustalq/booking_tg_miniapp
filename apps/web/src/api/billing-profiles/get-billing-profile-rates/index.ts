import { apiClient } from "@/api";
import { BillingProfileRateModel } from "../types";

export default async function getBillingProfileRates(branchId: string, id: number): Promise<BillingProfileRateModel[]> {
  const { data } = await apiClient.get(`/billing-profiles/${branchId}/${id}/rates`);
  return data;
}