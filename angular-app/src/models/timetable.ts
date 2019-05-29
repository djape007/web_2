import { Guid } from "guid-typescript";
import { Line } from './line';

export class Bus {
    public id: Guid;
    public timesDirectionA: string;
    public timesDirectionB: string;
    public validFrom: Date;
    public lineId: Guid;
    public line: Line;
}