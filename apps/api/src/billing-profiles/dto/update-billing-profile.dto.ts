import { IsInt, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { BillingProfileRateDto } from './billing-profile-rate.dto';

export class UpdateBillingProfileDto {
  @ApiProperty({ description: 'ID профиля тарификации' })
  @IsInt()
  id: number;

  @ApiProperty({ description: 'Имя профиля тарификации' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Стандартный тариф' })
  @ValidateNested()
  @Type(() => BillingProfileRateDto)
  defaultRate: BillingProfileRateDto;
}
