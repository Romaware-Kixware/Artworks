import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaintingRepository } from 'src/paintings/painting.repository';
import { GroupTypeRepository } from './group-types.repository';
import { GroupsController } from './groups.controller';
import { GroupRepository } from './groups.repository';
import { GroupsService } from './groups.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([GroupRepository]),
    TypeOrmModule.forFeature([GroupTypeRepository]),
    TypeOrmModule.forFeature([PaintingRepository]),
  ],
  controllers: [GroupsController],
  providers: [GroupsService],
  exports: [TypeOrmModule],
})
export class GroupsModule {}
