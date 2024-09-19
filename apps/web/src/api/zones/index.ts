import { GetZonesParams } from "./get-zones";

export * from "./get-zones";
export * from "./types";

export default {
  async getZones(params: GetZonesParams) {
    return await import("./get-zones").then((mod) => mod.default(params));
  }
}