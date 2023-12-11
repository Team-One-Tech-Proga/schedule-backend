import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsMongoId, IsOptional } from 'class-validator';

export class EventRequestDto {
  @IsMongoId()
  @IsOptional()
  @ApiProperty({ required: false })
  groupId?: string;

  @IsMongoId()
  @IsOptional()
  @ApiProperty({ required: false })
  teacherId?: string;

  @IsISO8601()
  @IsOptional()
  @ApiProperty({ required: false })
  startAt?: Date;

  @IsISO8601()
  @IsOptional()
  @ApiProperty({ required: false })
  endAt?: Date;
}
