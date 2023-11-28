import { Injectable } from '@nestjs/common';
import { UniversityCreateDto } from './dto/university-create.dto';
import { UniversityUpdateDto } from './dto/university-update.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UniversitiesService {
  constructor(private prisma: PrismaService) {}
  create(createUniversityDto: UniversityCreateDto) {
    return this.prisma.university.create({ data: createUniversityDto });
  }

  findAll() {
    return this.prisma.university.findMany({});
  }

  findOne(id: string) {
    return this.prisma.university.findUnique({ where: { id } });
  }

  update(id: string, updateUniversityDto: UniversityUpdateDto) {
    return this.prisma.university.update({
      where: { id },
      data: updateUniversityDto,
    });
  }

  remove(id: string) {
    return this.prisma.university.delete({ where: { id } });
  }
}
