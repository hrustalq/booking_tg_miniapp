import { PC, PCStatus } from '@prisma/client';

export class CreatePcDto implements Partial<PC> {
  name: string;
  status?: PCStatus;
  location?: string;
  branchId: string;
  zoneId: string;
}

export class UpdatePcDto implements Partial<PC> {
  name?: string;
  status?: PCStatus;
  location?: string;
  branchId?: string;
  zoneId?: string;
}
