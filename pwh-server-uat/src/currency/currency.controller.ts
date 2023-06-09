import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {Currency} from './currency.entity';
import {CurrencyService} from './currency.service';
import {CreateCurrencyDTO} from './dto/create-currency.dto';
import {UpdateCurrencyDTO} from './dto/update-currency.dto';

@Controller('currency')
export class CurrencyController {
    constructor(private currencyService: CurrencyService) {
    }

    @Get()
    async getAllCurrency(): Promise<Currency[]> {
        return await this.currencyService.getAllExchanges();
    }

    @Get('/:date')
    async getCurrencyRateByDate(@Param('date') date: Date): Promise<Currency> {
        return await this.currencyService.getExchangesByDate(date);
    }

    @Post('/update-markup')
    async updateMarkup(@Body() updateCurrencyDTO: UpdateCurrencyDTO): Promise<Currency> {
        return await this.currencyService.updateMarkup(updateCurrencyDTO);
    }

    @Post()
    async createExchangeRate(@Body() createCurrencyDTO: CreateCurrencyDTO) {
        return await this.currencyService.createExchangeRate(createCurrencyDTO);
    }
}
