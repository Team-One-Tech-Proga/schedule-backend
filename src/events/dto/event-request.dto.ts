import { ApiProperty } from '@nestjs/swagger';

export class EventRequestDto {
  @ApiProperty({ required: false })
  groupId?: string;

  @ApiProperty({ required: false })
  teacherId?: string;

  @ApiProperty({ required: false })
  startAt?: Date;

  @ApiProperty({ required: false })
  endAt?: Date;
}
