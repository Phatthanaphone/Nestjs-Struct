// create-notification.dto.ts
import { IsString } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  token: string; // The device token for the recipient

  @IsString()
  title: string; // The title of the notification

  @IsString()
  message: string; // The message body of the notification
}
