import { ApiProperty, PartialType } from '@nestjs/swagger';
import { GroupCreateDto } from './group-create.dto';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class GroupUpdateDto extends PartialType(GroupCreateDto) {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  @ApiProperty()
  name: string;
}
