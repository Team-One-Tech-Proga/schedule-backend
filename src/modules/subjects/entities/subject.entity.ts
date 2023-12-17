import { ApiProperty } from '@nestjs/swagger';
import { Subject } from '@prisma/client';

export class SubjectEntity implements Subject {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  nameRaw: string;

  @ApiProperty()
  groupId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
