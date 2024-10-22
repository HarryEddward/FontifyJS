// src/tailwind/Tailwind.ts

import type { ITailwindInit, ITailwindInitData } from './types';
import path from 'path';

export class TailwindInit implements ITailwindInit {
    public typesExtFont: string[] = ['.ttf', '.otf', '.woff'];
    public arrayFilesNames: string[] = [];
    public folderWorkPath: string = '';
    public projectDir: string | undefined;
    private data: InitialData;

    constructor(data: InitialData) {
        this.data = data;
        this.initializeVars();
        //console.log(this.folderWorkPath);
    }

    public initializeVars(): void {
        // Utilizar la estructura de IFontData para asignar solo las variables que existen
        if ('folderWorkPath' in this.data) {
            // Si folderWorkPath está definido, se usa directamente
            this.folderWorkPath = this.folderWorkPath || '';
            this.projectDir = ''; // nameReactProject no se usa, así que se asigna vacío
        } else if ('projectDir' in this.data) {
            // Si folderWorkPath no está definido, se espera que nameReactProject esté presente
            this.projectDir = this.data.projectDir; // Se asigna directamente
            this.folderWorkPath = path.join(process.cwd(), this.projectDir); // Se genera la ruta
        }
    }
}