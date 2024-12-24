import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { LoggingMiddleware } from './middleware/logger';
import { JwtAuthGuard } from './guard/jwt/jwt.guard';
import { AuthGuard } from './guard/jwt/auth.guard';
import { RolesGuard } from './guard/jwt/roles.guard';
import { ValidatePaginationGuard } from './interceptor/validate-pagination-interceptor';

import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import { JwtService } from '@nestjs/jwt';
import { ResponseInterceptor } from './interceptor/response-interceptor';
import { HttpExceptionFilter } from './filter/error-filter-exception';
import { ParseIdPipe } from './pipe/validate-id';
async function bootstrap() {
  const server = express()
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  // Set security headers
  app.use(helmet());
  app.useGlobalGuards(
    new JwtAuthGuard(new Reflector()), // This is for JWT validation
    new AuthGuard(new JwtService(), new Reflector()), // This is for role-based or extra auth logic
    new RolesGuard(new Reflector()),
    new ValidatePaginationGuard(),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Enable transformation globally
      whitelist: true, // Remove properties not defined in the DTO
    }),
  );

  // Set up Global Filter
  app.useGlobalFilters(new HttpExceptionFilter());

  //set up Global Interceptor
  app.useGlobalInterceptors(new ResponseInterceptor());
  await app.listen(4000);
}
bootstrap();
