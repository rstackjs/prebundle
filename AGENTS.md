# Repository Guidelines

## Project Structure & Module Organization

- `src/` hosts all TypeScript sources (`index.ts`, `prebundle.ts`, helpers, shared `types.ts`); export public symbols through `src/index.ts`.
- `dist/` holds `rs lib` output and must stay generated-only, while `compiled/` stores bundled dependencies produced by the CLI; never edit either manually.
- `bin.js` is the CAC-based CLI entry; root configs (`prebundle.config.ts`, `rstack.config.ts`, `tsconfig.json`) govern build targets and should evolve together.
- `tests/` contains `rstack/test` suites plus fixture configs under `tests/fixtures/` used to exercise the CLI.

## Build, Test, and Development Commands

- `pnpm install` respects `pnpm-lock.yaml`; mixing package managers is forbidden to avoid dependency drift.
- `pnpm dev` runs `rs lib -w` for tight feedback while hacking on `src/`.
- `pnpm build` runs `rs lib` to generate production artifacts and doubles as a pre-publish smoke test; run it before every PR or release.
- `pnpm check` runs Rstack lint and formatting checks; `pnpm format` writes formatting changes.
- `pnpm test` runs the Rstack CLI test command and executes the CLI integration suite.
- `pnpm prebundle [pkg1 pkg2 ...] --config path/to/config` executes the CLI for all configured dependencies or a filtered subset; use `--config` to point at custom fixtures.
- `pnpm bump` wraps `npx bumpp` for releases; only call after `dist/` and configs are committed.

## Coding Style & Naming Conventions

- The repo is pure ESM (`type: module`), so keep relative imports with explicit `.js` extensions that mirror emitted files.
- Apply the Rstack formatter defaults (2-space indent, single quotes, trailing commas) with `pnpm format` before committing; configure your editor to format on save.
- Prefer `camelCase` for functions, `PascalCase` for types/interfaces, and SCREAMING_SNAKE_CASE for constants stored in `constant.ts`.
- Keep modules focused; common utilities belong in `helper.ts`, and shared configuration goes through `src/types.ts` for better type inference.

## Testing Guidelines

- Automated coverage uses `rstack/test` in `tests/prebundle.test.ts` to verify bundled output and execute the emitted modules; add new cases there or create additional suites under `tests/`.
- Prefer end-to-end checks that run `bin.js --config <fixture>` so the CLI path stays covered across platforms.
- When adding manual validation steps (e.g., testing new dependencies), document the exact `pnpm prebundle ...` invocation and observed artifacts in the PR description.

## Commit & Pull Request Guidelines

- Follow Conventional Commits mirroring existing history (`feat:`, `fix(deps):`, `chore:`); add scopes like `feat(cli):` when touching a specific module.
- Each PR should describe the motivation, list the commands you ran (`pnpm build`, `pnpm prebundle commander`, etc.), and reference related issues.
- Separate mechanical refactors from behavior changes to keep diffs reviewable, and ensure CI or manual checks are linked before requesting review.
