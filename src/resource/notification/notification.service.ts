// notification.service.ts
import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { FirebaseService } from '../../config/firebase-service'; // Use named import

@Injectable()
export class NotificationService {
  private readonly firebaseService: FirebaseService;

  constructor() {
    this.firebaseService = FirebaseService.getInstance(); // Get the singleton instance of FirebaseService
  }

  create(createNotificationDto: CreateNotificationDto) {
    return 'This action adds a new notification';
  }

  async sendNotification(createNotificationDto: CreateNotificationDto) {
    const { token, title, message } = createNotificationDto;

    try {
      const response = await this.firebaseService.sendNotification(token, title, message);
      return { success: true, response };
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  }

  findAll() {
    return 'This action returns all notifications';
  }

  findOne(id: number) {
    return `This action returns a #${id} notification`;
  }

  update(id: number, updateNotificationDto: UpdateNotificationDto) {
    return `This action updates a #${id} notification`;
  }

  remove(id: number) {
    return `This action removes a #${id} notification`;
  }
}
