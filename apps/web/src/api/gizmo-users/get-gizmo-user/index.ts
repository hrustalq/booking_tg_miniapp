import { apiClient } from "@/api";

export default async function (id: number) {
  const REQUEST_URL = `/users/gizmo/${id}`;
  const { data } = await apiClient.get(REQUEST_URL)

  return data;
}