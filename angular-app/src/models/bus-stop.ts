import { Guid } from "guid-typescript";
import { BusStopsOnLine } from './bus-stops-on-line';

export class BusStop {
    public id: Guid;
    public x: number;
    public y: number;
    public name: string;
    public address: string;
    public busStopsOnLines: Array<BusStopsOnLine> = new Array();
}