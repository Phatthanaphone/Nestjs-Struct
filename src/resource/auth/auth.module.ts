import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { AuthGuard } from '../../guard/jwt/auth.guard';
import { JwtAuthGuard } from '../../guard/jwt/jwt.guard';
import { Reflector } from '@nestjs/core';
import { RolesGuard } from '../../guard/jwt/roles.guard';

@Global()
@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'defaultSecret',  // Replace with a secure secret key
      signOptions: { expiresIn: '1h' },  // Token expiration time (optional)
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthGuard, AuthGuard, RolesGuard],
  exports: [AuthService, JwtAuthGuard, AuthGuard, RolesGuard]
})
export class AuthModule { }
