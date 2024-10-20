// src/src/font/utils/FontFinder.ts

import type { IFontFinder } from "./types";
import fs from 'fs';
import path from 'path';

export class FontFinder implements IFontFinder {

    constructor() {

    }

    /**
     * Función recursiva para obtener todos los archivos de una carpeta y sus subcarpetas
     * @param dir Ruta de la carpeta
     * @returns Lista de rutas de archivos
     */
    public static getAllFilesInFolder(dir: string): string[] {
        let filesInFolder: string[] = [];
    
        try {
            const files = fs.readdirSync(dir); // Leer archivos/directorios en la carpeta
    
            for (const file of files) {
                const fullPath = path.join(dir, file);
                const fileStat = fs.lstatSync(fullPath); // Obtener información del archivo
    
                if (fileStat.isDirectory()) {
                    // Si es un directorio, llama recursivamente para obtener sus archivos
                    const subFiles = this.getAllFilesInFolder(fullPath);
                    filesInFolder = filesInFolder.concat(subFiles);
                } else {
                    // Si es un archivo, lo añadimos a la lista
                    filesInFolder.push(fullPath);
                }
            }
        } catch (error) {
            console.error(`Error al leer la carpeta ${dir}:`, error);
            // Puedes decidir si deseas lanzar un error o simplemente continuar
        }
    
        return filesInFolder;
    }
    
}