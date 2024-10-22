// src/font/index.ts

import type { IFontify, IFontifyData } from '../type';
import { FontAnalyze } from './FontAnalyze.js';
import { FontExtract } from './FontExtract.js';
import { FontOptimize } from './FontOptimize.js';
import { FontOrganize } from './FontOrganize.js';
import type { IFontInitData, IFontExtractData, IFont, IFontData } from "./types";
import { FontPath } from './utils/FontPath.js';

export class Font implements IFont {
    
    public data: InitialData;
    public analyzer: FontAnalyze;
    public pathResolve: FontPath;

    private constructor(data: InitialData) {
        this.data = data;

        this.analyzer = new FontAnalyze(data);
        this.pathResolve = new FontPath({ projectDir: this.analyzer.folderWorkPath });
    }

    public async asyncFontOptimizer(): Promise<void> {
        //console.log("projectDir: ", this.pathResolve)
        await FontOptimize.create({ projectDir: this.pathResolve.projectDir });
    }

    public static async create(data: InitialData): Promise<Font> {
        const instance = new Font(data);

        new FontExtract({ arrayFilesNamesPath: instance.analyzer.arrayFilesNames, workPath: instance.pathResolve.projectDir });
        await instance.asyncFontOptimizer();
        new FontOrganize({ projectDir: instance.pathResolve.projectDir });
        
        return instance;
    }
}