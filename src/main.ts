import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { LoggingMiddleware } from './middleware/logger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    // Set security headers
    app.use(helmet());
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: true,
      transform: true, // Enable transformation globally
      whitelist: true, // Remove properties not defined in the DTO
    }),
  );

  await app.listen(4000);
}
bootstrap();
