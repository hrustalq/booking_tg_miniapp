import { apiClient } from "@/api";
import { Branch } from "../types";

export default async function (id: string) {
  const { data } = await apiClient.get<Branch>(`/branches/${id}`);

  return data;
}