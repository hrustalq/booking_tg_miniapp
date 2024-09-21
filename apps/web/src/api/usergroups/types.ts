export interface UserGroupRateDto {
  id: number;
  startFee: number;
  minimumFee: number;
  rate: number;
  chargeEvery: number;
  chargeAfter: number;
  isStepBased: boolean;
}

export interface UserGroupDto {
  id: number;
  name?: string;
  defaultRate: UserGroupRateDto;
  rates?: UserGroupRateDto[];
}

export interface UserGroupPagedListDto {
  data?: UserGroupDto[];
  nextCursor?: string;
  prevCursor?: string;
}

export interface GetUserGroupsParams {
  branchId: string;
}