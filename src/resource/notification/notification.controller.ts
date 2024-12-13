import { Controller, Post, Body, Get, Param, UsePipes } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { ParseIdPipe } from 'src/pipe/validate-id';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  async create(@Body() createNotificationDto: CreateNotificationDto) {
    return "sucess"
  }

  @Post('send')
  async sendNotification(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationService.sendNotification(createNotificationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return 'success'
  }

}
