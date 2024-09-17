import { PCStatus } from '@prisma/client';

export class CreatePcDto {
  name: string;
  status?: PCStatus;
  location?: string;
  branchId: string;
  zoneId: string;
}

export class UpdatePcDto {
  name?: string;
  status?: PCStatus;
  location?: string;
  branchId?: string;
  zoneId?: string;
}
