import { apiClient, PaginatedResponse } from "@/api";
import { GetZonesParams } from "./types";
import { Zone } from "../types";

export * from "./types";

export default async function (params: GetZonesParams) {
  const REQUEST_URL = "/zones";

  const { data } = await apiClient.get<PaginatedResponse<Zone>>(REQUEST_URL, {
    params,
  });

  return data;
}