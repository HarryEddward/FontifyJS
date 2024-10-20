// src/font/FontExtract.ts

import { FontInit } from './FontInit';
import type { IFontExtract, IFontInitData, IFontExtractData } from './types';
import path from 'path';
import fs from 'fs'; // Usamos fs en lugar de fs/promises para manejar operaciones sincrónicas
import AdmZip from 'adm-zip';
import { FontPath } from './utils';
import { FontFinder } from './utils/FontFinder';
import { typesExtFont } from '../contants';

/**
 * In this class we do not use the main parent (FontInit), in this case is for extract all
 * of zip files. When you are using FontInit is only for initialize the all class without
 * a manual configuration.
 */
export class FontExtract<T extends IFontExtractData = IFontExtractData> implements IFontExtract {


    /**
     * 
     * ORGANIZAR IMPROTANTE LOS NOMBRES DE LAS VARIABLES Y SUS FUNCIONES PRINCIPALES
     */
    public arrayFilesNamesPath: string[] = [];
    public workPath: string;
    public pathResolve: FontPath;
    public arrayFontsNameFolder: string[] = [];
    public typesExtFont: string[] = typesExtFont;
    public fontFilesPath: { [key: string]: string[] } = {};

    constructor(data: IFontExtractData) {
        this.arrayFilesNamesPath = data.arrayFilesNamesPath;
        this.workPath = data.workPath;

        this.pathResolve = new FontPath({ projectDir: this.workPath });
        //console.log('here!');
        // Cambiamos a llamadas sincrónicas en el constructor
        this.extractPackagesZip(this.arrayFilesNamesPath);
        this.organizeFontsTemp(this.arrayFontsNameFolder);
        //console.log('------------ here!');
        //console.log(this.fontFilesPath);
    }

    public extractPackagesZip(filesPaths: string[]): void {
        const generalTempPath = this.pathResolve.generalTempPath();
        const fontsTempPath = this.pathResolve.fontsTempPath();

        // Asegúrate de que el directorio 'public' existe
        try {
            fs.mkdirSync(generalTempPath, { recursive: true });
            console.log('generalTempPath: ', generalTempPath);
        } catch (error) {
            console.error(`Error al crear el directorio: ${error}`);
        }
        console.log('filesPaths: ', filesPaths)
        for (const filePath of filesPaths) {
            console.log('--here--', filesPaths);
            const zipFileName = path.parse(filePath).name
                .toLowerCase()
                .replace(/\s+/g, '_')
                .replace(/[^a-z0-9_]/g, '_');
            console.log(zipFileName);

            const zip = new AdmZip(filePath);
            zip.extractAllTo(path.join(generalTempPath, zipFileName), true);

            const customFontTempPathFolder: string = path.join(fontsTempPath, zipFileName);
            console.log(customFontTempPathFolder);

            try {
                fs.mkdirSync(customFontTempPathFolder, { recursive: true });
                console.log(zipFileName);
                this.arrayFontsNameFolder.push(zipFileName); // Añadir después de crear la carpeta
                //console.log(this.arrayZipFilesNames)
            } catch (error) {
                console.error(`Error al crear la carpeta: ${error}`);
            }
        }
    }

    /**
     * Función para buscar archivos de fuentes (.ttf, .otf) dentro de una carpeta y sus subcarpetas
     * @param folderPath Ruta de la carpeta donde buscar
     */
    public findFontFiles(folderPath: string, nameFolder: string): void {
        try {

            console.log(folderPath);
            // Llama a la función recursiva para obtener todos los archivos
            const files = FontFinder.getAllFilesInFolder(folderPath);

            // Filtra solo los archivos que tienen las extensiones de fuentes definidas
            const fontFiles = files.filter(file => this.typesExtFont.includes(path.extname(file).toLowerCase()));

            console.log(fontFiles);
            console.log(nameFolder);
            // Guarda los archivos de fuentes en la variable de clase
            this.fontFilesPath[nameFolder] = fontFiles;

            console.log('Archivos de fuentes encontrados:', this.fontFilesPath);
        } catch (error) {
            console.error('Error al buscar archivos de fuentes:', error);
        }
    }

    public organizeFontsTemp(arrayNameFolderFontsTemp: string[]): void {
        try {
            // Usamos un bucle for...of para evitar problemas al iterar
            console.log(arrayNameFolderFontsTemp)
            for (const nameFontFolder of arrayNameFolderFontsTemp) {
                const pathFontFolder = path.join(this.pathResolve.generalTempPath(), nameFontFolder);
                console.log('<-', pathFontFolder);
                this.findFontFiles(pathFontFolder, nameFontFolder);
                console.log('->', this.fontFilesPath);
            }
    
            
            Object.entries(this.fontFilesPath).forEach(([nameFolder, pathsFonts]) => {
                
                const targetFolderPath = path.join(this.pathResolve.fontsTempPath(), nameFolder);
                
                try {
                    fs.mkdirSync(targetFolderPath, { recursive: true });
                } catch (error) {
                    console.error(`Error al crear el directorio de destino ${targetFolderPath}:`, error);
                }
    
                for (const fontPath of pathsFonts) {
                    const fileName: string = path.basename(fontPath);
                    const targetPath: string = path.join(targetFolderPath, fileName);
    
                    try {
                        fs.renameSync(fontPath, targetPath);
                        console.log(`Moved ${fontPath} to ${targetPath}`);
                    } catch (error) {
                        console.error(`Error moving file ${fontPath} to ${targetPath}:`, error);
                    }
                }
            });
        } catch (e) {
            console.log(e);
        }
    }
    
    
}
