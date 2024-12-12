import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './resource/user/user.module';
import { NotificationModule } from './resource/notification/notification.module';
import { PrismaModule } from 'prisma/prisma.module';
import { RoleModule } from './resource/role/role.module';
import { AuthModule } from './resource/auth/auth.module';
import { AuthGuard } from './resource/auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './resource/auth/roles.guard';
import { JwtAuthGuard } from './resource/auth/jwt.auth.guard';

@Module({
  imports: [UserModule, NotificationModule, PrismaModule, RoleModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, 
  //   {
  //   provide: APP_GUARD,
  //   useClass: JwtAuthGuard 
  // },
],
})
export class AppModule { }
