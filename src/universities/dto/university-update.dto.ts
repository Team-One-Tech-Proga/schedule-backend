import { PartialType } from '@nestjs/mapped-types';
import { UniversityCreateDto } from './university-create.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UniversityUpdateDto extends PartialType(UniversityCreateDto) {
  @ApiProperty()
  name: string;

  @ApiProperty()
  slug: string;
}
