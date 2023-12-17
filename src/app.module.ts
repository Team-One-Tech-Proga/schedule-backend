import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './providers/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UniversitiesModule } from './modules/universities/universities.module';
import { GroupsModule } from './modules/groups/groups.module';
import { TeachersModule } from './modules/teachers/teachers.module';
import { SubjectsModule } from './modules/subjects/subjects.module';
import { EventsModule } from './modules/events/events.module';
import appConfig from './configs/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
    PrismaModule,
    AuthModule,
    UniversitiesModule,
    GroupsModule,
    TeachersModule,
    SubjectsModule,
    EventsModule,
  ],
})
export class AppModule {}
