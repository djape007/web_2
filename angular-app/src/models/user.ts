import { Guid } from "guid-typescript";
import { SoldTicket } from './sold-ticket';

export class User {
    public id: Guid;
    public role: string;
    public status: string;
    public type: string;
    public password: string;
    public email: string;
    public name: string;
    public surname: string;
    public dateOfBirth: Date;
    public hasDocument: boolean;
    public address: string;
    public files: string;
    public soldTickets: Array<SoldTicket> = new Array();
}