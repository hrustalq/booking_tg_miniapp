import { BillingProfileRateModel } from "../types";

export interface CreateBillingProfileDto {
  name?: string | null;
  defaultRate: BillingProfileRateModel;
}