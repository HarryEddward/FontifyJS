// src/font/FontOptimize.ts

import type { IFontOptimize, IFontOptimizeData } from './types';
import { FontFinder } from './utils/FontFinder.js';
import path from 'path';
import fs from 'fs';
import fsp from 'fs/promises';
import { typesExtFont } from '../contants.js';
import ttf2woff2 from 'ttf2woff2'; // Importar ttf2woff2
import { FontPath } from './utils/FontPath.js';

export class FontOptimize implements IFontOptimize {

    public data: IFontOptimizeData;
    public pathResolve: FontPath;
    public typesExtFont: string[] = ['.ttf'];

    constructor(data: IFontOptimizeData) {
        this.data = data;
        this.pathResolve = new FontPath({ projectDir: data.projectDir });
        this.renameCompatibleNameFiles();
        this.optimizeFontsToWoff2();
    }

    public renameCompatibleNameFiles(): void {
        const pathFontsLoader = FontFinder.getAllFilesInFolder(this.pathResolve.fontsTempPath());
        pathFontsLoader.forEach((pathFont: string) => {
            const nameFontFile = path.basename(pathFont, path.extname(pathFont));
            const nameFontFileProccesed = nameFontFile
                .toLowerCase()
                .replace(/\s+/g, '_')
                .replace(/[^a-z0-9_]/g, '_');

            const optimizedNameFontFile = (nameFontFileProccesed + path.extname(pathFont));
            const optimizedNameFontFilePath = path.join(path.dirname(pathFont), optimizedNameFontFile);
            console.log('->', optimizedNameFontFilePath);

            fs.renameSync(pathFont, optimizedNameFontFilePath);
        });
    }

    public optimizeFontsToWoff2(): void {
        //console.log('begin');
        const fontsPaths = FontFinder.getAllFilesInFolder(this.pathResolve.fontsTempPath());
        
        // Crear la carpeta de salida de forma sincrónica
        fs.mkdirSync(this.pathResolve.optimizedFontsTempPath(), { recursive: true });
        console.log(fontsPaths);
    
        // Procesar cada archivo de forma sincrónica
        for (const fontPath of fontsPaths) {
            const extname = path.extname(fontPath).toLowerCase();
            const outputPath = path.join(
                this.pathResolve.optimizedFontsTempPath(),
                path.basename(path.dirname(fontPath)),
                path.basename(fontPath, extname) + '.woff2'
            );
            const pathFontFolderOptimize = path.join(
                this.pathResolve.optimizedFontsTempPath(),
                path.basename(path.dirname(fontPath))
            );
    
            // Crear la carpeta de salida para la fuente optimizada de forma sincrónica
            fs.mkdirSync(pathFontFolderOptimize, { recursive: true });
    
            if (this.typesExtFont.includes(extname)) {
                try {
                    // Leer el archivo de forma sincrónica
                    const fontData = fs.readFileSync(fontPath);
    
                    // Convertir solo TTF a WOFF2
                    if (extname === '.ttf') {
                        const woff2Data: any = ttf2woff2(fontData); // Convertir TTF a WOFF2
                        fs.writeFileSync(outputPath, woff2Data);
                        console.log(`Optimized: [ ${path.basename(fontPath, extname)} ]`);
                    } else {
                        console.warn(`No conversion available for ${extname}`);
                    }
                } catch (error) {
                    console.error(`Error converting ${fontPath}: ${error}`);
                }
            }
        }
    
        console.log('Finished converting fonts.');
    }

}
