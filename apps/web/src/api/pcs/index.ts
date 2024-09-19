import { GetPcsParams } from "./get-pcs";

export * from "./get-pcs";
export * from "./types";

export default {
  async getPcs(params: GetPcsParams) {
    return await import("./get-pcs").then((mod) => mod.default(params));
  },
};