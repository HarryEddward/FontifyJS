import type { IFontOrganize, IFontOrganizeData } from './types'
import fs from 'fs';
import path from 'path'
import ora from 'ora';
import { FontPath } from './utils/FontPath.js';
import { FontFinder } from './utils/FontFinder.js';
import { FontTemp } from './utils/FontTemp.js';

export class FontOrganize implements IFontOrganize {

    public data: IFontOrganizeData;
    public pathResolve: FontPath;
    //public arrayFontFiles: string[];
    public typesExtFont: string[] = ['.ttf', '.otf', '.woff'];

    private static logger = class {
        static moveAllFiles(): void {
          //console.log('Moving files...');
        }
    }

    constructor(data: IFontOrganizeData) {
        logger.start()
        this.data = data;
        this.pathResolve = new FontPath({ projectDir: data.projectDir });
        this.moveOptimizedFontsToPublic();

        const useTemp = new FontTemp(data);
        useTemp.removeAllTemp();
        useTemp.removeAllFontTemp();
        useTemp.removeAllFontOptimizedTemp();
        
        logger.succeed("Organized Fonts 📂");
        logger.stop();
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
           //console.log(`Moved file: ${file} -> ${targetPath}`);
       }
   
       //console.log('Todos los archivos y carpetas fueron movidos exitosamente.');
   }

    public moveOptimizedFontsToPublic(): void {
        try {
            FontOrganize.logger.moveAllFiles()
            this.moveAllFiles(this.pathResolve.optimizedFontsTempPath(), path.join(this.pathResolve.finalPublicFontPath()));
        } catch (e) {
            console.error(e);
        }
    }
    
}

const logger = ora(" 📂 Organize Fonts...");