import { NotFoundException } from '@nestjs/common';
import { Painting } from 'src/paintings/painting.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateGroupDto } from './dto/create-group.dto';
import { GroupType } from './entities/group-type.entity';
import { Group } from './entities/group.entity';
import { GroupedPainting } from './entities/grouped-painting.entity';

@EntityRepository(Group)
export class GroupRepository extends Repository<Group> {
  async getGroups(): Promise<Group[]> {
    return await this.createQueryBuilder('groups')
      .leftJoinAndSelect('groups.groupType', 'groupType')
      .leftJoinAndSelect('groups.groupedPainting', 'groupedPainting')
      .leftJoinAndSelect('groupedPainting.painting', 'painting')
      .getMany();
  }

  async getGroupByTitleQuery(groupTitle: string): Promise<Group> {
    const resutlt = await this.createQueryBuilder('groups')
      .where('group_name_en = :groupTitle OR group_name_fr = :groupTitle', {
        groupTitle,
      })
      .leftJoinAndSelect('groups.groupType', 'groupType')
      .leftJoinAndSelect('groups.groupedPainting', 'groupedPainting')
      .leftJoinAndSelect('groupedPainting.painting', 'painting')
      .getOne();
    if (!resutlt) {
      throw new NotFoundException(`Group with TITLE "${groupTitle}" not found`);
    }
    return resutlt;
  }

  async createGroup(
    createGroupDto: CreateGroupDto,
    groupType: GroupType,
    paintings: Painting[],
  ): Promise<Group> {
    const groupedPaintings = [];
    paintings.forEach(function(element) {
      const groupedPainting = new GroupedPainting();
      groupedPainting.painting = element;
      groupedPaintings.push(groupedPainting);
    });

    const group = new Group();
    group.id = createGroupDto.groupId;
    group.groupNameEN = createGroupDto.groupNameEN;
    group.groupNameFR = createGroupDto.groupNameFR;
    group.link = createGroupDto.link;
    group.groupType = groupType;
    group.groupedPainting = groupedPaintings;
    return this.save(group);
  }
}
