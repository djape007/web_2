import { Guid } from "guid-typescript";
import { Pricelist } from './pricelist';
import { ProductType } from './product-type';

export class PriceHistory {
    public id: Guid;
    public pricelistId: Guid;
    public pricelist: Pricelist;
    public productTypeId: Guid;
    public productType: ProductType;
    public price: number;
}