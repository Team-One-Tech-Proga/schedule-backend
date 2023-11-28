import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { UniversitiesService } from './universities.service';
import { UniversityEntity } from './entities/university.entity';
import { UniversityCreateDto } from './dto/university-create.dto';
import { UniversityUpdateDto } from './dto/university-update.dto';

@Controller('universities')
@ApiTags('universities')
export class UniversitiesController {
  constructor(private readonly universitiesService: UniversitiesService) {}

  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: UniversityEntity })
  create(@Body() createUniversityDto: UniversityCreateDto) {
    return this.universitiesService.create(createUniversityDto);
  }

  @Get()
  @ApiOkResponse({ type: UniversityEntity, isArray: true })
  findAll() {
    return this.universitiesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: UniversityEntity })
  findOne(@Param('id') id: string) {
    return this.universitiesService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: UniversityEntity })
  update(
    @Param('id') id: string,
    @Body() updateUniversityDto: UniversityUpdateDto,
  ) {
    return this.universitiesService.update(id, updateUniversityDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: UniversityEntity })
  remove(@Param('id') id: string) {
    return this.universitiesService.remove(id);
  }
}
