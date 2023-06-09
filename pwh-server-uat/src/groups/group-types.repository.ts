import { EntityRepository, Repository } from 'typeorm';
import { GroupType } from './entities/group-type.entity';

@EntityRepository(GroupType)
export class GroupTypeRepository extends Repository<GroupType> {}
