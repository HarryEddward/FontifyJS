// src/font/utils/FontPath.ts

import type { ICssPath, ICssPathData } from "./types";
import path from 'path';

/**
 * @deprecated We can use FontifyPath to to access to the global paths to avoid the duplicate functions arounf the project.
 */
export class CssPath implements ICssPath {

    public data: ICssPathData;
    public projectDir: string;

    constructor (data: ICssPathData) {
        this.data = data;
        this.projectDir = data.projectDir;
    }

    private backFolder(): string {
        return path.dirname(this.projectDir);
    }

    public folderBackspace<N extends number>(levels: Uint<N>, filePath: string = this.projectDir): string {
        // Verificamos que 'niveles' sea un número entero y mayor o igual a cero
        if (!Number.isInteger(levels) || levels < 0) {
            throw new Error("The levels must be a positive number can not take reverse path, is imposible!");
        }

        // Partimos el path en segmentos usando path.sep
        const segmentos = filePath.split(path.sep);

        // Retrocedemos la cantidad de niveles especificada
        const nuevosSegmentos = segmentos.slice(0, -levels || 1); // Usamos slice para cortar el array de segmentos.

        // Unimos los segmentos de nuevo en un path usando path.join
        return path.join(...nuevosSegmentos);
    }

    public publicPath(): string {
        return path.join(this.projectDir, "public");
    }

    public fontLoaderPath(): string {
        return path.join(this.projectDir, "fontLoader");
    }

    public generalTempPath(): string {
        return path.join(this.projectDir, ".tmp.fontify");
    }

    public fontsTempPath(): string {
        return path.join(this.projectDir, ".tmp.fontify.fonts");
    }

    public optimizedFontsTempPath(): string {
        return path.join(this.projectDir, ".tmp.fontify.fonts.optimized");
    }

    public finalPublicFontPath(): string {
        return path.join(this.projectDir, "public", "fonts", "fontify");
    }


};