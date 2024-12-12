import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Headers, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/create-auth.dto';
import { Public } from './auth.route.access';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  create(@Body() LoginDto: LoginDto) {
    return this.authService.signIn(LoginDto);
  }

  @Get('validate-token')
  async validateToken(@Headers('authorization') authHeader: string) {
    if (!authHeader) {
      throw new UnauthorizedException('No authorization header provided');
    }
    const token = authHeader.split(' ')[1]; // Extract token from 'Bearer <token>'
    return this.authService.validateToken(token);
  }
}
