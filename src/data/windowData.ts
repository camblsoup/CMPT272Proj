import {windowTypes} from "./enums.ts";

interface windowData {
    windowType: windowTypes;
    xpos: number;
    ypos: number;
    width: number;
    height: number;
    report: number;
    isActive: boolean;
}

export type {windowData};