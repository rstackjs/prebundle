import { defineConfig, js, ts } from '@rslint/core';

export default defineConfig([
  {
    ignores: ['compiled/**'],
  },
  js.configs.recommended,
  ts.configs.recommended,
  {
    files: ['bin.js'],
    languageOptions: {
      globals: {
        console: 'readonly',
        process: 'readonly',
      },
    },
  },
]);
