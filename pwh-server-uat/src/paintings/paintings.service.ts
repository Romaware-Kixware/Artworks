import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GetPaintingsFilterDto } from './dto/get-paintings-filter.dto';
import { ChangePaintingStatusDto } from './dto/painting-status.dto';
import { Painting } from './painting.entity';
import { PaintingRepository } from './painting.repository';

@Injectable()
export class PaintingsService {
  constructor(
    @InjectRepository(PaintingRepository)
    private paintingRepository: PaintingRepository,
  ) {}

  async getPaintings(filterDto: GetPaintingsFilterDto): Promise<Painting[]> {
    return this.paintingRepository.getPaintings(filterDto);
  }
  async changePaintingStatus(changePaintingStatusDto: ChangePaintingStatusDto): Promise<Painting> {
    return this.paintingRepository.changePaintingStatus(changePaintingStatusDto);
  }

  async getPaintingById(id: string): Promise<Painting> {
    const found = await this.paintingRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Painting with ID "${id}" not found`);
    }
    return found;
  }
}
