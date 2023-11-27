import { Injectable } from '@nestjs/common';
import { GroupCreateDto } from './dto/group-create.dto';
import { GroupUpdateDto } from './dto/group-update.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as events from "events";

@Injectable()
export class GroupsService {
  constructor(private prisma: PrismaService) {}
  create(createGroupDto: GroupCreateDto) {
    return 'This action adds a new group';
  }

  findAll() {
    return this.prisma.group.findMany({});
  }

  findOne(id: string) {
    return this.prisma.group.findUnique({ where: { id } });
  }

  findOneWithEvents(id: string) {
    return this.prisma.group.findUnique({
      where: { id },
      include: { events: true },
    });
  }

  update(id: number, updateGroupDto: GroupUpdateDto) {
    return `This action updates a #${id} group`;
  }

  remove(id: number) {
    return `This action removes a #${id} group`;
  }
}
