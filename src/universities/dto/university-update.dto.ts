import { PartialType } from '@nestjs/mapped-types';
import { UniversityCreateDto } from './university-create.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class UniversityUpdateDto extends PartialType(UniversityCreateDto) {
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(100)
  @ApiProperty()
  name: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(30)
  @ApiProperty()
  slug: string;
}
