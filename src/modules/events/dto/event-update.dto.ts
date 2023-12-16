import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsMongoId, IsOptional } from 'class-validator';

export class EventUpdateDto {
  @IsOptional()
  @IsDate()
  @ApiProperty({ required: false })
  startAt?: Date;

  @IsOptional()
  @IsDate()
  @ApiProperty({ required: false })
  endAt?: Date;

  @IsOptional()
  @ApiProperty({ required: false })
  description?: string;

  @IsOptional()
  @IsMongoId()
  @ApiProperty({ required: false })
  subjectId?: string;

  @IsOptional()
  @IsMongoId()
  @ApiProperty({ required: false })
  groupId?: string;

  @IsOptional()
  @IsMongoId()
  @ApiProperty({ required: false })
  teacherId?: string;
}
