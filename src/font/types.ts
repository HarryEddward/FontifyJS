// src/font/types.ts

import { FontPath } from "./utils/FontPath.js";
import type { FontTemp } from "./utils/FontTemp.js";
import type { IFontPath, IFontPathData } from "./utils/types";

export interface IFont {

}

export interface IFontData {

}

export interface IFontInit {
    typesExtFont: string[];
    arrayFilesNames: string[];
    initializeVars: () => void;
    folderWorkPath: string;
    projectDir: string | undefined;
}

export type IFontInitData = 
    | { projectDir: string; folderWorkPath?: undefined; }
    | { projectDir?: undefined; folderWorkPath: string; }

export interface IFontAnalyze {
    analyzeZipFiles(): void;
    checkAllFilesAreZip(directoryPath: string): void;
}

export interface IFontExtract {
    arrayFilesNamesPath: string[];
    workPath: string;
    pathResolve: FontPath;
    arrayFontsNameFolder: string[];
    typesExtFont: string[];
    fontFilesPath: { [key: string]: string[] };

    extractPackagesZip(filesPaths: string[]): void;
    findFontFiles(folderPath: string, nameFolder: string): void;
    organizeFontsTemp(arrayNameFolderFontsTemp: string[]): void;
}

export interface IFontExtractData {
    arrayFilesNamesPath: string[];
    workPath: string;
};

export interface IFontOrganize {
    data: IFontOrganizeData;
    typesExtFont: string[];
    moveOptimizedFontsToPublic(): void;
}

export interface IFontOrganizeData extends IFontPathData {

}

export interface IFontOptimize {
    data: IFontOptimizeData;  // Datos de configuración para la optimización de fuentes
    pathResolve: FontPath;    // Instancia para resolver rutas del proyecto
    typesExtFont: string[];   // Tipos de extensiones de fuentes soportadas

    /**
     * Método para renombrar archivos de fuentes, garantizando compatibilidad.
     * Renombra los archivos usando caracteres en minúsculas y reemplazando espacios por guiones bajos.
     */
    renameCompatibleNameFiles(): void;

    /**
     * Método para convertir archivos de fuentes TTF a WOFF2.
     * Procesa los archivos de manera asíncrona, creando las versiones optimizadas de las fuentes.
     */
    optimizeFontsToWoff2(): void;
}

export interface IFontOptimizeData extends IFontPathData {
    
}