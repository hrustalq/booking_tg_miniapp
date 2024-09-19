import { PaginationParams } from '..';

export default {
  async getBranches(params: PaginationParams) {
    return await import('./get-branches').then(({ default: getBranches }) => getBranches(params));
  },
  async getBranch(id: string) {
    return await import('./get-branch').then(({ default: getBranch }) => getBranch(id));
  },
};