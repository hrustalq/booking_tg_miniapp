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
import { PcsService } from './pcs.service';
import { CreatePcDto, UpdatePcDto } from './pcs.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Компьютеры')
@Controller('pcs')
export class PcsController {
  constructor(private readonly pcsService: PcsService) {}

  @Post()
  @ApiOperation({ summary: 'Создать новый компьютер' })
  @ApiResponse({ status: 201, description: 'Компьютер успешно создан' })
  @ApiResponse({ status: 400, description: 'Неверный запрос' })
  create(@Body() createPcDto: CreatePcDto) {
    return this.pcsService.create(createPcDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить список компьютеров' })
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
    description: 'Список компьютеров успешно получен',
  })
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.pcsService.findAll(page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить компьютер по ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID компьютера' })
  @ApiResponse({ status: 200, description: 'Компьютер успешно найден' })
  @ApiResponse({ status: 404, description: 'Компьютер не найден' })
  findOne(@Param('id') id: string) {
    return this.pcsService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Обновить данные компьютера' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID компьютера' })
  @ApiResponse({
    status: 200,
    description: 'Данные компьютера успешно обновлены',
  })
  @ApiResponse({ status: 400, description: 'Неверный запрос' })
  @ApiResponse({ status: 404, description: 'Компьютер не найден' })
  update(@Param('id') id: string, @Body() updatePcDto: UpdatePcDto) {
    return this.pcsService.update(+id, updatePcDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить компьютер' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID компьютера' })
  @ApiResponse({ status: 200, description: 'Компьютер успешно удален' })
  @ApiResponse({ status: 404, description: 'Компьютер не найден' })
  remove(@Param('id') id: string) {
    return this.pcsService.remove(+id);
  }
}
