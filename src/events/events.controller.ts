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
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { EventsService } from './events.service';
import { EventCreateDto } from './dto/event-create.dto';
import { EventUpdateDto } from './dto/event-update.dto';
import { EventEntity } from './entities/event.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/user.decorator';
import { UserEntity } from '../users/entities/user.entity';
import { EventRequestDto } from './dto/event-request.dto';

@Controller('events')
@ApiTags('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: EventEntity })
  create(@Body() createEventDto: EventCreateDto) {
    return this.eventsService.create(createEventDto);
  }

  @Get()
  @ApiOkResponse({ type: EventEntity, isArray: true })
  findAll(@Query() query: EventRequestDto) {
    return this.eventsService.findWithQuery(query);
  }

  @Get('marked')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: EventEntity, isArray: true })
  findAllMarked(
    @Query() query: EventRequestDto,
    @CurrentUser() user: UserEntity,
  ) {
    return this.eventsService.findWithQueryandUser(query, user);
  }

  @Get(':id')
  @ApiOkResponse({ type: EventEntity })
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: EventEntity })
  update(@Param('id') id: string, @Body() updateEventDto: EventUpdateDto) {
    return this.eventsService.update(id, updateEventDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: EventEntity })
  remove(@Param('id') id: string) {
    return this.eventsService.remove(id);
  }

  @Post(':id/mark')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse()
  mark(@Param('id') id: string, @CurrentUser() user: UserEntity) {
    return this.eventsService.mark(id, user);
  }

  @Delete(':id/mark')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse()
  unMark(@Param('id') id: string, @CurrentUser() user: UserEntity) {
    return this.eventsService.unMark(id, user);
  }
}
