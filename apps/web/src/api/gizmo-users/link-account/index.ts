import { apiClient } from "@/api";
import { LinkAccountParams } from "./types";

export * from "./types";
export default async function(params: LinkAccountParams) {
  const response = await apiClient.post(`/users/link-account`, {
    params: {
      gizmoAccountInternalId: params.gizmoAccountInternalId,
      branchId: params.branchId,
    },
    data: params.data,
    credentials: params.credentials,
  });

  return response.data;
}