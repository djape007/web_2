import { Guid } from "guid-typescript";
import { PriceHistory } from './price-history';

export class Pricelist {
    public id: Guid;
    public from: Date;
    public to: Date;
    public priceHistories: Array<PriceHistory> = new Array();
}