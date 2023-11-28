import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsInt, IsMongoId, IsNotEmpty, IsOptional, IsPositive, IsString } from "class-validator";

export class EventCreateDto {
  @IsNotEmpty()
  @IsDate()
  @ApiProperty()
  startAt: Date;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty()
  endAt: Date;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  description?: string;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @ApiProperty()
  sourceId: number;

  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty()
  subjectId: string;

  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty()
  groupId: string;

  @IsOptional()
  @IsMongoId()
  @ApiProperty({ required: false })
  teacherId?: string;
}
