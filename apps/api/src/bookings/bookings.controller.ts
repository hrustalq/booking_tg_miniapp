import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Бронирования')
@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  @ApiOperation({ summary: 'Создать новое бронирование' })
  @ApiResponse({ status: 201, description: 'Бронирование успешно создано' })
  @ApiResponse({ status: 400, description: 'Неверный запрос' })
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingsService.create(createBookingDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить список бронирований' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Номер страницы',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Количество элементов на странице',
  })
  @ApiResponse({
    status: 200,
    description: 'Список бронирований успешно получен',
  })
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.bookingsService.findAll(page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить бронирование по ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID бронирования' })
  @ApiResponse({ status: 200, description: 'Бронирование успешно найдено' })
  @ApiResponse({ status: 404, description: 'Бронирование не найдено' })
  findOne(@Param('id') id: string) {
    return this.bookingsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Обновить данные бронирования' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID бронирования' })
  @ApiResponse({
    status: 200,
    description: 'Данные бронирования успешно обновлены',
  })
  @ApiResponse({ status: 400, description: 'Неверный запрос' })
  @ApiResponse({ status: 404, description: 'Бронирование не найдено' })
  update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingsService.update(id, updateBookingDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить бронирование' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID бронирования' })
  @ApiResponse({ status: 200, description: 'Бронирование успешно удалено' })
  @ApiResponse({ status: 404, description: 'Бронирование не найдено' })
  remove(@Param('id') id: string) {
    return this.bookingsService.remove(id);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Получить бронирования пользователя' })
  @ApiParam({ name: 'userId', type: 'number', description: 'ID пользователя' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Номер страницы',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Количество элементов на странице',
  })
  @ApiResponse({
    status: 200,
    description: 'Список бронирований пользователя успешно получен',
  })
  findByUserId(
    @Param('userId') userId: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('gizmoAccountId') gizmoAccountId?: string,
  ) {
    return this.bookingsService.findByUserId(
      +userId,
      +page,
      +limit,
      gizmoAccountId ? +gizmoAccountId : undefined,
    );
  }
}
