import { GetUserGroupsParams } from "./types";

export * from "./types";
export * from "./get-usergroups";

export default {
  async getUserGroups(params: GetUserGroupsParams) {
    return await import("./get-usergroups").then(m => m.default(params));
  },
}