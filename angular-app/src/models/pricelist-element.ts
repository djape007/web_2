import { Guid } from 'guid-typescript';

export class PricelistElement {
    public pricelist: string;
    public person: string;
    public price: number;
    public id: number;
    public productTypeId: Guid;
}