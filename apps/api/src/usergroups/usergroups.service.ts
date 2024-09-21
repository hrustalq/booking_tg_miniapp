import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { BranchesService } from '../branches/branches.service';
import {
  UserGroupPagedListDto,
  CreateUserGroupDto,
  UpdateUserGroupDto,
  UserGroupDto,
} from './dto/usergroup.dto';

@Injectable()
export class UserGroupsService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private branchesService: BranchesService,
  ) {}

  async getUserGroups(
    branchId: string,
    query: any,
  ): Promise<UserGroupPagedListDto> {
    const cacheKey = `user_groups_${JSON.stringify(query)}`;
    const cachedData =
      await this.cacheManager.get<UserGroupPagedListDto>(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    const apiClient = this.branchesService.getApiClient(branchId);
    if (!apiClient) {
      throw new NotFoundException('API client not found');
    }

    const response = await apiClient.get('/api/v2.0/usergroups', {
      params: query,
    });
    const userGroups = response.data as UserGroupPagedListDto;

    await this.cacheManager.set(cacheKey, userGroups, 3600000); // 1 hour in milliseconds

    return userGroups;
  }

  async createUserGroup(
    branchId: string,
    createUserGroupDto: CreateUserGroupDto,
  ): Promise<any> {
    const apiClient = this.branchesService.getApiClient(branchId);
    if (!apiClient) {
      throw new NotFoundException('API client not found');
    }

    const response = await apiClient.post(
      '/api/v2.0/usergroups',
      createUserGroupDto,
    );
    return response.data;
  }

  async updateUserGroup(
    branchId: string,
    updateUserGroupDto: UpdateUserGroupDto,
  ): Promise<any> {
    const apiClient = this.branchesService.getApiClient(branchId);
    if (!apiClient) {
      throw new NotFoundException('API client not found');
    }

    const response = await apiClient.put(
      '/api/v2.0/usergroups',
      updateUserGroupDto,
    );
    return response.data;
  }

  async getUserGroupById(branchId: string, id: number): Promise<UserGroupDto> {
    const cacheKey = `user_group_${id}`;
    const cachedData = await this.cacheManager.get<UserGroupDto>(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    const apiClient = this.branchesService.getApiClient(branchId);
    if (!apiClient) {
      throw new NotFoundException('API client not found');
    }

    const response = await apiClient.get(`/api/v2.0/usergroups/${id}`);
    const userGroup = response.data as UserGroupDto;

    await this.cacheManager.set(cacheKey, userGroup, 3600000); // 1 hour in milliseconds

    return userGroup;
  }

  async deleteUserGroup(branchId: string, id: number): Promise<any> {
    const apiClient = this.branchesService.getApiClient(branchId);
    if (!apiClient) {
      throw new NotFoundException('API client not found');
    }

    const response = await apiClient.delete(`/api/v2.0/usergroups/${id}`);
    return response.data;
  }
}
