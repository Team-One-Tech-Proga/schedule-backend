import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateSubjectDto {
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(100)
  @ApiProperty({ required: false })
  name?: string;
}
