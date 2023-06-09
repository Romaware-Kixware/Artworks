import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaintingRepository } from 'src/paintings/painting.repository';
import { In } from 'typeorm';
import { CreateGroupDto } from './dto/create-group.dto';
import { Group } from './entities/group.entity';
import { GroupTypeRepository } from './group-types.repository';
import { GroupRepository } from './groups.repository';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(GroupRepository)
    private groupsRepository: GroupRepository,
    @InjectRepository(GroupTypeRepository)
    private groupTypeRepository: GroupTypeRepository,
    @InjectRepository(PaintingRepository)
    private paintingRepository: PaintingRepository,
  ) {}

  async getGroups(): Promise<Group[]> {
    return this.groupsRepository.getGroups();
  }

  async createGroup(createGroupDto: CreateGroupDto): Promise<Group> {
    const checkExistingGroup = await this.getGroupById(createGroupDto.groupId);
    if (checkExistingGroup) {
      throw new HttpException(
        `Group with ID "${createGroupDto.groupId}" already exists`,
        422,
      );
    }
    const findGroup = await this.groupTypeRepository.findOne(
      createGroupDto.groupTypeId,
    );
    if (!findGroup) {
      throw new NotFoundException(
        `Group Type with ID "${createGroupDto.groupTypeId}" not found`,
      );
    }
    const findPaintings = await this.paintingRepository.find({
      where: { id: In(createGroupDto.paintings) },
    });
    if (findPaintings.length < createGroupDto.paintings.length) {
      throw new NotFoundException(
        `We can't find all the paintings that you requested`,
      );
    }
    return this.groupsRepository.createGroup(
      createGroupDto,
      findGroup,
      findPaintings,
    );
  }

  async getGroupByTitle(groupTitle: string): Promise<Group> {
    return this.groupsRepository.getGroupByTitleQuery(groupTitle);
  }

  async getGroupById(id: string): Promise<Group> {
    console.log(id);
    const found = await this.groupsRepository.findOne(id, {
      relations: ['groupType', 'groupedPainting', 'groupedPainting.painting'],
    });
    if (!found) {
      throw new NotFoundException(`Group with ID "${id}" not found`);
    }
    return found;
  }
}
