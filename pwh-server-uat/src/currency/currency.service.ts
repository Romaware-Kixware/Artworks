import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Currency} from './currency.entity';
import {CurrencyRepository} from './currency.repository';
import {CreateCurrencyDTO} from './dto/create-currency.dto';
import {UpdateCurrencyDTO} from './dto/update-currency.dto';

@Injectable()
export class CurrencyService {
    constructor(@InjectRepository(CurrencyRepository) private currencyRepository: CurrencyRepository,) {
    }

    async getAllExchanges(): Promise<Currency[]> {
        return await this.currencyRepository.getAllExchangeRates();
    }

    async getExchangesByDate(date: Date): Promise<Currency> {
        return await this.currencyRepository.getCurencyByDate(date);
    }

    async updateMarkup(updateCurrencyDTO: UpdateCurrencyDTO): Promise<Currency> {

        return await this.currencyRepository.updateMarkup(updateCurrencyDTO);
    }

    async createExchangeRate(createCurrencyDTO: CreateCurrencyDTO): Promise<Currency> {

        return await this.currencyRepository.createExchangeRate(createCurrencyDTO);
    }
}
