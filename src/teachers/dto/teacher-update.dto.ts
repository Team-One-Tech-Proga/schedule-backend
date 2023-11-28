import { ApiProperty, PartialType } from '@nestjs/swagger';
import { TeacherCreateDto } from './teacher-create.dto';

export class TeacherUpdateDto extends PartialType(TeacherCreateDto) {
  @ApiProperty()
  name: string;
}
