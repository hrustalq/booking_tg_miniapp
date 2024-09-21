export interface Zone {
  id: string;
  name: string;
  description: string | null;
  hourlyRate: number;
  branchId: string;
  pcAmount: number | null;
  pcSpecs: string | null;
}