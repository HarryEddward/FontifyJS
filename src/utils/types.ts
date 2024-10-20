

export interface IFontifyPath {
    data: IFontifyPathData;
    projectDir: string;
    getRelativePath(basePath: string, fullPath: string): string;
    folderBackspace<N extends number>(levels: Uint<N>, filePath: string): string;
    publicPath(): string;
    fontLoaderPath(): string;
    generalTempPath(): string;
    fontsTempPath(): string;
    optimizedFontsTempPath(): string;
    finalPublicFontPath(): string;
};

export interface IFontifyPathData {
    projectDir: string;
};