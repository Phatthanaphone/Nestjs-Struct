// prisma.module.ts
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Mark the module as global, so PrismaService is available throughout the app
@Module({
  providers: [PrismaService], // Provide PrismaService here
  exports: [PrismaService], // Make it available for other modules
})
export class PrismaModule {}