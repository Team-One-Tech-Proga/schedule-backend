import { Module } from '@nestjs/common';
import { UniversitiesService } from './universities.service';
import { UniversitiesController } from './universities.controller';
import { PrismaModule } from '../../providers/prisma/prisma.module';

@Module({
  controllers: [UniversitiesController],
  providers: [UniversitiesService],
  imports: [PrismaModule],
})
export class UniversitiesModule {}
