import { IsOptional } from 'class-validator';
import { PaintingCollection } from '../paintiing-collection.enum';
import { PaintingCategory } from '../painting-category.enum';
import { PaintingSize } from '../painting-size.enum';
export class GetPaintingsFilterDto {
  @IsOptional()
  // @IsIn([PaintingSize.SMALL, PaintingSize.MEDIUM, PaintingSize.LARGE, PaintingSize.XLARGE])
  size: PaintingSize;

  @IsOptional()
  // @IsIn([PaintingCategory.ABSTRACT, PaintingCategory.FIGURATIVE, PaintingCategory.ABSTRACTFIGURATIVE])
  category: PaintingCategory;

  @IsOptional()
  collection: PaintingCollection;
  
  @IsOptional()
  min: number;

  @IsOptional()
  max: number;

  sortBy: string;
  sortType: any;
}
