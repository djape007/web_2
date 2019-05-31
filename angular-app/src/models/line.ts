import { Guid } from "guid-typescript";
import { Bus } from './bus';
import { BusStopsOnLine } from './bus-stops-on-line';
import { PointPathLine } from './point-path-line';

export class Line {
    public Id: Guid;
    public LineCode: string;
    public Direction: string;
    public Buses: Array<Bus> = new Array();
    public BusStopsOnLines: Array<BusStopsOnLine> = new Array();
    public BointLinePaths: Array<PointPathLine> = new Array();
    public DisplayName: string;
}

