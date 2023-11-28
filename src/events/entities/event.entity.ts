import { Event } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { GroupEntity } from "../../groups/entities/group.entity";
import { TeacherEntity } from "../../teachers/entities/teacher.entity";

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

  @ApiProperty({ required: false, type: GroupEntity })
  group?: GroupEntity;

  @ApiProperty()
  teacherId: string;

  @ApiProperty({ required: false, type: TeacherEntity })
  teacher?: TeacherEntity;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
