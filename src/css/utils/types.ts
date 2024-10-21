

export interface ICssPath {
    projectDir: string;
    data: ICssPathData;
    folderBackspace<N extends number>(levels: Uint<N>, filePath: string): string;
    publicPath(): string;
    fontLoaderPath(): string;
    generalTempPath(): string;
    fontsTempPath(): string;
    optimizedFontsTempPath(): string;
    finalPublicFontPath(): string;
}

export interface ICssPathData {
    projectDir: string;
}