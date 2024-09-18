import { Branch } from '@prisma/client';
import { IsString, IsOptional, Length, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBranchDto implements Partial<Branch> {
  @ApiProperty({ description: 'ID Филиала', example: '1' })
  id: string;

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
}
