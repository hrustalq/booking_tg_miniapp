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
import { PaymentsService } from './payments.service';
import { CreatePaymentDto, UpdatePaymentDto } from './payment.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Платежи')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  @ApiOperation({ summary: 'Создать новый платеж' })
  @ApiResponse({ status: 201, description: 'Платеж успешно создан' })
  @ApiResponse({ status: 400, description: 'Неверный запрос' })
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(createPaymentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить список платежей' })
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
    description: 'Список платежей успешно получен',
  })
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.paymentsService.findAll(page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить платеж по ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID платежа' })
  @ApiResponse({ status: 200, description: 'Платеж успешно найден' })
  @ApiResponse({ status: 404, description: 'Платеж не найден' })
  findOne(@Param('id') id: string) {
    return this.paymentsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Обновить данные платежа' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID платежа' })
  @ApiResponse({
    status: 200,
    description: 'Данные платежа успешно обновлены',
  })
  @ApiResponse({ status: 400, description: 'Неверный запрос' })
  @ApiResponse({ status: 404, description: 'Платеж не найден' })
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentsService.update(id, updatePaymentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить платеж' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID платежа' })
  @ApiResponse({ status: 200, description: 'Платеж успешно удален' })
  @ApiResponse({ status: 404, description: 'Платеж не найден' })
  remove(@Param('id') id: string) {
    return this.paymentsService.remove(id);
  }
}
