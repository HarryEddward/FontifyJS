// src/index.ts

import type { IFontInitData } from "./font/types";
import { Fontify } from "./Fontify.js";

export const FontifyJS = async (data: IFontInitData): Promise<Fontify> => {
    return await Fontify.create(data);
};