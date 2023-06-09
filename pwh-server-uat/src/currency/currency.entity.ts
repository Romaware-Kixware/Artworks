import {BaseEntity, Column, Entity, PrimaryColumn} from "typeorm";

@Entity({name: 'currency_cad'})
export class Currency extends BaseEntity {
    @PrimaryColumn({name: 'creation_date', unique: true, type: 'date'})
    creationDate: string;

    @Column()
    markup: number;

    @Column()
    eur: number;

    @Column()
    usd: number;

    @Column()
    gbp: number;
}
