import { University } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UniversityEntity implements University {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
