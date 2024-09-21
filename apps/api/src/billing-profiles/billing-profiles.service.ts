import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { BranchesService } from '../branches/branches.service';
import { GetBillingProfilesDto } from './dto/get-billing-profiles.dto';
import { CreateBillingProfileDto } from './dto/create-billing-profile.dto';
import { UpdateBillingProfileDto } from './dto/update-billing-profile.dto';
import { BillingProfileRateDto } from './dto/billing-profile-rate.dto';

@Injectable()
export class BillingProfilesService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private branchesService: BranchesService,
  ) {}

  async getBillingProfiles(branchId: string, query: GetBillingProfilesDto) {
    const cacheKey = `billing_profiles_${branchId}_${JSON.stringify(query)}`;
    const cachedData = await this.cacheManager.get(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    const apiClient = this.branchesService.getApiClient(branchId);
    if (!apiClient) {
      throw new NotFoundException('API client not found');
    }

    const response = await apiClient.get('/api/v2.0/billingprofiles', {
      params: query,
    });
    const billingProfiles = response.data;

    await this.cacheManager.set(cacheKey, billingProfiles, 3600000); // 1 hour in milliseconds

    return billingProfiles;
  }

  async createBillingProfile(
    branchId: string,
    createBillingProfileDto: CreateBillingProfileDto,
  ) {
    const apiClient = this.branchesService.getApiClient(branchId);
    if (!apiClient) {
      throw new NotFoundException('API client not found');
    }

    const response = await apiClient.post(
      '/api/v2.0/billingprofiles',
      createBillingProfileDto,
    );
    return response.data;
  }

  async updateBillingProfile(
    branchId: string,
    updateBillingProfileDto: UpdateBillingProfileDto,
  ) {
    const apiClient = this.branchesService.getApiClient(branchId);
    if (!apiClient) {
      throw new NotFoundException('API client not found');
    }

    const response = await apiClient.put(
      '/api/v2.0/billingprofiles',
      updateBillingProfileDto,
    );
    return response.data;
  }

  async getBillingProfileById(branchId: string, id: number, expand?: string[]) {
    const cacheKey = `billing_profile_${branchId}_${id}_${JSON.stringify(expand)}`;
    const cachedData = await this.cacheManager.get(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    const apiClient = this.branchesService.getApiClient(branchId);
    if (!apiClient) {
      throw new NotFoundException('API client not found');
    }

    const response = await apiClient.get(`/api/v2.0/billingprofiles/${id}`, {
      params: { Expand: expand },
    });
    const billingProfile = response.data;

    await this.cacheManager.set(cacheKey, billingProfile, 3600000); // 1 hour in milliseconds

    return billingProfile;
  }

  async deleteBillingProfile(branchId: string, id: number) {
    const apiClient = this.branchesService.getApiClient(branchId);
    if (!apiClient) {
      throw new NotFoundException('API client not found');
    }

    const response = await apiClient.delete(`/api/v2.0/billingprofiles/${id}`);
    return response.data;
  }

  async getBillingProfileRates(branchId: string, id: number) {
    const cacheKey = `billing_profile_rates_${branchId}_${id}`;
    const cachedData = await this.cacheManager.get(cacheKey);

    if (cachedData) {
      return cachedData;
    }

    const apiClient = this.branchesService.getApiClient(branchId);
    if (!apiClient) {
      throw new NotFoundException('API client not found');
    }

    const response = await apiClient.get(
      `/api/v2.0/billingprofiles/${id}/rates`,
    );
    const rates = response.data;

    await this.cacheManager.set(cacheKey, rates, 3600000); // 1 hour in milliseconds

    return rates;
  }

  async createBillingProfileRate(
    branchId: string,
    id: number,
    createBillingProfileRateDto: BillingProfileRateDto,
  ) {
    const apiClient = this.branchesService.getApiClient(branchId);
    if (!apiClient) {
      throw new NotFoundException('API client not found');
    }

    const response = await apiClient.post(
      `/api/v2.0/billingprofiles/${id}/rates`,
      createBillingProfileRateDto,
    );
    return response.data;
  }

  async updateBillingProfileRate(
    branchId: string,
    updateBillingProfileRateDto: BillingProfileRateDto,
  ) {
    const apiClient = this.branchesService.getApiClient(branchId);
    if (!apiClient) {
      throw new NotFoundException('API client not found');
    }

    const response = await apiClient.put(
      '/api/v2.0/billingprofiles/rates',
      updateBillingProfileRateDto,
    );
    return response.data;
  }

  async deleteBillingProfileRate(branchId: string, id: number, rateId: number) {
    const apiClient = this.branchesService.getApiClient(branchId);
    if (!apiClient) {
      throw new NotFoundException('API client not found');
    }

    const response = await apiClient.delete(
      `/api/v2.0/billingprofiles/${id}/rates/${rateId}`,
    );
    return response.data;
  }

  // Add other methods for rates management
}
