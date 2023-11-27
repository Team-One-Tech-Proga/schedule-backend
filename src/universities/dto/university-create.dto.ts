import { ApiProperty } from '@nestjs/swagger';

export class UniversityCreateDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  slug: string;
}
