import { Painting } from 'src/paintings/painting.entity';
import {
  BaseEntity,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Group } from './group.entity';

@Entity({ name: 'grouped_paintings' })
export class GroupedPainting extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(
    () => Group,
    group => group.id,
  )
  @JoinColumn([{ name: 'group_id', referencedColumnName: 'id' }])
  group: Group;

  @ManyToOne(
    () => Painting,
    painting => painting.id,
  )
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'id' }])
  painting: Painting;
}
