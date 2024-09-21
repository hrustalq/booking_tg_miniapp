import { apiClient } from "@/api";
import { DeleteResult } from "../types";

export default async function deleteBillingProfile(branchId: string, id: number): Promise<DeleteResult> {
  const { data } = await apiClient.delete(`/billing-profiles/${branchId}/${id}`);
  return data;
}