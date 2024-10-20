// src/font/utils/types.ts

import type { FontPath } from "./FontPath";

export interface IFontPath {
    folderBackspace( levels: number, filePath?: string ): string;
    publicPath(): string;
    fontLoaderPath(): string;
    generalTempPath(): string;
    fontsTempPath(): string;
    finalPublicFontPath(): string;
    data: IFontPathData;
    projectDir: string;
}

export interface IFontPathData {
    projectDir: string;
}
export interface IFontTemp {
    removeAllTemp(path?: string): void
    removeAllFontTemp(path?: string): void;
}

export interface IFontTempData extends IFontPath {

} 

export interface IFontFinder {

}

export interface IFontFinderData {

}