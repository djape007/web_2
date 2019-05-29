import { Guid } from "guid-typescript";
import { Bus } from './bus';
import { BusStopsOnLine } from './bus-stops-on-line';
import { PointPathLine } from './point-path-line';

export class Line {
    public id: Guid;
    public lineCode: string;
    public directionA: string;
    public directionB: string;
    public buses: Array<Bus> = new Array();
    public busStopsOnLines: Array<BusStopsOnLine> = new Array();
    public pointLinePaths: Array<PointPathLine> = new Array();
}