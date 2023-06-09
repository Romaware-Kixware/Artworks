import {HttpService} from '@nestjs/axios';
import {HttpException, Injectable} from '@nestjs/common';
import {catchError, map, Observable} from 'rxjs';
import {CurencyDto} from './dto/exchange-rate.dto';

@Injectable()
export class ExchangeRateService {

    api = 'https://www.bankofcanada.ca/valet//observations/FXUSDCAD,FXGBPCAD,FXEURCAD/json?recent=1';

    constructor(private httpService: HttpService) {
    }

    getExchangeRate(): Observable<CurencyDto> {

        let currency = new CurencyDto();

        const res = this.httpService.get(this.api).pipe(
            catchError(e => {
                throw new HttpException('Can not get exchange rate! Please try later!', e.response.status);
            }),
            map((x) => x.data.observations),
            map((t) => {
                currency.date = t[0].d;
                currency.eur = t[0].FXEURCAD.v;
                currency.gbp = t[0].FXGBPCAD.v;
                currency.usd = t[0].FXUSDCAD.v;
                return currency;
            }),
        );

        return res;
    }
}
