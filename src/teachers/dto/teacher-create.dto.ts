import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class TeacherCreateDto {
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

  @IsMongoId()
  @IsOptional()
  @ApiProperty()
  universityId: string;
}
