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
import { ZonesService } from './zones.service';
import { CreateZoneDto } from './dto/create-zone.dto';
import { UpdateZoneDto } from './dto/update-zone.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Зоны')
@Controller('zones')
export class ZoneController {
  constructor(private readonly zonesService: ZonesService) {}

  @Post()
  @ApiOperation({ summary: 'Создать новую зону' })
  @ApiResponse({ status: 201, description: 'Зона успешно создана' })
  @ApiResponse({ status: 400, description: 'Неверный запрос' })
  create(@Body() createZoneDto: CreateZoneDto) {
    return this.zonesService.create(createZoneDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить список зон' })
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
  @ApiQuery({
    name: 'branchId',
    required: true,
    type: String,
    description: 'ID филиала',
  })
  @ApiResponse({
    status: 200,
    description: 'Список зон успешно получен',
  })
  findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('branchId') branchId: string = '1',
  ) {
    return this.zonesService.findAll(+page, +limit, branchId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить зону по ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID зоны' })
  @ApiResponse({ status: 200, description: 'Зона успешно найдена' })
  @ApiResponse({ status: 404, description: 'Зона не найдена' })
  findOne(@Param('id') id: string) {
    return this.zonesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Обновить данные зоны' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID зоны' })
  @ApiResponse({
    status: 200,
    description: 'Данные зоны успешно обновлены',
  })
  @ApiResponse({ status: 400, description: 'Неверный запрос' })
  @ApiResponse({ status: 404, description: 'Зона не айдена' })
  update(@Param('id') id: string, @Body() updateZoneDto: UpdateZoneDto) {
    return this.zonesService.update(id, updateZoneDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить зону' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID зоны' })
  @ApiResponse({ status: 200, description: 'Зона успешно удалена' })
  @ApiResponse({ status: 404, description: 'Зона не найдена' })
  remove(@Param('id') id: string) {
    return this.zonesService.remove(id);
  }

  @Get('fill-zones')
  @ApiOperation({
    summary:
      'Вручную выполнить заполнение базы данных по списку зон из филиалов',
  })
  @ApiResponse({
    status: 200,
    description: 'Заполнение базы данных успешно выполнено',
  })
  @ApiResponse({ status: 500, description: 'Внутренняя ошибка сервера' })
  async manualFillDatabase() {
    try {
      await this.zonesService.fillDatabaseFromBranches();
      return { message: 'Заполнение базы данных успешно выполнено' };
    } catch (error) {
      throw new Error('Не удалось выполнить заполнение базы данных');
    }
  }
}
