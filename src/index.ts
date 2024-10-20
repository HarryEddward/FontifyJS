// src/index.ts
export { FontAnalyze } from "./font/index.ts";
export { FontExtract } from "./font/index.ts";
export { FontOptimize } from "./font/index.ts";

import { FontOrganize } from "./font/FontOrganize.ts";
import { FontAnalyze } from "./font/index.ts";
import { FontExtract } from "./font/index.ts";
import { FontOptimize } from "./font/index.ts";
import type { IFontInitData, IFontExtractData } from "./font/types.ts";
import { Fontify } from "./Fontify.ts";


export const FontifyJS = (data: IFontInitData): Fontify => new Fontify(data);