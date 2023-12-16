import { Module } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { TeachersController } from './teachers.controller';
import { PrismaModule } from '../../providers/prisma/prisma.module';

@Module({
  controllers: [TeachersController],
  providers: [TeachersService],
  imports: [PrismaModule],
})
export class TeachersModule {}
