import { NotFoundException } from '@nestjs/common';
import { isNumberString } from 'class-validator';
import { EntityRepository, Repository } from 'typeorm';
import { GetPaintingsFilterDto } from './dto/get-paintings-filter.dto';
import { ChangePaintingStatusDto } from './dto/painting-status.dto';
import { Painting } from './painting.entity';

@EntityRepository(Painting)
export class PaintingRepository extends Repository<Painting> {
  async getPaintings(filterDto: GetPaintingsFilterDto): Promise<Painting[]> {
    const {
      size,
      category,
      min,
      max,
      sortBy,
      sortType,
      collection,
    } = filterDto;
    const query = this.createQueryBuilder('painting').orderBy(sortBy, sortType);
    query.andWhere('painting.hidden = false');

    
    if (collection && Array.isArray(collection)) {
      query.andWhere('painting.collection_en IN (:...collection)', {
        collection,
      });
    }

    if (collection && !Array.isArray(collection)) {
      query.andWhere('painting.collection_en = :collection', { collection });
    }

    if (size && Array.isArray(size)) {
      query.andWhere('painting.product_size IN (:...size)', { size });
    }

    if (size && !Array.isArray(size)) {
      query.andWhere('painting.product_size = :size', { size });
    }

    if (category && Array.isArray(category)) {
      query.andWhere('painting.category_en IN (:...category)', { category });
    }

    if (category && !Array.isArray(category)) {
      query.andWhere('painting.category_en = :category', { category });
    }

    if (isNumberString(min)) {
      query.andWhere('painting.price_cad >= :min', { min });
    }

    if (isNumberString(max)) {
      query.andWhere('painting.price_cad <= :max', { max });
    }
    return await query.getMany();
  }

  async changePaintingStatus(ChangePaintingStatusDto: ChangePaintingStatusDto): Promise<Painting> {
    const {
      hidden,
      paintingId
    } = ChangePaintingStatusDto;
    const found = await this.findOne(paintingId);
    if (!found) {
      throw new NotFoundException(`Painting with ID "${paintingId}" not found`);
    }
     const result = await this.save({...found,hidden});
     return result;
  }


}
