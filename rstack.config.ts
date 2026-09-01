// Configuration guide: https://rstack.rs/config
import { define } from 'rstack';

define.lib({
  dts: {
    bundle: false,
  },
  syntax: 'es2021',
  tools: {
    rspack: {
      externals: [/[\\/]compiled[\\/]/],
    },
  },
});

define.fmt({
  ignorePatterns: ['compiled/**'],
  singleQuote: true,
});

define.staged({
  '*.{js,jsx,ts,tsx,mjs,cjs,mts,cts}': ['rs lint', 'rs fmt'],
  '*.{json,md,mdx,css,scss,less,html,yml,yaml}': 'rs fmt',
});

define.lint(({ js, ts }) => [
  {
    ignores: ['compiled/**'],
  },
  js.configs.recommended,
  ts.configs.recommended,
  {
    rules: {
      'no-undef': 'off',
    },
  },
]);
