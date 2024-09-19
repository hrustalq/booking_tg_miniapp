import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class VerifyGizmoUserDto {
  @ApiProperty({ example: 'user123', description: 'Логин пользователя' })
  @IsString()
  login: string;

  @ApiProperty({ example: 'password123', description: 'Пароль пользователя' })
  @IsString()
  password: string;

  @ApiProperty({ example: '12345', description: 'ID филиала' })
  @IsNumber()
  branchId: string;
}
