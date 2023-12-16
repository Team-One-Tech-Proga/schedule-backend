import { Injectable } from '@nestjs/common';
import { EventCreateDto } from './dto/event-create.dto';
import { EventUpdateDto } from './dto/event-update.dto';
import { PrismaService } from '../../providers/prisma/prisma.service';
import { EventRequestDto } from './dto/event-request.dto';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}
  create(createEventDto: EventCreateDto) {
    return this.prisma.event.create({ data: createEventDto });
  }

  findAll() {
    return this.prisma.event.findMany({});
  }

  findWithQuery(query: EventRequestDto) {
    return this.prisma.event.findMany({
      where: {
        groupId: query.groupId,
        teacherId: query.teacherId,
        startAt: {
          gte: query.startAt,
          lte: query.endAt,
        },
      },
      include: { group: true, subject: true, teacher: true },
    });
  }

  findWithQueryandUser(query: EventRequestDto, currentUser: any) {
    return this.prisma.event.findMany({
      where: {
        groupId: query.groupId,
        teacherId: query.teacherId,
        startAt: {
          gte: query.startAt,
          lte: query.endAt,
        },
        usersIDs: {
          hasSome: [currentUser.userId],
        },
      },
      include: { group: true, subject: true, teacher: true },
    });
  }

  findOne(id: string) {
    return this.prisma.event.findUnique({
      where: { id },
      include: { group: true, subject: true, teacher: true },
    });
  }

  update(id: string, updateEventDto: EventUpdateDto) {
    return this.prisma.event.update({
      where: { id },
      data: updateEventDto,
    });
  }

  async mark(eventId: string, currentUser: any) {
    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
    });

    return this.prisma.user.update({
      where: { id: currentUser.userId },
      data: { markedEvents: { connect: { id: event.id } } },
    });
  }

  async unMark(eventId: string, currentUser: any) {
    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
    });

    return this.prisma.user.update({
      where: { id: currentUser.userId },
      data: { markedEvents: { disconnect: { id: event.id } } },
    });
  }

  remove(id: string) {
    return this.prisma.event.delete({ where: { id } });
  }
}
