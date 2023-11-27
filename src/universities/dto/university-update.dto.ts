import { PartialType } from '@nestjs/mapped-types';
import { UniversityCreateDto } from './university-create.dto';

export class UniversityUpdateDto extends PartialType(UniversityCreateDto) {}
