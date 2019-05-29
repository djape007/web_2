import { Guid } from "guid-typescript";
import { PriceHistory } from './price-history';

export class ProductType {
    public id: Guid;
    public name: string;
    public priceHistories: Array<PriceHistory> = new Array();
}