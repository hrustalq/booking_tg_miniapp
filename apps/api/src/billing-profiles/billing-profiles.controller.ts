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
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BillingProfilesService } from './billing-profiles.service';
import { GetBillingProfilesDto } from './dto/get-billing-profiles.dto';
import { CreateBillingProfileDto } from './dto/create-billing-profile.dto';
import { UpdateBillingProfileDto } from './dto/update-billing-profile.dto';
import { BillingProfileRateDto } from './dto/billing-profile-rate.dto';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';

@ApiTags('Профили тарификации')
@Controller('billing-profiles')
@UseInterceptors(CacheInterceptor)
export class BillingProfilesController {
  constructor(
    private readonly billingProfilesService: BillingProfilesService,
  ) {}

  @Get(':branchId')
  @CacheTTL(3600)
  @ApiOperation({ summary: 'Получить все профили тарификации' })
  @ApiResponse({ status: 200, description: 'Успешно' })
  @ApiResponse({ status: 400, description: 'Неверный запрос' })
  @ApiResponse({ status: 500, description: 'Внутренняя ошибка сервера' })
  async getBillingProfiles(
    @Param('branchId') branchId: string,
    @Query() query: GetBillingProfilesDto,
  ) {
    return this.billingProfilesService.getBillingProfiles(branchId, query);
  }

  @Post(':branchId')
  @ApiOperation({ summary: 'Создать профиль тарификации' })
  @ApiResponse({ status: 200, description: 'Успешно' })
  async createBillingProfile(
    @Param('branchId') branchId: string,
    @Body() createBillingProfileDto: CreateBillingProfileDto,
  ) {
    return this.billingProfilesService.createBillingProfile(
      branchId,
      createBillingProfileDto,
    );
  }

  @Put(':branchId')
  @ApiOperation({ summary: 'Обновить профиль тарификации' })
  @ApiResponse({ status: 200, description: 'Успешно' })
  async updateBillingProfile(
    @Param('branchId') branchId: string,
    @Body() updateBillingProfileDto: UpdateBillingProfileDto,
  ) {
    return this.billingProfilesService.updateBillingProfile(
      branchId,
      updateBillingProfileDto,
    );
  }

  @Get(':branchId/:id')
  @CacheTTL(3600)
  @ApiOperation({ summary: 'Получить профиль тарификации по ID' })
  @ApiResponse({ status: 200, description: 'Успешно' })
  @ApiResponse({ status: 404, description: 'Профиль не найден' })
  async getBillingProfileById(
    @Param('branchId') branchId: string,
    @Param('id') id: number,
    @Query('Expand') expand?: string[],
  ) {
    return this.billingProfilesService.getBillingProfileById(
      branchId,
      id,
      expand,
    );
  }

  @Delete(':branchId/:id')
  @ApiOperation({ summary: 'Удалить профиль тарификации' })
  @ApiResponse({ status: 200, description: 'Успешно' })
  @ApiResponse({ status: 404, description: 'Профиль не найден' })
  async deleteBillingProfile(
    @Param('branchId') branchId: string,
    @Param('id') id: number,
  ) {
    return this.billingProfilesService.deleteBillingProfile(branchId, id);
  }

  @Get(':branchId/:id/rates')
  @CacheTTL(3600)
  @ApiOperation({ summary: 'Получить тарифы профиля тарификации' })
  @ApiResponse({ status: 200, description: 'Успешно' })
  async getBillingProfileRates(
    @Param('branchId') branchId: string,
    @Param('id') id: number,
  ) {
    return this.billingProfilesService.getBillingProfileRates(branchId, id);
  }

  @Post(':branchId/:id/rates')
  @ApiOperation({ summary: 'Создать тариф профиля тарификации' })
  @ApiResponse({ status: 200, description: 'Успешно' })
  async createBillingProfileRate(
    @Param('branchId') branchId: string,
    @Param('id') id: number,
    @Body() createBillingProfileRateDto: BillingProfileRateDto,
  ) {
    return this.billingProfilesService.createBillingProfileRate(
      branchId,
      id,
      createBillingProfileRateDto,
    );
  }

  @Put(':branchId/rates')
  @ApiOperation({ summary: 'Обновить тариф профиля тарификации' })
  @ApiResponse({ status: 200, description: 'Успешно' })
  async updateBillingProfileRate(
    @Param('branchId') branchId: string,
    @Body() updateBillingProfileRateDto: BillingProfileRateDto,
  ) {
    return this.billingProfilesService.updateBillingProfileRate(
      branchId,
      updateBillingProfileRateDto,
    );
  }

  @Delete(':branchId/:id/rates/:rateId')
  @ApiOperation({ summary: 'Удалить тариф профиля тарификации' })
  @ApiResponse({ status: 200, description: 'Успешно' })
  async deleteBillingProfileRate(
    @Param('branchId') branchId: string,
    @Param('id') id: number,
    @Param('rateId') rateId: number,
  ) {
    return this.billingProfilesService.deleteBillingProfileRate(
      branchId,
      id,
      rateId,
    );
  }

  // Add other endpoints for rates management
}
