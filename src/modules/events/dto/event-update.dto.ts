import { ApiProperty, PartialType } from '@nestjs/swagger';
import { EventCreateDto } from './event-create.dto';
import { IsDate, IsMongoId, IsOptional } from 'class-validator';

export class EventUpdateDto extends PartialType(EventCreateDto) {
  @IsOptional()
  @IsDate()
  @ApiProperty()
  startAt: Date;

  @IsOptional()
  @IsDate()
  @ApiProperty()
  endAt: Date;

  @IsOptional()
  @ApiProperty()
  description?: string;

  @IsOptional()
  @IsMongoId()
  @ApiProperty()
  subjectId: string;

  @IsOptional()
  @IsMongoId()
  @ApiProperty()
  groupId: string;

  @IsOptional()
  @IsMongoId()
  @ApiProperty()
  teacherId?: string;
}
