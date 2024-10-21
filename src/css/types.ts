// src/css/types.ts

import type { FontifyPath } from "../utils/FontifyPath";

export interface ICss {

}

export interface ICssData {

}

export interface ICssInit {
    typesExtFont: string[];
    arrayFilesNames: string[];
    folderWorkPath: string;
    projectDir: string | undefined;
    initializeVars(): void;
}

export interface ICssInitData {
    
}

export interface ICssFile {
    pathResolve: FontifyPath;
    makeCssFile(fileName?: string): void;
    headerCssFile(): string;
}