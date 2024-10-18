// src/font/types.ts

export interface IFontInit {
    typesExtFont: string[];
    arrayFilesNames: string[];
    initializeVars: () => void;
    folderWorkPath: string;
    nameReactProject: string | undefined;
}

export type IFontData = 
    | { nameReactProject: string; folderWorkPath?: undefined; }
    | { nameReactProject?: undefined; folderWorkPath: string; }

export interface IFontAnalyze {
    analyzeZipFiles(): void;
    checkAllFilesAreZip(directoryPath: string): void;
}

export interface IFontExtract {
    arrayFilesNames: string[];
    extractPackagesZip(filesPaths: string[]): void;
    pathChangeToPublic(path: string): string;
    listPathFontFiles(path: string): void;
}

export interface IFontExtractData {
    arrayFilesNames: string[];
    workPath: string;
};

export interface IFontOrganize {
    organizeFontFiles(pathFontFiles: string[]): void;
}

export interface IFontOrganizeData {
    publicPath: string;
    loaderFontsPath: string;
}

export interface IFontOptimize {
}
