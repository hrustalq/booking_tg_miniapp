import { Booking, CreateBookigParams } from "..";
import { apiClient } from "@/api";

export * from "./types"
export default async function(params: CreateBookigParams) {
  const REQUEST_URL = "/bookings"

  const { data } = await apiClient.post<Booking>(REQUEST_URL, params)

  return data
}