// src/css/types.ts

import type { FontifyPath } from "../utils/FontifyPath";

export interface ICss {

}

export interface ICssData {

}

export interface ICssInit {

}

export interface ICssInitData {
    
}

export interface ICssFile {
    pathResolve: FontifyPath;
    makeCssFile(fileName?: string): void;
}