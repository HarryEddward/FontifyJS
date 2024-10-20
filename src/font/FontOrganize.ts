import type { IFontOrganize, IFontOrganizeData } from './types.ts'
import fs from 'fs';
import path from 'path'
import { FontPath } from './utils/FontPath.ts';
import { FontFinder } from './utils/FontFinder.ts';
import { FontTemp } from './utils/FontTemp.ts';

export class FontOrganize implements IFontOrganize {

    public data: IFontOrganizeData;
    public pathResolve: FontPath;
    //public arrayFontFiles: string[];
    public typesExtFont: string[] = ['.ttf', '.otf'];

    constructor(data: IFontOrganizeData) {
        this.data = data;
        this.pathResolve = new FontPath({ projectDir: data.projectDir });
        this.moveOptimizedFontsToPublic();

        const useTemp = new FontTemp(data);
        useTemp.removeAllTemp();
        useTemp.removeAllFontTemp();
        useTemp.removeAllFontOptimizedTemp();
    }

    /**
    * Función para mover todos los archivos listados por FontFinder a un directorio destino.
    * Usa la lógica recursiva de FontFinder para encontrar todos los archivos y luego los mueve.
    */
   private moveAllFiles(sourceDir: string, targetDir: string): void {
       // Asegúrate de que el directorio de destino existe
       if (!fs.existsSync(targetDir)) {
           fs.mkdirSync(targetDir, { recursive: true });
       }
       // Obtener todos los archivos en el directorio fuente (incluyendo subdirectorios)
       const filesToMove = FontFinder.getAllFilesInFolder(sourceDir);
   
       for (const file of filesToMove) {
           const relativePath = path.relative(sourceDir, file); // Obtener la ruta relativa del archivo
           const targetPath = path.join(targetDir, relativePath); // Ruta destino
           
           // Crear los directorios necesarios en el destino
           const targetFolder = path.dirname(targetPath);
           if (!fs.existsSync(targetFolder)) {
               fs.mkdirSync(targetFolder, { recursive: true });
           }
   
           // Mover el archivo
           fs.renameSync(file, targetPath);
           console.log(`Moved file: ${file} -> ${targetPath}`);
       }
   
       console.log('Todos los archivos y carpetas fueron movidos exitosamente.');
   }

    public moveOptimizedFontsToPublic(): void {
        try {  
            this.moveAllFiles(this.pathResolve.optimizedFontsTempPath(), path.join(this.pathResolve.finalPublicFontPath()));
        } catch (e) {

        }
    }

    
}