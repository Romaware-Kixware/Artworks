import { Module } from '@nestjs/common';
import { PaintingsController } from './paintings.controller';
import { PaintingsService } from './paintings.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaintingRepository } from './painting.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PaintingRepository])],
  controllers: [PaintingsController],
  providers: [PaintingsService],
  exports: [TypeOrmModule],
})
export class PaintingsModule {
}
