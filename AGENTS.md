# Repository Guidelines

## Project Structure & Module Organization

This is a Yarn 1 workspace for the Ibexa Design System. Source packages live under `packages/*`:

- `packages/components/src`: React 19 components, hooks, context, HOCs, and component stories.
- `packages/core/src`: shared TypeScript helpers, validators, and public types.
- `packages/assets/src`: SCSS, fonts, and SVG/image assets.

Storybook utilities live in `src/storybook`, root documentation stories live in `stories`, maintenance scripts live in `bin` and `scripts`, and generated output goes to each package's `dist`. Do not edit `dist` directly.

## Build, Test, and Development Commands

- `yarn storybook`: run Storybook locally on port `6006`.
- `yarn build-storybook`: build the static Storybook site.
- `yarn packages:build`: build `core`, `assets`, and `components` in dependency order.
- `yarn packages:test`: run package validation checks.
- `yarn infra:test`: validate root Storybook/support files with Prettier, ESLint, and TypeScript.
- `yarn packages:fix` or `yarn infra:fix`: apply supported formatting and lint fixes.
- `yarn test-storybook`: run Storybook test-runner checks.

Use package-specific commands such as `yarn components:build`, `yarn core:test`, or `yarn assets:watch` when working in one workspace.

## Coding Style & Naming Conventions

Use TypeScript/TSX for new component and utility code. Follow the existing 4-space indentation, single quotes, named exports, and explicit prop/type files such as `Button.tsx`, `Button.types.ts`, and `index.ts`. Component directories use PascalCase; SCSS classes use `ids-` and BEM-style modifiers such as `ids-btn--small`.

Formatting and linting are controlled by `@ibexa/eslint-config` and the repository Prettier config. For TS/TSX files, avoid unexplained numeric literals; `no-magic-numbers` is enforced except for `-1` and `0`.

## Testing Guidelines

Package `test` scripts currently mean formatting, linting, and TypeScript validation. Interactive and visual behavior is documented through Storybook. Add or update `*.stories.tsx` files for component states, and use `*.test.stories.tsx` where Storybook test-runner coverage is expected. Run the nearest package test plus `yarn infra:test` before opening a PR.

## Commit & Pull Request Guidelines

Recent commits use either conventional prefixes (`fix: Prevent DS tags...`) or tracked issue IDs (`IBX-11635: Use design-system text input component`). Prefer `IBX-12345: concise imperative summary` when an issue exists; otherwise use a conventional prefix such as `fix:` or `feat:`.

Pull requests should include a short description, linked issue, validation commands run, and Storybook screenshots or notes for visible UI changes. Mention translation extraction, asset generation, or symlink/dev-environment steps when relevant.

## Configuration Notes

For DXP-backed Storybook tests, create `.env.local` with `STORYBOOK_TWIG_COMPONENTS_BASE_URL=[url]` when the DXP instance is not `http://localhost:8000`. Do not commit local environment files.
