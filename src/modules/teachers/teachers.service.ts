import { Injectable } from '@nestjs/common';
import { TeacherCreateDto } from './dto/teacher-create.dto';
import { TeacherUpdateDto } from './dto/teacher-update.dto';
import { PrismaService } from '../../providers/prisma/prisma.service';

@Injectable()
export class TeachersService {
  constructor(private prisma: PrismaService) {}
  create(createTeacherDto: TeacherCreateDto) {
    return this.prisma.teacher.create({ data: createTeacherDto });
  }

  findAll() {
    return this.prisma.teacher.findMany({});
  }

  findOne(id: string) {
    return this.prisma.teacher.findUnique({ where: { id } });
  }

  update(id: string, updateTeacherDto: TeacherUpdateDto) {
    return this.prisma.teacher.update({
      where: { id },
      data: updateTeacherDto,
    });
  }

  remove(id: string) {
    return this.prisma.teacher.delete({ where: { id } });
  }
}
