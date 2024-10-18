// src/index.ts
export { FontAnalyze } from "./font/index.ts";
export { FontExtract } from "./font/index.ts";
export { FontOptimize } from "./font/index.ts";

import { FontOrganize } from "./font/FontOrganize.ts";
import { FontAnalyze } from "./font/index.ts";
import { FontExtract } from "./font/index.ts";
import { FontOptimize } from "./font/index.ts";
import type { IFontData, IFontExtractData } from "./font/types.ts";


export const FontifyJS = (data: IFontData): void => {
    const analyzer = new FontAnalyze<IFontData>(data);
    const filesPaths: string[] = analyzer.arrayFilesNames;
    const pathWork: string = analyzer.folderWorkPath;
    
    const extract = new FontExtract<IFontExtractData>({ arrayFilesNames: filesPaths, workPath: pathWork });
    const publicPath: string = extract.publicPath;
    
    new FontOrganize({ publicPath: publicPath, loaderFontsPath: pathWork });
};