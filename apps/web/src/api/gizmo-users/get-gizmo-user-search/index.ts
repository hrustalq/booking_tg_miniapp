import { GetGizmoUserSeachParams } from "./types";
import { apiClient } from "@/api";

export * from "./types";
export default async function (params: GetGizmoUserSeachParams) {
  const REQUEST_URL = "/users/gizmo/search";
  const { data } = await apiClient.get(REQUEST_URL, {
    params
  })

  return data;
}