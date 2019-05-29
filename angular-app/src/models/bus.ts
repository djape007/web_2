import { Guid } from "guid-typescript";
import { Line } from './line';

export class Bus {
    public Id: string;
    public X: number;
    public Y: number;
    public LineId: Guid;
    public Line: Line;
    //this.id = Guid.create();
}