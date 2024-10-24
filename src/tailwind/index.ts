// src/tailwind/index.ts
import { TailwindConfig } from "./TailwindConfig.js";
import { TailwindInit } from "./TailwindInit.js";
import type { ITailwind } from "./types";

export class Tailwind implements ITailwind {

    constructor(data: InitialData) {
        const analyzer = new TailwindInit(data);
        //console.log('pass here')
        new TailwindConfig({ projectDir: analyzer.folderWorkPath });

    }
}