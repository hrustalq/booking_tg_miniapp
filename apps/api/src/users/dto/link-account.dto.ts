import {
  IsNumber,
  IsString,
  ValidateNested,
  IsObject,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { TelegramUser } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class Credentials {
  @ApiProperty({ description: 'Имя пользователя для аутентификации' })
  @IsString()
  username: string;

  @ApiProperty({ description: 'Пароль для аутентификации' })
  @IsString()
  password: string;
}

// Create a class that represents the TelegramUser structure
export class TelegramUserDto
  implements
    Partial<Omit<TelegramUser, 'role' | 'gizmoProfile'>>,
    Pick<TelegramUser, 'id'>
{
  @ApiProperty({ description: 'ID пользователя Telegram' })
  @IsNumber()
  id: number;

  @ApiPropertyOptional({ description: 'Является ли пользователь ботом' })
  @IsBoolean()
  @IsOptional()
  is_bot?: boolean;

  @ApiProperty({ description: 'Имя пользователя' })
  @IsString()
  @IsOptional()
  first_name: string;

  @ApiPropertyOptional({ description: 'Фамилия пользователя' })
  @IsString()
  @IsOptional()
  last_name?: string;

  @ApiPropertyOptional({ description: 'Код языка пользователя' })
  @IsString()
  @IsOptional()
  language_code?: string;

  @ApiPropertyOptional({
    description: 'Имеет ли пользователь Telegram Premium',
  })
  @IsBoolean()
  @IsOptional()
  is_premium?: boolean;

  @ApiPropertyOptional({ description: 'URL фотографии профиля пользователя' })
  @IsString()
  @IsOptional()
  photo_url?: string;

  @ApiPropertyOptional({
    description: 'Добавлен ли пользователь в меню вложений',
  })
  @IsBoolean()
  @IsOptional()
  added_to_attachment_menu?: boolean;

  @ApiPropertyOptional({
    description: 'Разрешает ли пользователь писать в личные сообщения',
  })
  @IsBoolean()
  @IsOptional()
  allows_write_to_pm?: boolean;

  @ApiPropertyOptional({ description: 'Имя пользователя в Telegram' })
  @IsString()
  @IsOptional()
  username?: string;
}

export class LinkAccountDto {
  @ApiProperty({ description: 'Внутренний ID аккаунта Gizmo' })
  @IsNumber()
  gizmoAccountInternalId: number;

  @ApiProperty({ description: 'ID филиала' })
  @IsString()
  branchId: string;

  @ApiProperty({ description: 'Учетные данные пользователя' })
  @ValidateNested()
  @Type(() => Credentials)
  credentials: Credentials;

  @ApiProperty({ description: 'Данные пользователя Telegram' })
  @IsObject()
  @ValidateNested()
  @Type(() => TelegramUserDto)
  data: TelegramUserDto;
}
