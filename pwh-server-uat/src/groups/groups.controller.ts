import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { Group } from './entities/group.entity';
import { GroupsService } from './groups.service';

@Controller('groups')
export class GroupsController {
  constructor(private groupsService: GroupsService) {}

  @Get()
  GetGroups(): Promise<Group[]> {
    return this.groupsService.getGroups();
  }

  @Get('/title/:id')
  getGroupByTitle(@Param('id') title: string): Promise<Group> {
    return this.groupsService.getGroupByTitle(title);
  }

  @Get('/:id')
  getGroupById(@Param('id') id: string): Promise<Group> {
    return this.groupsService.getGroupById(id);
  }

  @Post('/create-group')
  createGroup(@Body() createGroupDto: CreateGroupDto): Promise<Group> {
    return this.groupsService.createGroup(createGroupDto);
  }
}
