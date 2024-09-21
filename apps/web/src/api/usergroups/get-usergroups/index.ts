import { apiClient } from "@/api";
import { UserGroupPagedListDto, GetUserGroupsParams } from "../types";

export default async function getUserGroups(params: GetUserGroupsParams) {
  const { branchId, ...queryParams } = params;
  const REQUEST_URL = `/usergroups/${branchId}`;

  const { data } = await apiClient.get<UserGroupPagedListDto>(REQUEST_URL, { params: queryParams });

  return data;
}