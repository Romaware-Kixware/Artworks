import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigAsync } from './config/typeorm.config';
import { GroupsModule } from './groups/groups.module';
import { PaintingsController } from './paintings/paintings.controller';
import { PaintingsModule } from './paintings/paintings.module';
import { PaintingsService } from './paintings/paintings.service';
import { ExchangeRateModule } from './exchange-rate/exchange-rate.module';
import { HttpModule } from '@nestjs/axios';
import { ExchangeRateService } from './exchange-rate/exchange-rate.service';
import { ExchangeRateController } from './exchange-rate/exchange-rate.controller';
import { CurrencyModule } from './currency/currency.module';

@Module({
  imports: [
  
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
 
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    PaintingsModule,
    GroupsModule,
    ExchangeRateModule,
    CurrencyModule,
  ],
  controllers: [PaintingsController,ExchangeRateController],
  providers: [PaintingsService,ExchangeRateService],
})
export class AppModule {}
