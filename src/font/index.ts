// src/font/index.ts

export { FontAnalyze } from "./FontAnalyze";
export { FontExtract } from "./FontExtract";
export { FontOptimize } from "./FontOptimize";

import type { IFontify, IFontifyData } from '../type.ts';

import { FontOrganize } from "./FontOrganize.ts";
import { FontAnalyze } from "./index.ts";
import { FontExtract } from "./index.ts";
import { FontOptimize } from "./index.ts";
import { FontPath } from './utils/FontPath.ts';

import type { IFontInitData, IFontExtractData, IFont, IFontData } from "./types.ts";

export class Font implements IFont {

    constructor(data: InitialData) {
        const analyzer = new FontAnalyze(data);
        const pathResolve = new FontPath({ projectDir: analyzer.folderWorkPath });
        new FontExtract({ arrayFilesNamesPath: analyzer.arrayFilesNames, workPath: pathResolve.projectDir });
        new FontOptimize({ projectDir: pathResolve.projectDir });
        new FontOrganize({ projectDir: pathResolve.projectDir });
    }
};