export interface IBillingProfile {
  id: number;
  name: string;
  defaultRate: {
    id: number;
    startFee: number;
    minimumFee: number;
    rate: number;
    chargeEvery: number;
    chargeAfter: number;
    isStepBased: boolean;
    rateSteps: unknown[];
    days: unknown[];
  };
  rates: unknown[];
}
