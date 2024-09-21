import { PaginationParams } from "../../types";

export interface GetPcsParams extends Partial<PaginationParams> {
  zoneId: string;
  branchId: string;
}