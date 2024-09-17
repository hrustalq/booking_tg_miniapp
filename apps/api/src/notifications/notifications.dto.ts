export class CreateNotificationDto {
  type: string;
  message: string;
  read?: boolean;
  userId: number;
}

export class UpdateNotificationDto {
  type?: string;
  message?: string;
  read?: boolean;
  userId?: number;
}
