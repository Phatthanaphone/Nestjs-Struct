import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService
  ) { }

  async signIn(LoginDto: LoginDto) {
    const user = await this.prisma.user.findFirst({
      where: { email: LoginDto.email }, include: {
        role: true, // Include related role data
      }
    })
    if (!user) throw new NotFoundException("User not found")

    const isPasswordValid = await bcrypt.compare(LoginDto.password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');
    const payload = { sub: user.id, username: user.email,role : user.role.name  };

    return {
      access_token: await this.jwtService.signAsync(payload),
    }
  }

  async validateToken(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET || 'defaultSecret', // Use the secret to verify the token
      });

      // Example: Payload contains the decoded JWT data
      return {
        userId: payload.sub,
        email: payload.email,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
