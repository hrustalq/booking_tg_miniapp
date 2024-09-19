import { AxiosResponse } from 'axios';
import { GizmoApiWrappedResponse } from './gizmo.types';

export interface GizmoUser {
  username: string;
  email: string | null;
  userGroupId: number;
  isNegativeBalanceAllowed: boolean | null;
  isPersonalInfoRequested: boolean;
  billingOptions: unknown | null;
  enableDate: Date | null;
  disabledDate: Date | null;
  firstName: string | null;
  lastName: string | null;
  birthDate: Date | null;
  address: string | null;
  city: string | null;
  country: string | null;
  postCode: string | null;
  phone: string | null;
  mobilePhone: string | null;
  sex: number;
  isDeleted: boolean;
  isDisabled: boolean;
  guid: string;
  smartCardUID: string | null;
  identification: string | null;
  modifiedById: string | null;
  modifiedTime: Date | null;
  createdById: string | null;
  createdTime: Date;
  id: number;
}

export interface GizmoUserWithBalance {
  userId: number;
  deposits: number;
  points: number;
  onInvoices: number;
  onInvoicedUsage: number;
  onUninvoicedUsage: number;
  timeProduct: number;
  timeFixed: number;
  availableTime: number;
  availableCreditedTime: number;
  balance: number;
  timeProductBalance: number;
  usageBalance: number;
  totalOutstanding: number;
}

export interface GizmoUserValidation {
  result: GizmoUserValidationResult;
  requiredInfo: number;
  identity: {
    userId: number;
    name: string;
    role: number;
  };
}

export enum GizmoUserValidationResult {
  INVALID_PASSWORD = 8,
  OK = 0,
}

export type GizmoUsersResponse = AxiosResponse<
  GizmoApiWrappedResponse<GizmoUser[]>
>;

export type GizmoUsersWithBalanceResponse = AxiosResponse<
  GizmoApiWrappedResponse<GizmoUserWithBalance>
>;

export type GizmoUserValidationResponse = AxiosResponse<
  GizmoApiWrappedResponse<GizmoUserValidation>
>;
