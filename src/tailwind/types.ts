// src/tailwind/types.ts

import type { FontifyPath } from "../utils/FontifyPath";

export interface ITailwind {

}

export interface ITailwindData {
    // Nothing
}

export interface ITailwindInit {
    typesExtFont: string[];
    arrayFilesNames: string[];
    folderWorkPath: string;
    projectDir: string | undefined;
    initializeVars(): void;
}

export interface ITailwindInitData {
    // Nothing
}

export interface ITailwindConfig {
    pathResolve: FontifyPath;
    configTailwindObject: { [key: string]: string[] };
    makeConfigTailwindFile(fileName: string): void;
    headerConfigFile(): string;
}

export interface ITailwindConfigData extends PathData {
    
}