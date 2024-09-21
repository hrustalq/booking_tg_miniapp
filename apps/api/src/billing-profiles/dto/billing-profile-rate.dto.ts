import {
  IsNumber,
  IsBoolean,
  IsOptional,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class BillingProfileRateStepDto {
  @ApiProperty({ description: 'Минута' })
  @IsNumber()
  minute: number;

  @ApiProperty({ description: 'Действие' })
  @IsNumber()
  action: number;

  @ApiProperty({ description: 'Плата' })
  @IsNumber()
  charge: number;

  @ApiProperty({ description: 'Тариф' })
  @IsNumber()
  rate: number;

  @ApiProperty({ description: 'Целевая минута' })
  @IsNumber()
  targetMinute: number;
}

class BillingProfileRateDayTimeDto {
  @ApiProperty({ description: 'Начальная секунда' })
  @IsNumber()
  startSecond: number;

  @ApiProperty({ description: 'Конечная секунда' })
  @IsNumber()
  endSecond: number;
}

class BillingProfileRateDayDto {
  @ApiProperty({ description: 'День недели' })
  @IsNumber()
  day: number;

  @ApiProperty({
    description: 'Применимое время дня',
    type: [BillingProfileRateDayTimeDto],
  })
  @ValidateNested({ each: true })
  @Type(() => BillingProfileRateDayTimeDto)
  dayTimesApplicable: BillingProfileRateDayTimeDto[];
}

export class BillingProfileRateDto {
  @ApiPropertyOptional({ description: 'ID тарифа' })
  @IsOptional()
  @IsNumber()
  id?: number;

  @ApiProperty({ description: 'Начальная плата' })
  @IsNumber()
  startFee: number;

  @ApiProperty({ description: 'Минимальная плата' })
  @IsNumber()
  minimumFee: number;

  @ApiProperty({ description: 'Тариф' })
  @IsNumber()
  rate: number;

  @ApiProperty({ description: 'Периодичность списания' })
  @IsNumber()
  chargeEvery: number;

  @ApiProperty({ description: 'Списание после' })
  @IsNumber()
  chargeAfter: number;

  @ApiProperty({ description: 'Основан на шагах' })
  @IsBoolean()
  isStepBased: boolean;

  @ApiPropertyOptional({
    description: 'Шаги тарифа',
    type: [BillingProfileRateStepDto],
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BillingProfileRateStepDto)
  rateSteps?: BillingProfileRateStepDto[];

  @ApiPropertyOptional({ description: 'Дни', type: [BillingProfileRateDayDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BillingProfileRateDayDto)
  days?: BillingProfileRateDayDto[];
}
