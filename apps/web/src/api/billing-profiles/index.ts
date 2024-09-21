import { GetBillingProfilesParams } from "./get-billing-profiles/types";
import { CreateBillingProfileDto } from "./create-billing-profile/types";
import { UpdateBillingProfileDto } from "./update-billing-profile/types";
import { BillingProfileRateDto } from "./types";

export * from "./types";
export * from "./get-billing-profiles";

export default {
  async getBillingProfiles(params: GetBillingProfilesParams) {
    return await import("./get-billing-profiles").then(m => m.default(params));
  },
  async createBillingProfile(branchId: string, data: CreateBillingProfileDto) {
    return await import("./create-billing-profile").then(m => m.default(branchId, data));
  },
  async updateBillingProfile(branchId: string, data: UpdateBillingProfileDto) {
    return await import("./update-billing-profile").then(m => m.default(branchId, data));
  },
  async getBillingProfileById(branchId: string, id: number, expand?: string[]) {
    return await import("./get-billing-profile-by-id").then(m => m.default(branchId, id, expand));
  },
  async deleteBillingProfile(branchId: string, id: number) {
    return await import("./delete-billing-profile").then(m => m.default(branchId, id));
  },
  async getBillingProfileRates(branchId: string, id: number) {
    return await import("./get-billing-profile-rates").then(m => m.default(branchId, id));
  },
  async createBillingProfileRate(branchId: string, id: number, data: BillingProfileRateDto) {
    return await import("./create-billing-profile-rate").then(m => m.default(branchId, id, data));
  },
  async updateBillingProfileRate(branchId: string, data: BillingProfileRateDto) {
    return await import("./update-billing-profile-rate").then(m => m.default(branchId, data));
  },
  async deleteBillingProfileRate(branchId: string, id: number, rateId: number) {
    return await import("./delete-billing-profile-rate").then(m => m.default(branchId, id, rateId));
  },
}