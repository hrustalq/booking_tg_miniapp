import { AxiosResponse } from 'axios';
import { GizmoApiPaginatedResponse } from './gizmo.types';

export interface IHost {
  id: number;
  hostType: HostType;
  hostGroupId: number | null;
  number: number;
  name: string;
  isOutOfOrder: boolean;
  isLocked: boolean;
  iconId: null;
  isDeleted: boolean;
  hostComputer: {
    windowsName: string;
    macAddress: string;
  } | null;
  hostEndpoint: null;
}

export enum HostType {
  COMPUTER = 0,
  ENDPOINT = 1,
}

export type GetHostsResponse = AxiosResponse<GizmoApiPaginatedResponse<IHost>>;
