import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { EventsService } from './events.service';
import { EventCreateDto } from './dto/event-create.dto';
import { EventUpdateDto } from './dto/event-update.dto';
import { EventEntity } from './entities/event.entity';
import { EventRequestDto } from "./dto/event-request.dto";

@Controller('events')
@ApiTags('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
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

  @Get(':id')
  @ApiOkResponse({ type: EventEntity })
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: EventEntity })
  update(@Param('id') id: string, @Body() updateEventDto: EventUpdateDto) {
    return this.eventsService.update(id, updateEventDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: EventEntity })
  remove(@Param('id') id: string) {
    return this.eventsService.remove(id);
  }
}
