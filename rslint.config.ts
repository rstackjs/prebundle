import { defineConfig, js, ts } from '@rslint/core';

export default defineConfig([
  {
    ignores: ['compiled/**'],
  },
  js.configs.recommended,
  ts.configs.recommended,
]);
