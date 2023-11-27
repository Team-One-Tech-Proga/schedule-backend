import { Event } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class EventEntity implements Event {
  @ApiProperty()
  id: string;

  @ApiProperty()
  startAt: Date;

  @ApiProperty()
  endAt: Date;

  @ApiProperty()
  description: string;

  @ApiProperty()
  sourceId: number;

  @ApiProperty()
  subjectId: string;

  @ApiProperty()
  groupId: string;

  @ApiProperty()
  teacherId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
