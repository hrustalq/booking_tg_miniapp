import { apiClient } from "@/api";
import { DeleteResult } from "../types";

export default async function deleteBillingProfileRate(branchId: string, id: number, rateId: number): Promise<DeleteResult> {
  const { data } = await apiClient.delete(`/billing-profiles/${branchId}/${id}/rates/${rateId}`);
  return data;
}