// src/font/index.ts

import type { IFontify, IFontifyData } from '../type';
import { FontAnalyze } from './FontAnalyze.js';
import { FontExtract } from './FontExtract.js';
import { FontOptimize } from './FontOptimize.js';
import { FontOrganize } from './FontOrganize.js';
import type { IFontInitData, IFontExtractData, IFont, IFontData } from "./types";
import { FontPath } from './utils/FontPath.js';

export class Font implements IFont {

    constructor(data: InitialData) {
        const analyzer = new FontAnalyze(data);
        const pathResolve = new FontPath({ projectDir: analyzer.folderWorkPath });
        new FontExtract({ arrayFilesNamesPath: analyzer.arrayFilesNames, workPath: pathResolve.projectDir });
        new FontOptimize({ projectDir: pathResolve.projectDir });
        new FontOrganize({ projectDir: pathResolve.projectDir });
    }
};