import type { IFontOrganize, IFontOrganizeData } from './types.ts'
import fs from 'fs';
import path from 'path'

export class FontOrganize implements IFontOrganize {

    public data: IFontOrganizeData;
    public publicPath: string;
    public loaderFontsPath: string;
    public arrayFontFiles: string[];
    public typesExtFont: string[] = ['.ttf', '.otf'];

    constructor(data: IFontOrganizeData) {
        this.data = data;
        this.publicPath = data.publicPath;
        this.loaderFontsPath = data.loaderFontsPath;

        this.arrayFontFiles = this.obtainFontFilesPath(this.publicPath);
        console.log(this.arrayFontFiles);
        this.organizeFontFiles(this.loaderFontsPath, this.arrayFontFiles);
    }

    /**
     * Obtiene todos los archivos de fuentes con las extensiones especificadas en un directorio y sus subdirectorios.
     * @param dirPath El path del directorio donde buscar archivos.
     * @returns Un array con las rutas de los archivos de fuentes.
     */
    public obtainFontFilesPath(dirPath: string): string[] {
        const fontFiles: string[] = [];

        // Lee todos los archivos y subdirectorios en el directorio
        const filesAndDirs = fs.readdirSync(dirPath);

        filesAndDirs.forEach(fileOrDir => {
            const fullPath = path.join(dirPath, fileOrDir);
            const stat = fs.statSync(fullPath);

            // Si es un directorio, buscar recursivamente
            if (stat.isDirectory()) {
                const subDirFiles = this.obtainFontFilesPath(fullPath);
                fontFiles.push(...subDirFiles); // Agrega los archivos encontrados en el subdirectorio
            } else {
                // Si es un archivo, verificar la extensión
                const ext = path.extname(fileOrDir).toLowerCase(); // Obtiene la extensión del archivo
                if (this.typesExtFont.includes(ext)) {
                    fontFiles.push(fullPath); // Guarda la ruta completa del archivo
                }
            }
        });

        return fontFiles;
    }

    public organizeFontFiles(pathFontFiles: string, arrayFontFiles: string[]): void {
        const temporalDir: string = path.join(path.dirname(pathFontFiles), ".temp.fontify.fonts");
        
        // Crear un directorio temporal si no existe
        if (!fs.existsSync(temporalDir)) {
            fs.mkdirSync(temporalDir, { recursive: true });
        }
    }
}