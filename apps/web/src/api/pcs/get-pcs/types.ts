import { PaginationParams } from "../../types";

export interface GetPcsParams extends Partial<PaginationParams> {
  zoneId: number;
  branchId: string;
}