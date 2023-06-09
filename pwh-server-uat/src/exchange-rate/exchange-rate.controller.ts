import { Controller, Get } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ExchangeRateService } from './exchange-rate.service';
import { AxiosResponse } from 'axios';
import { CurencyDto } from './dto/exchange-rate.dto';

@Controller('exchange-rate')
export class ExchangeRateController {
    constructor(private getExchangeRate: ExchangeRateService) {}

    @Get()
    getExchange(): Observable<CurencyDto> {
      return this.getExchangeRate.getExchangeRate();

    }
}
