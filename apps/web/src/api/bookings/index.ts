import { CreateBookigParams } from "./create-booking"
import { GetBookingsByUserIdParams } from "./get-bookings-by-userid"

export * from "./create-booking"
export * from "./get-bookings-by-userid"
export * from "./types"

export default {
  async createBooking(params: CreateBookigParams) {
    return await import("./create-booking").then(m => m.default(params))
  },
  async getBookings(userId: number) {
    return await import("./get-bookings").then(m => m.default(userId))
  },
  async getBookingsByUserId(params: GetBookingsByUserIdParams) {
    return await import("./get-bookings-by-userid").then(m => m.default(params))
  }
}
