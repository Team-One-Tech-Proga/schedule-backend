import { ApiProperty, PartialType } from '@nestjs/swagger';
import { TeacherCreateDto } from './teacher-create.dto';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class TeacherUpdateDto extends PartialType(TeacherCreateDto) {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  @ApiProperty()
  name: string;
}
