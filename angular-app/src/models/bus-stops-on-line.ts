import { Guid } from "guid-typescript";
import { BusStop } from './bus-stop';
import { Line } from './line';

export class BusStopsOnLine {
    public id: Guid;
    public busStopId: Guid;
    public busStop: BusStop;
    public lineId: Guid;
    public line: Line;
}