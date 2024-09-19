import { PaginationParams } from "@/api/types";

export interface GetZonesParams extends Partial<PaginationParams> {
  branchId: string;
}