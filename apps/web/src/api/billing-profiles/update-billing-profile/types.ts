import { BillingProfileRateModel } from "../types";

export interface UpdateBillingProfileDto {
  id: number;
  name?: string | null;
  defaultRate: BillingProfileRateModel;
}