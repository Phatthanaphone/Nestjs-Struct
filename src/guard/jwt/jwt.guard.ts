import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from './auth.guard';  // Import AuthGuard
import { RolesGuard } from './roles.guard';  // Import RolesGuard
import { JwtService } from '@nestjs/jwt';  // JwtService for token verification
import { IS_PUBLIC_KEY } from '../permission/roles';  // Public route key
import { ROLES_KEY } from '../permission/roles';  // Roles access key

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    // private authGuard: AuthGuard,  // Inject AuthGuard
    // private rolesGuard: RolesGuard,  // Inject RolesGuard
    private reflector: Reflector,  // Reflector to access metadata
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // First, check if the route is public
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true; // If it's a public route, no need for authentication or roles check
    }
  return true
    // First check authentication (JWT verification)
    // const isAuthenticated = await this.authGuard.canActivate(context);
    // if (!isAuthenticated) {
    //   throw new UnauthorizedException('Unauthorized access');
    // }

    // // Then check for required roles
    // return this.rolesGuard.canActivate(context);
  }
}
