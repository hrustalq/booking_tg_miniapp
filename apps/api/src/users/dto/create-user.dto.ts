import { Role } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 1, description: 'ID пользователя' })
  @IsNumber()
  id: number;

  @ApiPropertyOptional({
    example: false,
    description: 'Является ли пользователь ботом',
  })
  @IsOptional()
  @IsBoolean()
  is_bot?: boolean;

  @ApiProperty({ example: 'Иван', description: 'Имя пользователя' })
  @IsString()
  first_name: string;

  @ApiPropertyOptional({
    example: 'Иванов',
    description: 'Фамилия пользователя',
  })
  @IsOptional()
  @IsString()
  last_name?: string;

  @ApiPropertyOptional({
    example: 'ivan_ivanov',
    description: 'Имя пользователя в Telegram',
  })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiPropertyOptional({ example: 'ru', description: 'Код языка пользователя' })
  @IsOptional()
  @IsString()
  language_code?: string;

  @ApiPropertyOptional({
    example: true,
    description: 'Имеет ли пользователь премиум-статус',
  })
  @IsOptional()
  @IsBoolean()
  is_premium?: boolean;

  @ApiPropertyOptional({
    example: 'https://example.com/photo.jpg',
    description: 'URL фотографии пользователя',
  })
  @IsOptional()
  @IsUrl()
  photo_url?: string;

  @ApiPropertyOptional({
    example: true,
    description: 'Добавлен ли пользователь в меню вложений',
  })
  @IsOptional()
  @IsBoolean()
  added_to_attachment_menu?: boolean;

  @ApiPropertyOptional({
    example: true,
    description: 'Разрешает ли пользователь писать в личные сообщения',
  })
  @IsOptional()
  @IsBoolean()
  allows_write_to_pm?: boolean;

  @ApiPropertyOptional({
    enum: Role,
    example: Role.GUEST,
    description: 'Роль пользователя',
  })
  @IsOptional()
  @IsEnum(Role)
  role?: Role;

  @ApiPropertyOptional({ example: 'gizmo123', description: 'ID профиля Gizmo' })
  @IsOptional()
  @IsString()
  gizmoProfileId?: string;
}
