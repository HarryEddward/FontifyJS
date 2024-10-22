// src/Fontify.ts
import { Font } from './font/index.js';
import { Css } from './css/index.js';
import type { IFontify } from './type.js';
import { Tailwind } from './tailwind/index.js';
import { initialLoggerText } from './constants.js';
import ora from 'ora';

export class Fontify implements IFontify {

    private data: InitialData;

    private constructor(data: InitialData) {
        this.data = data;
    }

    public async Font(data: InitialData): Promise<void> {
        await Font.create(data);
    }

    public static async create(data: InitialData): Promise<Fontify> {
        
        const instance = new Fontify(data);
        instance.main(
            instance,
            instance.data
        );

        return instance;
    }

    public async main(AsyncFunctions: Fontify, data: InitialData): Promise<void> {
        
        console.log('\n', initialLoggerText, '\n');

        await AsyncFunctions.Font(data);    
        new Css(data);
        new Tailwind(data);
        
        console.log('\n');
    }
}
