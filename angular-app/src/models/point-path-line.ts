import { Guid } from "guid-typescript";
import { Line } from './line';

export class PointPathLine {
    public id: Guid;
    public x: number;
    public y: number;
    public SequenceNumber: number;
    public lineId: Guid;
    public line: Line;
}