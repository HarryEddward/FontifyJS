
import { ignoreFileExtensions } from "../contants.js";
import { FontFinder } from "../font/utils/FontFinder.js";
import { FontifyPath } from "../utils/FontifyPath.js";
import type { ITailwindConfig, ITailwindConfigData } from "./types";
import fs from 'fs';
import path from 'path';


export class TailwindConfig implements ITailwindConfig {

    public pathResolve: FontifyPath;
    public configTailwindObject: { [key: string]: string[] } = {};

    constructor(data: ITailwindConfigData) {
        this.pathResolve = new FontifyPath({ projectDir: data.projectDir });
        this.makeConfigTailwindFile();
    }

    public makeConfigTailwindFile(fileName: string = "fontifyTailwind.js"): void {
        console.log('make config file tailwind...');

        const finalPathConfig = path.join(this.pathResolve.projectDir, fileName);

        const finalPublicFontPath = this.pathResolve.finalPublicFontPath()
        const foundAllPathFonts: string[] = FontFinder.getAllFilesInFolder(finalPublicFontPath);
        

        foundAllPathFonts.forEach((fontPath: string) => {
            const nameFile: string = path.basename(fontPath, path.extname(fontPath));
            const nameDir: string = path.basename(path.dirname(fontPath).toUpperCase());
            this.configTailwindObject[`${nameDir}_${nameFile}`] = [`${nameDir}_${nameFile}`, 'sans-serif'];
        });

        const stringifyConfigTailwindObject = JSON.stringify(this.configTailwindObject, null, 2)

        const contentTailwind = `
export const configFontifyFonts = ${stringifyConfigTailwindObject};
`

        fs.writeFileSync(finalPathConfig, this.headerConfigFile() + contentTailwind);
        
    }

    public headerConfigFile(): string {
        return `
/* 
 * Tailwind's configuration from FontFamily
*/
`.trim();
    }
}