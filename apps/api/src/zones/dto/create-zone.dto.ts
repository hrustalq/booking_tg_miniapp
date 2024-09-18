import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Zone } from '@prisma/client';

export class CreateZoneDto implements Partial<Zone> {
  @ApiPropertyOptional({ example: 1, description: 'ID зоны' })
  id?: number;

  @ApiProperty({ example: 'Zone 1', description: 'Название зоны' })
  name: string;

  @ApiPropertyOptional({
    example: 'Описание зоны',
    description: 'Описание зоны',
  })
  description?: string;

  @ApiProperty({ example: 100, description: 'Ежечасная ставка' })
  hourlyRate: number;

  @ApiProperty({ example: 'branchId', description: 'Id филиала' })
  branchId: string;
}
