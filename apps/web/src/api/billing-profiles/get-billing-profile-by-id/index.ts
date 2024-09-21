import { apiClient } from "@/api";
import { BillingProfileModel } from "../types";

export default async function getBillingProfileById(branchId: string, id: number, expand?: string[]): Promise<BillingProfileModel> {
  const { data } = await apiClient.get(`/billing-profiles/${branchId}/${id}`, { params: { Expand: expand } });
  return data;
}