import { ApiProperty } from '@nestjs/swagger';

export class TeacherCreateDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  universityId: string;
}
