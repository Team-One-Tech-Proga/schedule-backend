import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { TeachersService } from './teachers.service';
import { TeacherEntity } from './entities/teacher.entity';
import { TeacherCreateDto } from './dto/teacher-create.dto';
import { TeacherUpdateDto } from './dto/teacher-update.dto';

@Controller('teachers')
@ApiTags('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: TeacherEntity })
  create(@Body() createTeacherDto: TeacherCreateDto) {
    return this.teachersService.create(createTeacherDto);
  }

  @Get()
  @ApiOkResponse({ type: TeacherEntity, isArray: true })
  findAll() {
    return this.teachersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: TeacherEntity })
  findOne(@Param('id') id: string) {
    return this.teachersService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: TeacherEntity })
  update(@Param('id') id: string, @Body() updateTeacherDto: TeacherUpdateDto) {
    return this.teachersService.update(id, updateTeacherDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: TeacherEntity })
  remove(@Param('id') id: string) {
    return this.teachersService.remove(id);
  }
}
