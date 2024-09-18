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
import { NewsService } from './news.service';
import { CreateNewsDto, UpdateNewsDto } from './news.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Новости')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  @ApiOperation({ summary: 'Создать новую новость' })
  @ApiResponse({ status: 201, description: 'Новость успешно создана' })
  @ApiResponse({ status: 400, description: 'Неверный запрос' })
  create(@Body() createNewsDto: CreateNewsDto) {
    return this.newsService.create(createNewsDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить список новостей' })
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
    description: 'Список новостей успешно получен',
  })
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.newsService.findAll(page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить новость по ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID новости' })
  @ApiResponse({ status: 200, description: 'Новость успешно найдена' })
  @ApiResponse({ status: 404, description: 'Новость не найдена' })
  findOne(@Param('id') id: string) {
    return this.newsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Обновить данные новости' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID новости' })
  @ApiResponse({
    status: 200,
    description: 'Данные новости успешно обновлены',
  })
  @ApiResponse({ status: 400, description: 'Неверный запрос' })
  @ApiResponse({ status: 404, description: 'Новость не найдена' })
  update(@Param('id') id: string, @Body() updateNewsDto: UpdateNewsDto) {
    return this.newsService.update(id, updateNewsDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить новость' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID новости' })
  @ApiResponse({ status: 200, description: 'Новость успешно удалена' })
  @ApiResponse({ status: 404, description: 'Новость не найдена' })
  remove(@Param('id') id: string) {
    return this.newsService.remove(id);
  }
}
