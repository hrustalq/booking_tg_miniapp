import { Booking } from "..";
import { apiClient, PaginatedResponse } from "@/api";

export default async function(userId: number) {
  const REQUEST_URL = `/bookings?userId=${userId}`;

  const { data } = await apiClient.get<PaginatedResponse<Booking>>(REQUEST_URL);

  return data;
}