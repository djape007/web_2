import { Guid } from "guid-typescript";

export class Bus {
    id: Guid;
    x: number;
    y: number;

    constructor() {
        this.id = Guid.create(); // ==> b77d409a-10cd-4a47-8e94-b0cd0ab50aa1
    }
}