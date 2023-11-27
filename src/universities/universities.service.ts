import { Injectable } from '@nestjs/common';
import { UniversityCreateDto } from './dto/university-create.dto';
import { UniversityUpdateDto } from './dto/university-update.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UniversitiesService {
  constructor(private prisma: PrismaService) {}
  create(createUniversityDto: UniversityCreateDto) {
    return '{This action adds a new university}}';
  }

  findAll() {
    return this.prisma.university.findMany({});
  }

  findOne(id: string) {
    return this.prisma.university.findUnique({ where: { id } });
  }

  update(id: string, updateUniversityDto: UniversityUpdateDto) {
    return `This action updates a #${id} university`;
  }

  remove(id: string) {
    return `This action removes a #${id} university`;
  }
}
