import { apiClient } from "@/api";
import { LinkAccountParams } from "./types";

export * from "./types";
export default async function(params: LinkAccountParams) {
  const { gizmoAccountInternalId, branchId, credentials } = params;

  const response = await apiClient.post(`/users/link-account`, {
    params: {
      gizmoAccountInternalId,
      branchId,
    },
    data: credentials,
  });

  return response.data;
}