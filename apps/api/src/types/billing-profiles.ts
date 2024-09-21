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

// Enum for step action in billing rate model
export enum BillingRateStepAction {
  Action0 = 0,
  Action1 = 1,
}

// Day of the week enumeration (assumed from the schema)
export enum DayOfWeek {
  Sunday = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
}

// Interface for BillingProfileRateModelStep
export interface BillingProfileRateModelStep {
  /**
   * The minute at which the step takes effect.
   */
  minute: number;

  /**
   * The action to take for this step.
   */
  action: BillingRateStepAction;

  /**
   * Charge associated with this step.
   */
  charge: number;

  /**
   * The rate for this step.
   */
  rate: number;

  /**
   * The target minute for this rate step.
   */
  targetMinute: number;
}

// Interface for BillingProfileRateModelDayTime
export interface BillingProfileRateModelDayTime {
  /**
   * Start second for the applicable time range.
   */
  startSecond: number;

  /**
   * End second for the applicable time range.
   */
  endSecond: number;
}

// Interface for BillingProfileRateModelDay
export interface BillingProfileRateModelDay {
  /**
   * Day of the week.
   */
  day: DayOfWeek;

  /**
   * Time ranges applicable for this day.
   * Nullable field.
   */
  dayTimesApplicable?: BillingProfileRateModelDayTime[] | null;
}

// Interface for BillingProfileRateModel
export interface BillingProfileRateModel {
  /**
   * Unique identifier for the rate model.
   */
  id: number;

  /**
   * Starting fee for the billing profile.
   */
  startFee: number;

  /**
   * Minimum fee for the billing profile.
   */
  minimumFee: number;

  /**
   * Rate for billing calculations.
   */
  rate: number;

  /**
   * Frequency of charges, measured in seconds.
   */
  chargeEvery: number;

  /**
   * Time after which charges start, measured in seconds.
   */
  chargeAfter: number;

  /**
   * Whether the rate is based on steps.
   */
  isStepBased: boolean;

  /**
   * Rate steps for the billing profile.
   * Nullable field.
   */
  rateSteps?: BillingProfileRateModelStep[] | null;

  /**
   * Applicable days for the billing profile rate.
   * Nullable field.
   */
  days?: BillingProfileRateModelDay[] | null;
}

// Interface for BillingProfileModel
export interface BillingProfileModel {
  /**
   * Unique identifier for the billing profile.
   */
  id: number;

  /**
   * Name of the billing profile.
   * Nullable field.
   */
  name?: string | null;

  /**
   * Default rate for the billing profile.
   */
  defaultRate: BillingProfileRateModel;

  /**
   * Additional rates for the billing profile.
   * Nullable field.
   */
  rates?: BillingProfileRateModel[] | null;
}

// Interface for creating a new billing profile
export interface BillingProfileModelCreate {
  /**
   * Name of the billing profile.
   * Nullable field.
   */
  name?: string | null;

  /**
   * Default rate for the new billing profile.
   */
  defaultRate: BillingProfileRateModel;
}

// Interface for updating an existing billing profile
export interface BillingProfileModelUpdate {
  /**
   * Unique identifier for the billing profile to update.
   */
  id: number;

  /**
   * Updated name for the billing profile.
   * Nullable field.
   */
  name?: string | null;

  /**
   * Updated default rate for the billing profile.
   */
  defaultRate: BillingProfileRateModel;
}

// Interface for paginated list of billing profiles
export interface BillingProfileModelPagedList {
  /**
   * List of billing profiles.
   * Nullable field.
   */
  data?: BillingProfileModel[] | null;

  /**
   * Next cursor for pagination.
   * Nullable field.
   */
  nextCursor?: string | null;

  /**
   * Previous cursor for pagination.
   * Nullable field.
   */
  prevCursor?: string | null;
}

// Interface for creating a new rate for a billing profile
export interface BillingProfileRateModelCreate {
  /**
   * Starting fee for the billing profile.
   */
  startFee: number;

  /**
   * Minimum fee for the billing profile.
   */
  minimumFee: number;

  /**
   * Rate for billing calculations.
   */
  rate: number;

  /**
   * Frequency of charges, measured in seconds.
   */
  chargeEvery: number;

  /**
   * Time after which charges start, measured in seconds.
   */
  chargeAfter: number;

  /**
   * Whether the rate is based on steps.
   */
  isStepBased: boolean;

  /**
   * Rate steps for the billing profile.
   * Nullable field.
   */
  rateSteps?: BillingProfileRateModelStep[] | null;

  /**
   * Applicable days for the billing profile rate.
   * Nullable field.
   */
  days?: BillingProfileRateModelDay[] | null;
}

// Interface for updating an existing rate for a billing profile
export interface BillingProfileRateModelUpdate {
  /**
   * Unique identifier for the rate model.
   */
  id: number;

  /**
   * Starting fee for the billing profile.
   */
  startFee: number;

  /**
   * Minimum fee for the billing profile.
   */
  minimumFee: number;

  /**
   * Rate for billing calculations.
   */
  rate: number;

  /**
   * Frequency of charges, measured in seconds.
   */
  chargeEvery: number;

  /**
   * Time after which charges start, measured in seconds.
   */
  chargeAfter: number;

  /**
   * Whether the rate is based on steps.
   */
  isStepBased: boolean;

  /**
   * Rate steps for the billing profile.
   * Nullable field.
   */
  rateSteps?: BillingProfileRateModelStep[] | null;

  /**
   * Applicable days for the billing profile rate.
   * Nullable field.
   */
  days?: BillingProfileRateModelDay[] | null;
}
