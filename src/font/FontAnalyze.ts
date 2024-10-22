// src/font/FontAnalyze.ts
import ora from 'ora';
import { FontInit } from './FontInit.js';
import type { IFontAnalyze, IFontInitData } from './types';

import fs from 'fs';
import path from 'path';

export class FontAnalyze extends FontInit implements IFontAnalyze {
    
    

    constructor(data: IFontInitData) {
        logger.start();
        super(data);
        this.analyzeZipFiles(); // Ejecuta el análisis al instanciar
        logger.succeed("Files Analyzed 🔍");
        logger.stop();
    };

    public analyzeZipFiles(): void {
        try {
            const fontLoaderPath = path.join(this.folderWorkPath, 'fontLoader');

            if (!this.folderWorkPath) {
                throw new Error('No se ha especificado un directorio válido.');
            }

            const res = this.checkAllFilesAreZip(fontLoaderPath);
            //console.log(res);

        } catch (error: any) {
            throw new Error(`Error while analyzing zip files: ${error.message}`);
        }
    }

    public checkAllFilesAreZip(directoryPath: string): void {
        try {
            const filesAndDirs = fs.readdirSync(directoryPath, { withFileTypes: true }); // Síncrono

            for (const fileOrDir of filesAndDirs) {
                const fullPath = path.join(directoryPath, fileOrDir.name);
                const stats = fs.statSync(fullPath); // Síncrono

                if (stats.isDirectory()) {
                    // Si es un directorio, llamamos a esta función recursivamente
                    this.checkAllFilesAreZip(fullPath);
                } else {
                    // Si es un archivo, verificamos si tiene la extensión .zip
                    if (path.extname(fullPath).toLowerCase() !== '.zip') {
                        throw new Error(`El archivo ${fullPath} no es un archivo ZIP.`);
                    }
                    else if (path.extname(fullPath).toLowerCase() == '.zip') {
                        this.arrayFilesNames.push(fullPath);
                    }
                }
            }
        } catch (error: any) {
            throw new Error(`Error al comprobar los archivos en ${directoryPath}: ${error.message}`);
        }
    }
}

const logger = ora(" 🔍 Analyzing if are other files than zip files...");