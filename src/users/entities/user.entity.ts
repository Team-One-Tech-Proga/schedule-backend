import { User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UserEntity implements User {
  @ApiProperty()
  id: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  username: string;

  password: string;

  @ApiProperty()
  groupId: string;

  @ApiProperty()
  markedEventsIDs: string[];
}
