import { AxiosResponse } from 'axios';
import { GizmoApiPaginatedResponse } from './gizmo.types';

export interface IHostgroup {
  id: number;
  name: string;
  skinName: string | null;
  options: number;
  applicationGroupId: number | null;
  securityProfileId: number | null;
  defaultGuestGroupId: number | null;
}

export type GetHostgroupsResponse = AxiosResponse<
  GizmoApiPaginatedResponse<IHostgroup>
>;
