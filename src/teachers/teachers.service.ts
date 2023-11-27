import { Injectable } from '@nestjs/common';
import { TeacherCreateDto } from './dto/teacher-create.dto';
import { TeacherUpdateDto } from './dto/teacher-update.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TeachersService {
  constructor(private prisma: PrismaService) {}
  create(createTeacherDto: TeacherCreateDto) {
    return 'This action adds a new teacher';
  }

  findAll() {
    return this.prisma.teacher.findMany({});
  }

  findOne(id: string) {
    return this.prisma.teacher.findUnique({ where: { id } });
  }

  update(id: string, updateTeacherDto: TeacherUpdateDto) {
    return `This action updates a #${id} teacher`;
  }

  remove(id: string) {
    return `This action removes a #${id} teacher`;
  }
}
