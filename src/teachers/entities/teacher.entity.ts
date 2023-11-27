import { Teacher } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class TeacherEntity implements Teacher {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  universityId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
