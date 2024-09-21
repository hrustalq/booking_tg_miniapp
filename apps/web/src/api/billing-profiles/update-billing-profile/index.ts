import { apiClient } from "@/api";
import { UpdateBillingProfileDto } from "./types";
import { UpdateResult } from "../types";

export default async function updateBillingProfile(branchId: string, data: UpdateBillingProfileDto): Promise<UpdateResult> {
  const { data: result } = await apiClient.put(`/billing-profiles/${branchId}`, data);
  return result;
}