import { apiClient } from "@/api";
import { CreateBillingProfileDto } from "./types";
import { CreateResult } from "../types";

export default async function createBillingProfile(branchId: string, data: CreateBillingProfileDto): Promise<CreateResult> {
  const { data: result } = await apiClient.post(`/billing-profiles/${branchId}`, data);
  return result;
}