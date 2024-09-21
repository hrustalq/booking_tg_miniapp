import { PaginationParams } from '@/api';

export * from './types';
export default {
  async getBranches(params: PaginationParams) {
    return await import('./get-branches').then(mod => mod.default(params));
  },
};