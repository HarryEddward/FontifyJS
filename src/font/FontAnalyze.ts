// src/font/FontAnalyze.ts
import { FontInit } from './FontInit';
import type { IFontAnalyze, IFontData } from './types';

import fs from 'fs';
import path from 'path';

export class FontAnalyze<T extends IFontData> extends FontInit implements IFontAnalyze {
    constructor(data: IFontData) {
        super(data);
        this.analyzeZipFiles(); // Ejecuta el análisis al instanciar
    };

    public analyzeZipFiles(): void {
        try {
            const directory = this.folderWorkPath || this.nameReactProject;

            if (!directory) {
                throw new Error('No se ha especificado un directorio válido.');
            }

            this.checkAllFilesAreZip(directory);

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
