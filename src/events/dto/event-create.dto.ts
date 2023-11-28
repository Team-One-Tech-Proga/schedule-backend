import { ApiProperty } from '@nestjs/swagger';

export class EventCreateDto {
  @ApiProperty()
  startAt: Date;

  @ApiProperty()
  endAt: Date;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty()
  sourceId: number;

  @ApiProperty()
  subjectId: string;

  @ApiProperty()
  groupId: string;

  @ApiProperty({ required: false })
  teacherId?: string;
}
