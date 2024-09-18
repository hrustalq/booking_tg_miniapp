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
import { NotificationsService } from './notifications.service';
import {
  CreateNotificationDto,
  UpdateNotificationDto,
} from './notifications.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Уведомления')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  @ApiOperation({ summary: 'Создать новое уведомление' })
  @ApiResponse({ status: 201, description: 'Уведомление успешно создано' })
  @ApiResponse({ status: 400, description: 'Неверный запрос' })
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.create(createNotificationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить список уведомлений' })
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
    description: 'Список уведомлений успешно получен',
  })
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.notificationsService.findAll(page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить уведомление по ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID уведомления' })
  @ApiResponse({ status: 200, description: 'Уведомление успешно найдено' })
  @ApiResponse({ status: 404, description: 'Уведомление не найдено' })
  findOne(@Param('id') id: string) {
    return this.notificationsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Обновить данные уведомления' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID уведомления' })
  @ApiResponse({
    status: 200,
    description: 'Данные уведомления успешно обновлены',
  })
  @ApiResponse({ status: 400, description: 'Неверный запрос' })
  @ApiResponse({ status: 404, description: 'Уведомление не найдено' })
  update(
    @Param('id') id: string,
    @Body() updateNotificationDto: UpdateNotificationDto,
  ) {
    return this.notificationsService.update(id, updateNotificationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить уведомление' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID уведомления' })
  @ApiResponse({ status: 200, description: 'Уведомление успешно удалено' })
  @ApiResponse({ status: 404, description: 'Уведомление не найдено' })
  remove(@Param('id') id: string) {
    return this.notificationsService.remove(id);
  }
}
