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
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import { VerifyGizmoUserDto } from './dto/verify-user.dto';
import { LinkAccountDto } from './dto/link-account.dto';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Создать нового пользователя' })
  @ApiResponse({ status: 201, description: 'Пользователь успешно создан' })
  @ApiResponse({ status: 400, description: 'Неверный запрос' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить список пользователе��' })
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
    description: 'Список пользователей успешно получен',
  })
  findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    return this.usersService.findAll(+page, +limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить пользователя по ID' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID пользователя' })
  @ApiResponse({ status: 200, description: 'Пользователь успешно найден' })
  @ApiResponse({ status: 404, description: 'Пользователь не найден' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Обновить данные пользователя' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID пользователя' })
  @ApiResponse({
    status: 200,
    description: 'Данные пользователя успешно обновлены',
  })
  @ApiResponse({ status: 400, description: 'Неверный запрос' })
  @ApiResponse({ status: 404, description: 'Пользователь не найден' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить пользователя' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID пользователя' })
  @ApiResponse({ status: 200, description: 'Пользователь успешно удален' })
  @ApiResponse({ status: 404, description: 'Пользователь не найден' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Get('gizmo/search')
  @ApiOperation({
    summary: 'Поиск пользователя GizmoUser по телефону или логину',
  })
  @ApiQuery({
    name: 'query',
    required: true,
    type: String,
    description: 'Телефон или логин пользователя',
  })
  @ApiResponse({
    status: 200,
    description: 'Пользователь(и) успешно найден(ы)',
  })
  @ApiResponse({ status: 404, description: 'Пользователь не найден' })
  searchGizmoUser(
    @Query('query') query: string,
    @Query('branchId') branchId: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    return this.usersService.searchGizmoUser(query, branchId, +page, +limit);
  }

  @Get('gizmo/:id')
  @ApiOperation({ summary: 'Получить пользователя GizmoUser по ID' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID пользователя GizmoUser',
  })
  @ApiResponse({
    status: 200,
    description: 'Пользователь GizmoUser успешно найден',
  })
  @ApiResponse({ status: 404, description: 'Пользователь GizmoUser не найден' })
  findGizmoUserById(@Param('id') id: string) {
    return this.usersService.findGizmoUserById(+id);
  }

  @Post('gizmo/verify')
  @ApiOperation({ summary: 'Валидация пользователя Gizmo' })
  @ApiResponse({
    status: 200,
    description: 'Пользователь GizmoUser успешно валидирован',
  })
  @ApiResponse({ status: 400, description: 'Неверный запрос' })
  @ApiResponse({ status: 404, description: 'Пользователь не найден' })
  validateGizmoUser(@Body() verifyGizmoUserDto: VerifyGizmoUserDto) {
    return this.usersService.validateGizmoUser(verifyGizmoUserDto);
  }

  @Post('link-account')
  @ApiOperation({ summary: 'Link Gizmo account to Telegram user' })
  @ApiResponse({ status: 200, description: 'Account successfully linked' })
  @ApiResponse({ status: 400, description: 'Invalid Gizmo credentials' })
  @ApiResponse({ status: 404, description: 'Gizmo user not found' })
  linkAccount(@Body() linkAccountDto: LinkAccountDto) {
    return this.usersService.linkAccount(linkAccountDto);
  }
}
