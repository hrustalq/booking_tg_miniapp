import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsOptional,
  MaxLength,
  MinLength,
  ValidateNested,
  IsArray,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';

/**
 * Представляет тариф для группы пользователей
 */
class UserGroupRateDto {
  @ApiProperty({ description: 'Идентификатор тарифа группы пользователей' })
  @IsNumber()
  id: number;

  @ApiProperty({ description: 'Начальная плата' })
  @IsNumber()
  startFee: number;

  @ApiProperty({ description: 'Минимальная плата' })
  @IsNumber()
  minimumFee: number;

  @ApiProperty({ description: 'Тариф' })
  @IsNumber()
  rate: number;

  @ApiProperty({ description: 'Периодичность списания (в минутах)' })
  @IsNumber()
  chargeEvery: number;

  @ApiProperty({ description: 'Начало списания (в минутах)' })
  @IsNumber()
  chargeAfter: number;

  @ApiProperty({ description: 'Использование ступенчатого тарифа' })
  @IsBoolean()
  isStepBased: boolean;

  // Здесь можно добавить дополнительные поля, такие как rateSteps и days, если они необходимы
}

/**
 * Представляет группу пользователей
 */
export class UserGroupDto {
  @ApiProperty({ description: 'Идентификатор группы пользователей' })
  @IsNumber()
  id: number;

  @ApiProperty({ description: 'Название группы пользователей' })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  @MinLength(0)
  name?: string;

  @ApiProperty({ description: 'Тариф по умолчанию' })
  @ValidateNested()
  @Type(() => UserGroupRateDto)
  defaultRate: UserGroupRateDto;

  @ApiProperty({ description: 'Список тарифов', type: [UserGroupRateDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UserGroupRateDto)
  @IsOptional()
  rates?: UserGroupRateDto[];
}

/**
 * Представляет постраничный список групп пользователей
 */
export class UserGroupPagedListDto {
  @ApiProperty({
    description: 'Список групп пользователей',
    type: [UserGroupDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UserGroupDto)
  @IsOptional()
  data?: UserGroupDto[];

  @ApiProperty({ description: 'Курсор для следующей страницы' })
  @IsString()
  @IsOptional()
  nextCursor?: string;

  @ApiProperty({ description: 'Курсор для предыдущей страницы' })
  @IsString()
  @IsOptional()
  prevCursor?: string;
}

/**
 * DTO для создания новой группы пользователей
 */
export class CreateUserGroupDto {
  @ApiProperty({ description: 'Название группы пользователей' })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  @MinLength(0)
  name?: string;

  @ApiProperty({ description: 'Тариф по умолчанию' })
  @ValidateNested()
  @Type(() => UserGroupRateDto)
  defaultRate: UserGroupRateDto;
}

/**
 * DTO для обновления существующей группы пользователей
 */
export class UpdateUserGroupDto {
  @ApiProperty({ description: 'Идентификатор группы пользователей' })
  @IsNumber()
  id: number;

  @ApiProperty({ description: 'Название группы пользователей' })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  @MinLength(0)
  name?: string;

  @ApiProperty({ description: 'Тариф по умолчанию' })
  @ValidateNested()
  @Type(() => UserGroupRateDto)
  defaultRate: UserGroupRateDto;
}
