export class CreateBranchDto {
  name: string;
  address: string;
  phoneNumber?: string;
}

export class UpdateBranchDto {
  name?: string;
  address?: string;
  phoneNumber?: string;
}
