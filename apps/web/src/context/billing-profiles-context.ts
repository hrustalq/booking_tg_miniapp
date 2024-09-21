import { createContext } from "react";
import { BillingProfileModel, BillingProfileRateModel } from "../api/billing-profiles/types";

interface BillingProfilesContextType {
  billingProfiles: BillingProfileModel[];
  isLoadingBillingProfiles: boolean;
  billingProfilesError: Error | null;
  refetchBillingProfiles: () => void;
  getBillingProfileRates: (branchId: string, id: number) => Promise<BillingProfileRateModel[]>;
}

const BillingProfilesContext = createContext<BillingProfilesContextType | undefined>(undefined);

export default BillingProfilesContext;