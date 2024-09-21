import { apiClient } from '@/api';
import { UserGroupPagedListDto } from './types';

export const getUserGroups = async (branchId: string): Promise<UserGroupPagedListDto> => {
  const response = await apiClient.get(`/usergroups/${branchId}`);
  return response.data;
};