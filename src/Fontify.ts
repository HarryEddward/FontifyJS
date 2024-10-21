// src/Fontify.ts

import { Font } from './font/index.js';
import { Css } from './css/index.js';
import type { IFontInitData } from './font/types';

import type { IFontify } from './type.js';
import { Tailwind } from './tailwind/index.js';
export class Fontify implements IFontify {


    constructor(data: InitialData) {
        new Font(data);
        new Css(data);
        new Tailwind(data);
    }
}