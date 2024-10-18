// src/font/FontOptimize.ts

import { FontInit } from './FontInit';
import type { IFontOptimize, IFontData } from './types';

export class FontOptimize extends FontInit implements IFontOptimize {
    constructor(data: IFontData) {
        super(data);
    }
}