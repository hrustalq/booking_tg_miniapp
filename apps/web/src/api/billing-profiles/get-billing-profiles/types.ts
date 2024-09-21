import { BillingProfileModelPagedList } from "../types";

export interface GetBillingProfilesParams {
  branchId: string;
  userGroupId: number;
  limit?: number;
  sortBy?: string;
  isAsc?: boolean;
  isScroll?: boolean;
  cursor?: string;
  billingProfileName?: string;
  expand?: string[];
}

export type GetBillingProfilesResponse = BillingProfileModelPagedList;