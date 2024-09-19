export interface Pc {
  id: number;
  name: string;
  status: string;
  location: string | null;
  branchId: string;
  zoneId: number;
}

export enum PcStatus {
  AVAILABLE = "AVAILABLE",
  OCCUPIED = "OCCUPIED",
  MAINTENANCE = "MAINTENANCE",
  OUT_OF_ORDER = "OUT_OF_ORDER",
}