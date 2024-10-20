// src/css/index.ts
import type { ICss } from "./types";
import fs from 'fs';
import path from 'path';
import { CssInit } from "./CssInit";
import { CssFile } from "./CssFile";

export class Css implements ICss {


    constructor(data: InitialData) {
        const analyze = new CssInit(data);
        new CssFile({ projectDir: analyze.folderWorkPath });
    };
    
};