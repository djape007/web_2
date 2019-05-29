import { Guid } from "guid-typescript";
import { Line } from './line';

export class Bus {
    public Id: Guid;
    public Times: string;
    public ValidFrom: Date;
    public LineId: Guid;
    public Line: Line;
}