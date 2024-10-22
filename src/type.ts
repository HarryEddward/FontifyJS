// src/type.ts

import type { IFontData, IFontInitData } from "./font/types";
import { Fontify } from "./Fontify";

export interface IFontify {

    Font(data: InitialData): Promise<void>;
    main(AsyncFunctions: Fontify, data: InitialData): Promise<void>;

}

export interface IFontifyData {

};