import { apiClient } from "@/api";
import { ValidateGizmoUserParams } from "./types";

export * from "./types";
export default async function (params: ValidateGizmoUserParams) {
  const REQUEST_URL = "/users/gizmo/verify";

  const { data } = await apiClient.post<boolean>(REQUEST_URL, params);

  return data;
}