import {windowTypes} from "./enums.ts";

interface windowData {
    id: number,
    type: windowTypes,
    position: {x: number, y: number},
    size: {width: number, height: number},
    index: number,
    reportIndex?: number
}

export type { windowData };