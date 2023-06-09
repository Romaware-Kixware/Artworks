import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ExchangeRateController } from './exchange-rate.controller';
import { ExchangeRateService } from './exchange-rate.service';

@Module({
  imports:[
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
  ],
  controllers: [ExchangeRateController],
  providers: [ExchangeRateService]
})
export class ExchangeRateModule {}
