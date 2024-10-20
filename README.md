# FontifyJS
**Forget to optimize a large number of fonts** and imported automatically in React/JSProject and use it for Tailwind


<p align="center">
  <img src="./.github/media/img/FY.png" alt="Descripción de la imagen" width="300"/>
</p>

## Usage
`/index.js/{your_project}`
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
node index.js

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