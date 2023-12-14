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
import { UniversitiesService } from './universities.service';
import { UniversityEntity } from './entities/university.entity';
import { UniversityCreateDto } from './dto/university-create.dto';
import { UniversityUpdateDto } from './dto/university-update.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiException } from '../errors/api-exception';

@Controller('universities')
@ApiTags('universities')
export class UniversitiesController {
  constructor(private readonly universitiesService: UniversitiesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: UniversityEntity })
  @ApiBadRequestResponse({ type: ApiException })
  @ApiUnauthorizedResponse({ type: ApiException })
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
  @ApiNotFoundResponse()
  async findOne(@Param('id') id: string) {
    const result = await this.universitiesService.findOne(id);
    if (!result) {
      throw new NotFoundException(`Object with ${id} does not exist.`);
    }
    return result;
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UniversityEntity })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse({ type: ApiException })
  @ApiUnauthorizedResponse({ type: ApiException })
  update(
    @Param('id') id: string,
    @Body() updateUniversityDto: UniversityUpdateDto,
  ) {
    return this.universitiesService.update(id, updateUniversityDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UniversityEntity })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse({ type: ApiException })
  @ApiUnauthorizedResponse({ type: ApiException })
  remove(@Param('id') id: string) {
    return this.universitiesService.remove(id);
  }
}
