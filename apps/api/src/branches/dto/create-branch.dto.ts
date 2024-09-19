import { Branch } from '@prisma/client';
import {
  IsString,
  IsOptional,
  Length,
  Matches,
  IsBoolean,
  IsArray,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBranchDto implements Partial<Branch> {
  @ApiProperty({ description: 'Название филиала', example: 'Центральный офис' })
  @IsString({ message: 'Название должно быть строкой' })
  @Length(2, 100, { message: 'Название должно быть от 2 до 100 символов' })
  name: string;

  @ApiProperty({ description: 'Адрес филиала', example: 'ул. Пушкина, д. 10' })
  @IsString({ message: 'Адрес должен быть строкой' })
  @Length(5, 200, { message: 'Адрес должен быть от 5 до 200 символов' })
  address: string;

  @ApiProperty({
    description: 'Номер телефона филиала',
    example: '+7 (999) 123-45-67',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Номер телефона должен быть строкой' })
  @Matches(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, {
    message: 'Неверный формат номера телефона',
  })
  phoneNumber?: string;

  @ApiProperty({
    description: 'API URL филиала',
    example: 'http://localhost:3000',
  })
  @IsString({ message: 'API URL должен быть строкой' })
  @Length(5, 200, { message: 'API URL должен быть от 5 до 200 символов' })
  apiUrl: string;

  @ApiProperty({
    description: 'Логин для авторизации',
    example: 'Admin',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Логин должен быть строкой' })
  @Length(1, 50, { message: 'Логин должен быть от 1 до 50 символов' })
  authLogin?: string;

  @ApiProperty({
    description: 'Пароль для авторизации',
    example: 'admin',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Пароль должен быть строкой' })
  @Length(1, 50, { message: 'Пароль должен быть от 1 до 50 символов' })
  authPassword?: string;

  @ApiProperty({
    description: 'Часы работы',
    example: ['09:00-18:00', '10:00-19:00'],
    required: false,
    type: [String],
  })
  @IsOptional()
  @IsArray({ message: 'Часы работы должны быть массивом' })
  @IsString({
    each: true,
    message: 'Каждый элемент часов работы должен быть строкой',
  })
  workingHours?: string[];

  @ApiProperty({
    description: 'Наличие Wi-Fi',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'Наличие Wi-Fi должно быть булевым значением' })
  hasWifi?: boolean;

  @ApiProperty({
    description: 'Принимает ли карты',
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'Принятие карт должно быть булевым значением' })
  acceptsCards?: boolean;
}
