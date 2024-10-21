// src/font/utils/FontTemp.ts


import { FontPath } from "./FontPath.js";
import type { IFontTemp, IFontPathData } from "./types";
import fs from 'fs'; // Asegúrate de importar fs/promises

export class FontTemp implements IFontTemp {

    public pathResolve: FontPath;

    constructor(data: IFontPathData) {
        this.pathResolve = new FontPath({ projectDir: data.projectDir });
    }

    public removeAllTemp(pathTemp: string = this.pathResolve.generalTempPath()): void {
        console.log('Removing: ', pathTemp);
        try {
            // Elimina la carpeta de manera recursiva
            fs.rmSync(pathTemp, { recursive: true });
            //console.log(`Carpeta eliminada: ${pathTemp}`);
        } catch (error: any) {
            // Ignora todos los errores, incluidos los que no son 'ENOENT'
        }
    }

    public removeAllFontTemp(pathTemp: string = this.pathResolve.fontsTempPath()): void {
        console.log('Removing: ', pathTemp);
        try {
            // Elimina la carpeta de manera recursiva
            fs.rmSync(pathTemp, { recursive: true });
            //console.log(`Carpeta eliminada: ${pathTemp}`);
        } catch (error: any) {
            // Ignora todos los errores, incluidos los que no son 'ENOENT'
        }
    }

    public removeAllFontOptimizedTemp(pathTemp: string = this.pathResolve.optimizedFontsTempPath()): void {
        console.log('Removing: ', pathTemp);
        try {
            // Elimina la carpeta de manera recursiva
            fs.rmSync(pathTemp, { recursive: true });
            //console.log(`Carpeta eliminada: ${pathTemp}`);
        } catch (error: any) {
            // Ignora todos los errores, incluidos los que no son 'ENOENT'
        }
    }
}
