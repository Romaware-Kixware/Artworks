import {NotFoundException} from "@nestjs/common";
import {EntityRepository, Repository} from "typeorm";
import {Currency} from "./currency.entity";
import {CreateCurrencyDTO} from "./dto/create-currency.dto";
import {UpdateCurrencyDTO} from "./dto/update-currency.dto";


@EntityRepository(Currency)
export class CurrencyRepository extends Repository<Currency> {
    async getAllExchangeRates(): Promise<Currency[]> {
        const query = this.createQueryBuilder();
        return await query.getMany();
    }

    async getCurencyByDate(date: Date): Promise<Currency> {
        return await this.findOne(date)
    }

    async updateMarkup(updateCurrencyDTO: UpdateCurrencyDTO): Promise<Currency> {
        const {creation_date, markup} = updateCurrencyDTO;
        const found = await this.getCurencyByDate(creation_date);
        if (!found) {
            throw new NotFoundException('Exchange rate for $"{creation_date}" is not found!')
        }
        const result = await this.save({...found, markup});
        return result;
    }

    async createExchangeRate(createCurrencyDTO: CreateCurrencyDTO): Promise<Currency> {
        const currency = new Currency();
        currency.creationDate = createCurrencyDTO.creationDate.toString();
        currency.eur = createCurrencyDTO.eur;
        currency.usd = createCurrencyDTO.usd;
        currency.gbp = createCurrencyDTO.gbp;
        currency.markup = createCurrencyDTO.markup;
        await currency.save();
        return currency;
    }


}