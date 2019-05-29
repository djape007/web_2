import { Guid } from "guid-typescript";
import { User } from './user';

export class SoldTicket {
    public id: Guid;
    public type: string;
    public userId: Guid;
    public user: User;
    public expires: Date;
    public usages: number;
    public price: number;
    public dateOfPurchase: Date;
}