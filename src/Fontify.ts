// src/Fontify.ts

import { Font } from './font/index.ts';
import { Css } from './css/index.ts';
import type { IFontInitData } from './font/types.ts';

import type { IFontify } from './type.ts';
import { Tailwind } from './tailwind/index.ts';
export class Fontify implements IFontify {


    constructor(data: InitialData) {
        new Font(data);
        new Css(data);
        new Tailwind(data);
    }
}