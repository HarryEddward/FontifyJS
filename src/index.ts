// src/index.ts

import type { IFontInitData } from "./font/types";
import { Fontify } from "./Fontify.js";


export const FontifyJS = (data: IFontInitData): Fontify => new Fontify(data);