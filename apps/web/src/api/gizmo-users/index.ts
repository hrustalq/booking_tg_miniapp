import { GetGizmoUserSeachParams, ValidateGizmoUserParams } from ".";
import { LinkAccountParams } from "./link-account";

export * from "./types";
export * from "./get-gizmo-user-search";
export * from "./get-gizmo-user";
export * from "./validate-gizmo-user";
export * from "./link-account";
export default {
  async getGizmoUser (id: number) {
    return await import("./get-gizmo-user").then((mod) => mod.default(id));
  },
  async getGizmoUserSearch (params: GetGizmoUserSeachParams) {
    return await import("./get-gizmo-user-search").then((mod) => mod.default(params));
  },
  async validateGizmoUser (params: ValidateGizmoUserParams) {
    return await import("./validate-gizmo-user").then((mod) => mod.default(params));
  },
  async linkAccount (params: LinkAccountParams) {
    return await import("./link-account").then((mod) => mod.default(params));
  },
}