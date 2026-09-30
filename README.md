# Sloppy website

## Deployment

Сайт публикуется автоматически через GitHub Actions workflow [`deploy.yml`](./.github/workflows/deploy.yml).
После пуша в `main` action:

- устанавливает зависимости через `npm ci`
- собирает сайт через `npm run build`
- публикует содержимое `dist/` в GitHub Pages

Чтобы это работало, в настройках репозитория GitHub Pages должен быть выбран источник `GitHub Actions`.

## Local development

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

## Product visuals and downloads

The landing uses the Dashboard's default `minimal` theme: `#050505`, flat dark
surfaces, `#292929` borders, system sans typography, and no CSS gradients.
`public/pets/bots` contains the original Sloppy body PNGs; `Sloppie.tsx` uses the
same color matrix and eye geometry as the Dashboard. Original artwork shading
is retained.

Download links are verified release assets: native macOS v2.1.0 (macOS 26+,
universal), macOS arm64 CLI and Linux x86_64 v1.3.2. Update the explicit tags and
filenames in `src/App.tsx` when new binaries are published. Do not assume the
latest native release also contains CLI packages.

### Safe promotional captures

`public/promo/dashboard.jpg` and `macos.jpg` are actual product captures with
synthetic data from `scripts/promo-fixtures.mjs`. No live Core exports, personal
workspace, tokens, or customer conversations are used.

To refresh the Dashboard image:

1. Run the Sloppy Dashboard on `http://127.0.0.1:5178`.
2. Run `npx playwright install chromium` once.
3. Run `npm run capture:dashboard` in this repository.

The capture script intercepts every API request and blocks other Core/external
origins. A presentation-only rule makes the Dashboard stat meters solid cyan;
it does not change the application source. Review the resulting image before
publishing. `PLAYWRIGHT_CHROMIUM_EXECUTABLE` optionally selects an existing
Chromium binary.

For native macOS captures, run `npm run promo:api`, launch a separate copy of
Sloppy with a separate bundle identifier and these defaults:

```
-client_server_host 127.0.0.1 -client_server_port 5181 -client_server_scheme http
-client_color_scheme dark -client_last_agent_id sloppy -client_last_session_id launch-demo
```

Dismiss the optional import prompt without importing anything, then open
`sloppy://session?agent=sloppy&id=launch-demo` in that copy. Capture **only its
window**, inspect all visible text, and export to `public/promo/macos.jpg`.
Never capture the regular app connected to a personal workspace.

### Browser verification

Run `npm run dev -- --host 127.0.0.1 --port 5190` and, in another terminal,
`npm run test:ui`. This checks four responsive widths, image loading, screenshot
switching, clipboard content, editorial/404 routes, and absence of gradients.
Screenshots are saved to the system temporary directory. `npm run build` and
`npm run lint` remain the production checks.
