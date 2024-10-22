// src/font/FontOptimize.ts

import type { IFontOptimize, IFontOptimizeData } from './types';
import { FontFinder } from './utils/FontFinder.js';
import path from 'path';
import fs from 'fs';
import { typesExtFont } from '../constants.js';
import { Font, woff2 } from 'fonteditor-core';
import pako from 'pako';
import { FontPath } from './utils/FontPath.js';
import ora, { type Ora } from 'ora';

export class FontOptimize implements IFontOptimize {
    public data: IFontOptimizeData;
    public pathResolve: FontPath;
    public typesExtFont: string[] = typesExtFont;

    // Constructor modificado, ahora privado
    private constructor(data: IFontOptimizeData) {
        
        this.data = data;
        this.pathResolve = new FontPath({ projectDir: data.projectDir });
        this.renameCompatibleNameFiles();
    }

    // Método estático para crear instancias
    public static async create(data: IFontOptimizeData): Promise<FontOptimize> {
        
        logger.start();
        const instance = new FontOptimize(data);
        await instance.optimizeFontsToWoff2();
        logger.succeed('Optimized Fonts 🔄');
        logger.stop();
        
        return instance;

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
            //console.log('->', optimizedNameFontFilePath);

            fs.renameSync(pathFont, optimizedNameFontFilePath);
        });
    }

    public async optimizeFontsToWoff2(): Promise<void> {
        try {
            const fontsPaths = FontFinder.getAllFilesInFolder(this.pathResolve.fontsTempPath());
            fs.mkdirSync(this.pathResolve.optimizedFontsTempPath(), { recursive: true });
            //console.log(fontsPaths);

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

                fs.mkdirSync(pathFontFolderOptimize, { recursive: true });

                if (this.typesExtFont.includes(extname)) {
                    await this.convertToWoff2(fontPath, outputPath);
                    //logger.text = `Optimized: [ ${path.basename(fontPath, extname)} ]`;
                }
            }
            
        } catch (e) {
            console.error(e);
        }
    }

    public getFontType(filePath: string): AllowedFontExt {
        const ext = path.extname(filePath).toLowerCase();
        switch (ext) {
            case '.ttf':
                return 'ttf';
            case '.otf':
                return 'otf';
            case '.woff':
                return 'woff';
            default:
                logger.fail(`Optimize Fonts Failed: File format not supported. Use TTF, OTF or WOFF`);
                throw new Error('File format not supported. Use TTF, OTF or WOFF');
        }
    }

    public async convertToWoff2(inputPath: string, outputPath: string): Promise<void> {
        try {
            await woff2.init();
            const fontBuffer = fs.readFileSync(inputPath);
            const fontType = this.getFontType(inputPath);
            
            let woff2Buffer: any;

            if (fontType !== 'woff') {
                const font = Font.create(fontBuffer, {
                    type: fontType,
                });
                woff2Buffer = font.write({
                    type: 'woff2',
                    deflate: (rawData: number[]) => {
                        const compressed = pako.deflate(new Uint8Array(rawData));
                        return Array.from(compressed);
                    },
                });
            } else {
                woff2Buffer = woff2.encode(fontBuffer);
            }

            fs.writeFileSync(outputPath, woff2Buffer);
        } catch (e) {
            logger.fail(`Optimize Fonts Failed: ${e}`);  
        }
    }
}

const logger = ora(" 🔄 Optimize Fonts...");