export class CreateZoneDto {
  name: string;
  description?: string;
  hourlyRate: number;
  branchId: string;
}

export class UpdateZoneDto {
  name?: string;
  description?: string;
  hourlyRate?: number;
  branchId?: string;
}
