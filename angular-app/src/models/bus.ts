import { Guid } from "guid-typescript";
import { Line } from './line';

export class Bus {
    public id: string;
    public x: number;
    public y: number;
    public lineId: Guid;
    public line: Line;
    //this.id = Guid.create();
}