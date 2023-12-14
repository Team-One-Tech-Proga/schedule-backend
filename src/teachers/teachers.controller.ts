import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { TeachersService } from './teachers.service';
import { TeacherEntity } from './entities/teacher.entity';
import { TeacherCreateDto } from './dto/teacher-create.dto';
import { TeacherUpdateDto } from './dto/teacher-update.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiException } from '../errors/api-exception';

@Controller('teachers')
@ApiTags('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: TeacherEntity })
  @ApiBadRequestResponse({ type: ApiException })
  @ApiUnauthorizedResponse({ type: ApiException })
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
  @ApiNotFoundResponse()
  async findOne(@Param('id') id: string) {
    const result = await this.teachersService.findOne(id);
    if (!result) {
      throw new NotFoundException(`Object with ${id} does not exist.`);
    }
    return result;
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: TeacherEntity })
  @ApiBadRequestResponse({ type: ApiException })
  @ApiUnauthorizedResponse({ type: ApiException })
  update(@Param('id') id: string, @Body() updateTeacherDto: TeacherUpdateDto) {
    return this.teachersService.update(id, updateTeacherDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: TeacherEntity })
  @ApiBadRequestResponse({ type: ApiException })
  @ApiUnauthorizedResponse({ type: ApiException })
  remove(@Param('id') id: string) {
    return this.teachersService.remove(id);
  }
}
