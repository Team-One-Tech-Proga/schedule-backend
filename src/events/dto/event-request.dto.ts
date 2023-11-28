import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsMongoId, IsOptional } from 'class-validator';

export class EventRequestDto {
  @IsMongoId()
  @IsOptional()
  @ApiProperty({ required: false })
  groupId?: string;

  @IsMongoId()
  @IsOptional()
  @ApiProperty({ required: false })
  teacherId?: string;

  @IsDate()
  @IsOptional()
  @ApiProperty({ required: false })
  startAt?: Date;

  @IsDate()
  @IsOptional()
  @ApiProperty({ required: false })
  endAt?: Date;
}
