import { Injectable } from '@nestjs/common';
import { EventCreateDto } from './dto/event-create.dto';
import { EventUpdateDto } from './dto/event-update.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}
  create(createEventDto: EventCreateDto) {
    return 'This action adds a new event';
  }

  findAll() {
    return this.prisma.event.findMany({});
  }

  findOne(id: string) {
    return this.prisma.event.findUnique({
      where: { id },
      include: { group: true, subject: true, teacher: true },
    });
  }

  update(id: string, updateEventDto: EventUpdateDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: string) {
    return `This action removes a #${id} event`;
  }
}
