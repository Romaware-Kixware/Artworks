import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';
import { PaintingCategory } from './painting-category.enum';
import { PaintingSize } from './painting-size.enum';

@Entity({ name: 'paintings' })
export class Painting extends BaseEntity {
  @PrimaryColumn({ name: 'product_id', unique: true })
  id: string;

  @Column({ name: 'title_en' })
  titleEN: string;

  @Column({ name: 'title_fr' })
  titleFR: string;

  @Column({ name: 'features_en' })
  featuresEN: string;

  @Column({ name: 'features_fr' })
  featuresFR: string;

  @Column({ name: 'product_year' })
  year: number;

  @Column({ name: 'price_cad' })
  priceCAD: number;

  @Column({ name: 'product_size' })
  size: PaintingSize;

  @Column({ name: 'product_width' })
  width: number;

  @Column({ name: 'product_height' })
  height: number;

  @Column({ name: 'category_en', nullable: true})
  categoryEN: PaintingCategory;

  @Column({ name: 'collection_en', nullable: true })
  collectionEN: string;

  @Column()
  hidden: boolean;

}
