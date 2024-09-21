import { GizmoUser } from '..';
import { apiClient } from '@/api';

export default async function (telegramId: number): Promise<GizmoUser[]> {
  const REQUEST_URL = `/users/linked-account/${telegramId}`;
  const { data } = await apiClient.get(REQUEST_URL);
  return data;
}