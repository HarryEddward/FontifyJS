# FontifyJS
**Forget to optimize a large number of fonts** and imported automatically in React/JSProject and use it for Tailwind


<p align="center">
  <img src="./.github/media/img/FY.png" alt="Descripción de la imagen" width="300"/>
</p>

<div align="center">
    <h3>Use Tailwind with Fontify:</h3>
    <p>Check the compatible font (.ttf)</p>
    <p>Extract Font-Zip Files</p>
    <p>Organize with folders</p>
    <p>Optimize all of your fonts in .woff2</p>
</div>

## Usage
`/fontify.js/{your_project}`
```typescript
import { FontifyJS } from "../src";

FontifyJS({ projectDir: 'my-project' });
```

### Steps before execute
- Put all of your zip-font files inside of `/{your_project}/fontLoader`
- Do not put other type of file that is not a .zip file inside of fontLoader
- Put only in the main directory (`/fontLoader`) the zip files, not in subdirectorys
- If you put .otf file the lib can not convert to woff2 (beta)

## Execute
```bash
node fontify.js
```

Recommended (Native Version):
```bash
bun fontify.ts
```
### What will happen?
3 temporary folders will be created for the organization, decompression and optimization of the fonts in the main folder of the project and then the fonts will be saved in **`/public/fonts/fontify`** in different folders for each of the zips to be used.

## Manual Cconfiguration
When you want to use Tailwind, Fontify provides two files. The css file of all configurate fonts of all fonts (.ttf) in the all zips to .woff2, and create a tailwind configure file for configure in `tailwind.config.js` the **fontFamily**. And inside exports an object to use directly to the tailwind file. Examples:

```bash
.
└── my-project
    ...
    ├── fontify.css
    └── fontifyTailwind.js
```

`/{your_project}/fontify.css`
```css
/*
Thanks for using FonitfyJS here can you manage all of the proccesed fonts for your project, enjoy!
*/
@tailwind utilities;

@font-face {
    font-family: 'AGDASIMA_agdasima_regular';
    src: url('./public/fonts/fontify/agdasima/agdasima_regular.woff2') format('woff2');
}, ...
```

`/{your_project}/fontifyTailwind.js`
```javascript
/* 
 * Tailwind's configuration from FontFamily
*/
export const configFontifyFonts = {
  "AGDASIMA_agdasima_regular": [
    "AGDASIMA_agdasima_regular",
    "sans-serif"
  ],
  "AGDASIMA_agdasima_bold": [
    "AGDASIMA_agdasima_bold",
    "sans-serif"
  ], ...
```

`tailwind.config.js`
```javascript
import { configFontifyFonts } from './fontifyTailwind';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: configFontifyFonts /*👈*/
    },
  },
  plugins: [],
}


```

### Example React Project
```bash
.
└── my-project
    ├── README.md
    ├── eslint.config.js
    ├── fontLoader
    │   ├── Agdasima copy.zip
    │   ├── Agdasima.zip
    │   └── Roboto.zip
    ├── fontify.css
    ├── fontifyTailwind.js
    ├── index.html
    ├── package-lock.json
    ├── package.json
    ├── postcss.config.js
    ├── public
    │   └── vite.svg
    ├── src
    │   ├── App.css
    │   ├── App.jsx
    │   ├── assets
    │   │   └── react.svg
    │   ├── index.css
    │   └── main.jsx
    ├── tailwind.config.js
    └── vite.config.js
```
- Si hay archivos fuentes repetidos, internamente no usara los archivos repetidos en diferentes carpetas por evitar errores de compatibilidad entre diferentes entre nombres.
