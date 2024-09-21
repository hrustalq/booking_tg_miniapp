import {
  IsOptional,
  IsInt,
  IsString,
  IsBoolean,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetBillingProfilesDto {
  @ApiPropertyOptional({ description: 'Лимит количества записей' })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  'Pagination.Limit'?: number;

  @ApiPropertyOptional({ description: 'Поле для сортировки' })
  @IsOptional()
  @IsString()
  'Pagination.SortBy'?: string;

  @ApiPropertyOptional({ description: 'Сортировка по возрастанию' })
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  'Pagination.IsAsc'?: boolean;

  @ApiPropertyOptional({ description: 'Использовать прокрутку' })
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  'Pagination.IsScroll'?: boolean;

  @ApiPropertyOptional({ description: 'Курсор для пагинации' })
  @IsOptional()
  @IsString()
  'Pagination.Cursor'?: string;

  @ApiPropertyOptional({ description: 'Имя профиля тарификации' })
  @IsOptional()
  @IsString()
  BillingProfileName?: string;

  @ApiPropertyOptional({ description: 'Расширенные данные', type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  Expand?: string[];
}
