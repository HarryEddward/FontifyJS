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
    pathChangeToTemp(path: string): string;
    listPathFontFiles(path: string): void;
}

export interface IFontExtractData {
    arrayFilesNames: string[];
    workPath: string;
};

export interface IFontOrganize {
    data: IFontOrganizeData;
    publicPath: string;
    loaderFontsPath: string;
    arrayFontFiles: string[];
    typesExtFont: string[];
    obtainFontFilesPath(publicPath: string): string[];
    organizeFontFiles(pathFontFiles: string, arrayFontFiles: string[]): void;
}

export interface IFontOrganizeData {
    publicPath: string;
    loaderFontsPath: string;
}

export interface IFontOptimize {
}
