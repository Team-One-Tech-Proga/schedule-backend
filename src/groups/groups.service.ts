import { Injectable } from '@nestjs/common';
import { GroupCreateDto } from './dto/group-create.dto';
import { GroupUpdateDto } from './dto/group-update.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GroupsService {
  constructor(private prisma: PrismaService) {}
  create(createGroupDto: GroupCreateDto) {
    return this.prisma.group.create({ data: createGroupDto });
  }

  findAll() {
    return this.prisma.group.findMany({});
  }

  findOne(id: string) {
    return this.prisma.group.findUnique({ where: { id } });
  }

  update(id: string, updateGroupDto: GroupUpdateDto) {
    return this.prisma.group.update({
      where: { id },
      data: updateGroupDto,
    });
  }

  remove(id: string) {
    return this.prisma.group.delete({ where: { id } });
  }
}
