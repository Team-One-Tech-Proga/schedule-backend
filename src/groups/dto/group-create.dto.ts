import { ApiProperty } from '@nestjs/swagger';

export class GroupCreateDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  universityId: string;
}
