import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { UserGroupsService } from './usergroups.service';
import {
  UserGroupPagedListDto,
  CreateUserGroupDto,
  UpdateUserGroupDto,
  UserGroupDto,
} from './dto/usergroup.dto';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';

@ApiTags('Группы пользователей')
@Controller('usergroups')
@UseInterceptors(CacheInterceptor)
export class UserGroupsController {
  constructor(private readonly userGroupsService: UserGroupsService) {}

  @Get(':branchId')
  @CacheTTL(3600)
  @ApiOperation({ summary: 'Получить все группы пользователей' })
  @ApiResponse({
    status: 200,
    description: 'Успешно',
    type: UserGroupPagedListDto,
  })
  async getUserGroups(
    @Param('branchId') branchId: string,
    @Query() query: any,
  ): Promise<UserGroupPagedListDto> {
    return this.userGroupsService.getUserGroups(branchId, query);
  }

  @Post(':branchId')
  @ApiOperation({ summary: 'Создать группу пользователей' })
  @ApiResponse({ status: 200, description: 'Успешно' })
  async createUserGroup(
    @Param('branchId') branchId: string,
    @Body() createUserGroupDto: CreateUserGroupDto,
  ): Promise<any> {
    return this.userGroupsService.createUserGroup(branchId, createUserGroupDto);
  }

  @Put(':branchId')
  @ApiOperation({ summary: 'Обновить группу пользователей' })
  @ApiResponse({ status: 200, description: 'Успешно' })
  async updateUserGroup(
    @Param('branchId') branchId: string,
    @Body() updateUserGroupDto: UpdateUserGroupDto,
  ): Promise<any> {
    return this.userGroupsService.updateUserGroup(branchId, updateUserGroupDto);
  }

  @Get(':branchId/:id')
  @CacheTTL(3600)
  @ApiOperation({ summary: 'Получить группу пользователей по ID' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID группы пользователей',
  })
  @ApiResponse({ status: 200, description: 'Успешно', type: UserGroupDto })
  async getUserGroupById(
    @Param('branchId') branchId: string,
    @Param('id') id: number,
  ): Promise<UserGroupDto> {
    return this.userGroupsService.getUserGroupById(branchId, id);
  }

  @Delete(':branchId/:id')
  @CacheTTL(3600)
  @ApiOperation({ summary: 'Удалить группу пользователей' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID группы пользователей',
  })
  @ApiResponse({ status: 200, description: 'Успешно' })
  async deleteUserGroup(
    @Param('branchId') branchId: string,
    @Param('id') id: number,
  ): Promise<any> {
    return this.userGroupsService.deleteUserGroup(branchId, id);
  }
}
