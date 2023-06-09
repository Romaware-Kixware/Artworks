import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurrencyController } from './currency.controller';
import { CurrencyRepository } from './currency.repository';
import { CurrencyService } from './currency.service';

@Module({
  imports: [TypeOrmModule.forFeature([CurrencyRepository])],
  controllers: [CurrencyController],
  providers: [CurrencyService],
  exports: [TypeOrmModule],
})
export class CurrencyModule {}
