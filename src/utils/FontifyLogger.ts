// src/utils/FontifyLogger.ts

import ora, { type Ora } from "ora";
import type { IFontifyLogger } from "./types";

/**
 * @deprecated
 */
export class FontifyLogger implements IFontifyLogger {

    public logger: Ora;

    constructor() {
        this.logger = ora("FontifyJS ✨");
    }

    public text(textToChange: string): void {
        this.logger.text = textToChange;
    }

    public color(colorToChange: Ora["color"]): void {
        this.logger.color = colorToChange;
    }
}