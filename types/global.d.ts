// /types/globals.d.ts

declare global {
    export type InitialData = 
    | { projectDir: string; folderWorkPath?: undefined; }
    | { projectDir?: undefined; folderWorkPath: string; }
    var initialData: InitialData;

    
    export type Uint<T extends number> =
    number extends T 
        ? never 
        : `${T}` extends `-${string}` | `${string}.${string}`
            ? never 
            : T;
    
    export interface PathData {projectDir: string;}
}

export {};