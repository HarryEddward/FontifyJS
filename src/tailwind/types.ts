// src/tailwind/types.ts

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

}

export interface ITailwindConfigData extends PathData {
    
}