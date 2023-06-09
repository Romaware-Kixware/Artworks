import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { GroupType } from './group-type.entity';
import { GroupedPainting } from './grouped-painting.entity';

@Entity({ name: 'groups' })
export class Group extends BaseEntity {
  @PrimaryColumn({ name: 'group_id', unique: true })
  id: string;

  @Column({ name: 'group_name_en' })
  groupNameEN: string;

  @Column({ name: 'group_name_fr' })
  groupNameFR: string;

  @Column({ name: 'link' })
  link: string;

  @ManyToOne(
    () => GroupType,
    groupType => groupType.id,
  )
  @JoinColumn([{ name: 'group_type_id', referencedColumnName: 'id' }])
  groupType: GroupType;

  @OneToMany(
    () => GroupedPainting,
    groupedPainting => groupedPainting.group,
    { cascade: true },
  )
  groupedPainting: GroupedPainting[];
}
