import { apiClient, PaginatedResponse } from "@/api";
import { GetPcsParams } from "./types";
import { Pc } from "../types";

export * from "./types";
export default async function(params: GetPcsParams) {
  const REQUEST_URL = "/pcs";

  const { data } = await apiClient.get<PaginatedResponse<Pc>>(REQUEST_URL, {
    params,
  });

  return data;
}