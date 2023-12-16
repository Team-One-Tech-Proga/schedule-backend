import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
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
import { EventsService } from './events.service';
import { EventCreateDto } from './dto/event-create.dto';
import { EventUpdateDto } from './dto/event-update.dto';
import { EventEntity } from './entities/event.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/user.decorator';
import { UserEntity } from '../users/entities/user.entity';
import { EventRequestDto } from './dto/event-request.dto';
import { ApiException } from '../../errors/api-exception';
import { JwtPayloadDto } from '../auth/dto/jwt-payload.dto';

@Controller('events')
@ApiTags('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: EventEntity })
  @ApiBadRequestResponse({ type: ApiException })
  @ApiUnauthorizedResponse({ type: ApiException })
  create(@Body() createEventDto: EventCreateDto) {
    return this.eventsService.create(createEventDto);
  }

  @Get()
  @ApiOkResponse({ type: EventEntity, isArray: true })
  @ApiBadRequestResponse({ type: ApiException })
  findAll(@Query() query: EventRequestDto) {
    return this.eventsService.findWithQuery(query);
  }

  @Get('marked')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: EventEntity, isArray: true })
  @ApiBadRequestResponse({ type: ApiException })
  @ApiUnauthorizedResponse({ type: ApiException })
  findAllMarked(
    @Query() query: EventRequestDto,
    @CurrentUser() user: JwtPayloadDto,
  ) {
    return this.eventsService.findWithQueryAndUser(query, user.id);
  }

  @Get(':id')
  @ApiOkResponse({ type: EventEntity })
  @ApiNotFoundResponse()
  async findOne(@Param('id') id: string) {
    const result = await this.eventsService.findOne(id);
    if (!result) {
      throw new NotFoundException(`Object with ${id} does not exist.`);
    }
    return result;
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: EventEntity })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse({ type: ApiException })
  @ApiUnauthorizedResponse({ type: ApiException })
  update(@Param('id') id: string, @Body() updateEventDto: EventUpdateDto) {
    return this.eventsService.update(id, updateEventDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: EventEntity })
  @ApiNotFoundResponse()
  @ApiBadRequestResponse({ type: ApiException })
  @ApiUnauthorizedResponse({ type: ApiException })
  remove(@Param('id') id: string) {
    return this.eventsService.remove(id);
  }

  @Post(':id/mark')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse({ type: ApiException })
  @ApiUnauthorizedResponse({ type: ApiException })
  mark(@Param('id') id: string, @CurrentUser() user: UserEntity) {
    return this.eventsService.mark(id, user);
  }

  @Delete(':id/mark')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse({ type: ApiException })
  @ApiUnauthorizedResponse({ type: ApiException })
  unMark(@Param('id') id: string, @CurrentUser() user: UserEntity) {
    return this.eventsService.unMark(id, user);
  }
}
