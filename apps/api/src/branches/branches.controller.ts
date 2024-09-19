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
import { BranchesService } from './branches.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Филиалы')
@Controller('branches')
export class BranchesController {
  constructor(private readonly branchService: BranchesService) {}

  @Post()
  @ApiOperation({ summary: 'Создать новый филиал' })
  @ApiResponse({ status: 201, description: 'Филиал успешно создан' })
  @ApiResponse({ status: 400, description: 'Неверный запрос' })
  create(@Body() createBranchDto: CreateBranchDto) {
    return this.branchService.create(createBranchDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить список филиалов' })
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
    description: 'Список филиалов успешно получен',
  })
  findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    return this.branchService.findAll(+page, +limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить филиал по ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID филиала' })
  @ApiResponse({ status: 200, description: 'Филиал успешно найден' })
  @ApiResponse({ status: 404, description: 'Филиал не найден' })
  findOne(@Param('id') id: string) {
    return this.branchService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Обновить данные филиала' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID филиала' })
  @ApiResponse({
    status: 200,
    description: 'Данные филиала успешно обновлены',
  })
  @ApiResponse({ status: 400, description: 'Неверный запрос' })
  @ApiResponse({ status: 404, description: 'Филиал не найден' })
  update(@Param('id') id: string, @Body() updateBranchDto: UpdateBranchDto) {
    return this.branchService.update(id, updateBranchDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить филиал' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID филиала' })
  @ApiResponse({ status: 200, description: 'Филиал успешно удален' })
  @ApiResponse({ status: 404, description: 'Филиал не найден' })
  remove(@Param('id') id: string) {
    return this.branchService.remove(id);
  }
}
