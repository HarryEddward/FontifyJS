// src/font/FontExtract.ts

import { FontInit } from './FontInit';
import type { IFontExtract, IFontData, IFontExtractData } from './types';
import {join, dirname} from 'path';
import fs from 'fs';
import AdmZip from 'adm-zip';

/**
 * In this class we do not use the main parent (FontInit), in this case is for extract all
 * of zip files. When you are using FontInit is only for initialize the all class without
 * a manual configuration.
 */
export class FontExtract<T extends IFontExtractData = IFontExtractData> implements IFontExtract {

    public arrayFilesNames: string[] = [];
    public workPath: string;
    public publicPath: string;

    constructor(data: IFontExtractData) {
        this.arrayFilesNames = data.arrayFilesNames;
        this.workPath = data.workPath;
        this.publicPath = this.pathChangeToTemp(this.workPath);
        this.extractPackagesZip(this.arrayFilesNames);
    }

    public pathChangeToTemp(path: string): string {
        // Retrocede un nivel en el path y entra a 'public'
        return join(dirname(path), 'public');
    }

    public extractPackagesZip(filesPaths: string[]): void {
        // Asegúrate de que el directorio 'public' existe
        if (!fs.existsSync(this.publicPath)) {
            fs.mkdirSync(this.publicPath, { recursive: true });
        }

        filesPaths.forEach(filePath => {
            const zip = new AdmZip(filePath);
            zip.extractAllTo(this.publicPath, true); // Extrae en 'publicPath'
            //console.log(`Descomprimido: ${filePath} en ${this.publicPath}`);
        });
    }

    public listPathFontFiles(): void {
        
    }

}
