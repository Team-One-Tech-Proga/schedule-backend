import { ApiProperty, PartialType } from '@nestjs/swagger';
import { EventCreateDto } from './event-create.dto';

export class EventUpdateDto extends PartialType(EventCreateDto) {
  @ApiProperty()
  startAt: Date;

  @ApiProperty()
  endAt: Date;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  subjectId: string;

  @ApiProperty()
  groupId: string;

  @ApiProperty()
  teacherId?: string;
}
