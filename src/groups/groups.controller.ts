import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { GroupsService } from './groups.service';
import { GroupEntity } from './entities/group.entity';
import { GroupCreateDto } from './dto/group-create.dto';
import { GroupUpdateDto } from './dto/group-update.dto';

@Controller('groups')
@ApiTags('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  @ApiBearerAuth()
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

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: GroupEntity })
  update(@Param('id') id: string, @Body() updateGroupDto: GroupUpdateDto) {
    return this.groupsService.update(id, updateGroupDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: GroupEntity })
  remove(@Param('id') id: string) {
    return this.groupsService.remove(id);
  }
}
