import { PaginationParams } from "@/api/types";

export interface GetGizmoUserSeachParams extends Partial<PaginationParams> {
  query: string;
  branchId: string;
}