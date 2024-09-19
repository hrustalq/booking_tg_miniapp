import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Zone } from '@prisma/client';

export class CreateZoneDto implements Partial<Zone> {
  @ApiProperty({ example: 'Zone 1', description: 'Название зоны' })
  name: string;

  @ApiPropertyOptional({
    example: 'Описание зоны',
    description: 'Описание зоны',
  })
  description?: string;

  @ApiProperty({ example: 100, description: 'Количество ПК' })
  pcAmount: number;

  @ApiPropertyOptional({
    example: 1,
    description: 'Внутренний ID зоны (в рамках филиала)',
  })
  internalId?: number;

  @ApiPropertyOptional({
    example: 'i7 12700K, 16GB, 1TB SSD, GTX 1660 Ti',
    description: 'Спецификация ПК',
  })
  pcSpecs?: string;

  @ApiProperty({ example: 100, description: 'Ежечасная ставка' })
  hourlyRate: number;

  @ApiProperty({ example: 'branchId', description: 'Id филиала' })
  branchId: string;
}
