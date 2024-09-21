export interface BillingProfileRateModel {
  id: number;
  startFee: number;
  minimumFee: number;
  rate: number;
  chargeEvery: number;
  chargeAfter: number;
  isStepBased: boolean;
  rateSteps?: BillingProfileRateModelStep[] | null;
  days?: BillingProfileRateModelDay[] | null;
}

export interface BillingProfileModel {
  id: number;
  name?: string | null;
  defaultRate: BillingProfileRateModel;
  rates?: BillingProfileRateModel[] | null;
}

export interface BillingProfileModelPagedList {
  data?: BillingProfileModel[] | null;
  nextCursor?: string | null;
  prevCursor?: string | null;
}

export interface GetBillingProfilesParams {
  branchId: string;
  userGroupId: number; // Add this line
  limit?: number;
  sortBy?: string;
  isAsc?: boolean;
  isScroll?: boolean;
  cursor?: string;
  billingProfileName?: string;
  expand?: string[];
}

// Enum for step action in billing rate model
export enum BillingRateStepAction {
  Action0 = 0,
  Action1 = 1,
}

// Day of the week enumeration
export enum DayOfWeek {
  Sunday = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
}

/**
 * Represents a billing profile rate step.
 */
export interface BillingProfileRateModelStep {
  /** The minute at which this step applies */
  minute: number;
  /** The action to take at this step */
  action: BillingRateStepAction;
  /** The charge amount for this step */
  charge: number;
  /** The rate for this step */
  rate: number;
  /** The target minute for this step */
  targetMinute: number;
}

/**
 * Represents a time range for a billing profile rate.
 */
export interface BillingProfileRateModelDayTime {
  /** The start second of the time range */
  startSecond: number;
  /** The end second of the time range */
  endSecond: number;
}

/**
 * Represents a day configuration for a billing profile rate.
 */
export interface BillingProfileRateModelDay {
  /** The day of the week */
  day: DayOfWeek;
  /** The applicable time ranges for this day */
  dayTimesApplicable?: BillingProfileRateModelDayTime[] | null;
}

export interface BillingProfileRateModel {
  id: number;
  startFee: number;
  minimumFee: number;
  rate: number;
  chargeEvery: number;
  chargeAfter: number;
  isStepBased: boolean;
  rateSteps?: BillingProfileRateModelStep[] | null;
  days?: BillingProfileRateModelDay[] | null;
}

export interface BillingProfileModel {
  id: number;
  name?: string | null;
  defaultRate: BillingProfileRateModel;
  rates?: BillingProfileRateModel[] | null;
}

export interface BillingProfileModelPagedList {
  data?: BillingProfileModel[] | null;
  nextCursor?: string | null;
  prevCursor?: string | null;
}

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

export interface BillingProfileModelCreate {
  name?: string | null;
  defaultRate: BillingProfileRateModel;
}

export interface BillingProfileModelUpdate {
  id: number;
  name?: string | null;
  defaultRate: BillingProfileRateModel;
}

export interface BillingProfileRateModelCreate {
  startFee: number;
  minimumFee: number;
  rate: number;
  chargeEvery: number;
  chargeAfter: number;
  isStepBased: boolean;
  rateSteps?: BillingProfileRateModelStep[] | null;
  days?: BillingProfileRateModelDay[] | null;
}

export interface BillingProfileRateModelUpdate {
  id: number;
  startFee: number;
  minimumFee: number;
  rate: number;
  chargeEvery: number;
  chargeAfter: number;
  isStepBased: boolean;
  rateSteps?: BillingProfileRateModelStep[] | null;
  days?: BillingProfileRateModelDay[] | null;
}

// Add other necessary types (BillingProfileRateModelStep, BillingProfileRateModelDay, etc.)

export interface CreateResult {
  id: number;
}

export interface UpdateResult {
  success: boolean;
}

export interface DeleteResult {
  success: boolean;
}

export interface BillingProfileRateDto {
  id?: number;
  startFee: number;
  minimumFee: number;
  rate: number;
  chargeEvery: number;
  chargeAfter: number;
  isStepBased: boolean;
  rateSteps?: BillingProfileRateModelStep[] | null;
  days?: BillingProfileRateModelDay[] | null;
}