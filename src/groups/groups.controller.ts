import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from "@nestjs/swagger";
import { GroupsService } from './groups.service';
import { GroupEntity } from './entities/group.entity';
import { GroupCreateDto } from './dto/group-create.dto';
import { GroupUpdateDto } from './dto/group-update.dto';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  @ApiCreatedResponse({ type: GroupEntity })
  create(@Body() createGroupDto: GroupCreateDto) {
    return this.groupsService.create(createGroupDto);
  }

  @Get()
  @ApiOkResponse({ type: GroupEntity, isArray: true })
  findAll() {
    return this.groupsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: GroupEntity })
  findOne(@Param('id') id: string) {
    return this.groupsService.findOne(id);
  }

  @Get(':id/events')
  @ApiOkResponse({ type: GroupEntity })
  findOneWithEvents(@Param('id') id: string) {
    return this.groupsService.findOneWithEvents(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: GroupEntity })
  update(@Param('id') id: string, @Body() updateGroupDto: GroupUpdateDto) {
    return this.groupsService.update(+id, updateGroupDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: GroupEntity })
  remove(@Param('id') id: string) {
    return this.groupsService.remove(+id);
  }
}
