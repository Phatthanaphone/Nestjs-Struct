import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './resource/user/user.module';
import { NotificationModule } from './resource/notification/notification.module';
import { PrismaModule } from 'prisma/prisma.module';
import { RoleModule } from './resource/role/role.module';
import { AuthModule } from './resource/auth/auth.module';
import { AuthGuard } from './guard/jwt/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guard/jwt/roles.guard';
import { JwtAuthGuard } from './guard/jwt/jwt.guard';
import { APP_FILTER } from '@nestjs/core';

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
