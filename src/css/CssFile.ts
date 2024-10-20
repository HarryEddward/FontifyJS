import { FontifyPath } from "../utils/FontifyPath";
import type { ICssPathData } from "./utils/types";
import type { ICssFile } from "./types";
import fs from 'fs';
import path, { extname } from 'path';
import { FontFinder } from "../font/utils/FontFinder";
import { ignoreFileExtensions } from "../contants";

export class CssFile implements ICssFile {
    public pathResolve: FontifyPath;

    constructor(data: ICssPathData) {
        this.pathResolve = new FontifyPath({ projectDir: data.projectDir });
        this.makeCssFile();
    }


    public makeCssFile(fileName: string = "fontify.css"): void {
        //console.log(this.pathResolve.projectDir);
        const finalPathCss = path.join(this.pathResolve.projectDir, fileName);
        //console.log(finalPathCss);

        const finalPublicFontPath = this.pathResolve.finalPublicFontPath()
        const foundAllPathFonts: string[] = FontFinder.getAllFilesInFolder(finalPublicFontPath);
        let obtainRelativeAllPathsFonts: string[] = [];

        let verifyNamesPathFonts: string[] = [];

        foundAllPathFonts.forEach((fontPath: string) => {
            const nameFile: string = path.basename(fontPath);
            const nameFileWithoutExt: string = path.basename(fontPath, path.extname(fontPath));

            if (ignoreFileExtensions.includes(nameFile)) {
                return
            }

            obtainRelativeAllPathsFonts.push(
                this.pathResolve.getRelativePath(finalPublicFontPath, fontPath)
            );
        });
        
        console.log(obtainRelativeAllPathsFonts);
        const fontFormat = "woff2"; // Puedes cambiar el formato si es necesario

        try {
            const contentCss = obtainRelativeAllPathsFonts.map(fontPath => {
                // Obtener el nombre del archivo sin la extensión
                const fileNameWithoutExt = path.basename(fontPath, path.extname(fontPath));
                const nameDirFile = path.basename(path.dirname(fontPath).toUpperCase());
                return `
@font-face {
    font-family: '${nameDirFile}_${fileNameWithoutExt}';
    src: url('./public/fonts/fontify${this.pathResolve.getRelativePath(this.pathResolve.projectDir, fontPath)}') format('${fontFormat}');
}
`;
            }).join('\n');

            fs.writeFileSync(finalPathCss, this.headerCssFile() + contentCss.trim()); // Escribe el contenido en el archivo
        } catch (e) {
            console.error(e);
        }
    }

    public headerCssFile(): string {
        return `
/*
Thanks for using FonitfyJS here can you manage all of the proccesed fonts for your project, enjoy!
*/

`
    }
}
