// src/font/FontInit.ts

import type { IFontInit, IFontData } from './types';
import {join} from 'path';

export class FontInit implements IFontInit {
    public typesExtFont: string[] = ['.ttf', '.otf'];
    public arrayFilesNames: string[] = [];
    public folderWorkPath: string = '';
    public nameReactProject: string | undefined;
    private data: IFontData;

    constructor(data: IFontData) {
        this.data = data;
        this.initializeVars();
        //console.log(this.folderWorkPath);
    }

    public initializeVars(): void {
        // Utilizar la estructura de IFontData para asignar solo las variables que existen
        if ('folderWorkPath' in this.data) {
            // Si folderWorkPath está definido, se usa directamente
            this.folderWorkPath = '';
            this.nameReactProject = ''; // nameReactProject no se usa, así que se asigna vacío
        } else if ('nameReactProject' in this.data) {
            // Si folderWorkPath no está definido, se espera que nameReactProject esté presente
            this.nameReactProject = this.data.nameReactProject; // Se asigna directamente
            this.folderWorkPath = join(process.cwd(), this.nameReactProject, 'fontLoader'); // Se genera la ruta
        }
    }
}