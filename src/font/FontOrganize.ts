import type { IFontOrganize, IFontOrganizeData } from './types.ts'

export class FontOrganize implements IFontOrganize {


    constructor(data: IFontOrganizeData) {
    
    }

    public organizeFontFiles(pathFontFiles: string[]): void {
        const temporalDir: string = ".temp.fontify.fonts";
    }
}