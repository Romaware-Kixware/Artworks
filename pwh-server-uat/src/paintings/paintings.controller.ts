import { Body, Controller, Get, Param, Post, Query, ValidationPipe } from '@nestjs/common';
import { GetPaintingsFilterDto } from './dto/get-paintings-filter.dto';
import { ChangePaintingStatusDto } from './dto/painting-status.dto';
import { Painting } from './painting.entity';
import { PaintingsService } from './paintings.service';

@Controller('paintings')
export class PaintingsController {
  constructor(private paintingsService: PaintingsService) {
  }

  @Get()
  getPaintings(@Query(ValidationPipe) filterDto: GetPaintingsFilterDto): Promise<Painting[]> {
    return this.paintingsService.getPaintings(filterDto);
  }

  @Get('/:id')
  getPaintingById(@Param('id') id: string): Promise<Painting> {
    return this.paintingsService.getPaintingById(id);
  }
  @Post('/change-status')
  createMessage(@Body() paintingStatus: ChangePaintingStatusDto): Promise<Painting>{
      return this.paintingsService.changePaintingStatus(paintingStatus);
  }
}
