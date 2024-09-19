import { apiClient } from "@/api";
import { PaginatedResponse, PaginationParams } from "@/api/types";
import { Branch } from "../types";

export default async function (params: PaginationParams) {
  const { data } = await apiClient.get<PaginatedResponse<Branch>>('/branches', { params });
  return data;
}