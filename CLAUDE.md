# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

`@ibexa/design-system` (IDS) is the React design system for Ibexa DXP. It is a **Yarn v1 workspaces monorepo** (`packages/*`) that ships three independently-versioned packages, developed and previewed through Storybook. The published packages are consumed by Ibexa DXP's admin UI.

## Packages

| Package | Name | Contents | Build tool |
|---------|------|----------|------------|
| `packages/core` | `@ibexa/ids-core` | Framework-agnostic helpers, validators, and TS types (e.g. `createCssClassNames`). No React. | `tsc` |
| `packages/components` | `@ibexa/ids-components` | React components, context providers, HOCs, hooks, partials, shared utils. | `babel` for JS, `tsc` for `.d.ts` |
| `packages/assets` | `@ibexa/ids-assets` | SCSS, fonts, images, icons. Source of truth for CSS. | `sass` |

Dependency direction: `components` depends on `core`; `assets` is standalone. Build order is always **core → components → assets** (`yarn packages:build`).

## Common Commands

Run from repo root:

```bash
yarn storybook              # Start Storybook dev server on :6006 (primary dev environment)
yarn packages:build         # Build all packages in correct order
yarn packages:watch         # Watch-rebuild all packages
yarn packages:test          # Lint + typecheck all packages (components, assets, core)
yarn packages:fix           # Auto-fix prettier + eslint across packages

yarn infra:test             # prettier + eslint + tsc for root-level src/.storybook/stories
yarn infra:fix              # Auto-fix root-level infra
```

Per-package (root scripts delegate to each package): `yarn core:test`, `yarn components:build`, `yarn assets:watch`, etc.

`<pkg>:test` = prettier check + eslint + `tsc --noEmit`. There is no standalone unit-test runner — **behavioral tests are Storybook stories** (see below).

### Running component tests

Tests are Storybook `play` functions run by `@storybook/test-runner`, which drives a **running Storybook instance**:

```bash
yarn storybook              # in one terminal
yarn test-storybook         # in another — runs all *.test.stories.* play functions
yarn test-storybook Button  # filter to a single component/story file
```

The test runner (`.storybook/test-runner-jest.config.js`) only picks up `*.test.stories.@(js|jsx|ts|tsx)` files (note the `.test.` infix) — plain `*.stories.*` files are documentation/preview stories, not tests.

## Path Aliases

Defined in both `tsconfig.json` and `.storybook/main.js` (webpack) — keep the two in sync when adding aliases:

- `@ids-core`, `@ids-core/*` → `packages/core/src`
- `@ids-components/*` → `packages/components/src/components`
- `@ids-context/*`, `@ids-hoc/*`, `@ids-hooks/*`, `@ids-partials/*`, `@ids-shared/*` → matching `packages/components/src/*` dirs
- `@ids-sb-decorators/*`, `@ids-sb-utils/*` → `src/storybook/*` (Storybook-only)
- `@ids-types/*` → `types/*`

## Component Conventions

Each component lives in its own folder under `packages/components/src/components/<Name>/` with this file set:

- `<Name>.tsx` — implementation
- `<Name>.types.ts` — props interface + related enums (enums are used instead of string unions, e.g. `ButtonSize`, `ButtonType`)
- `<Name>.stories.tsx` — preview/docs stories
- `<Name>.test.stories.tsx` — interaction tests with `play` functions
- `index.ts` — re-exports

CSS is not co-located as modules — components emit **BEM-style class names prefixed `ids-`** (e.g. `ids-btn`, `ids-btn--disabled`, `ids-btn__label`) that are styled by SCSS in `packages/assets`. Always build class strings with `createCssClassNames` from `@ids-core` (takes a `{ className: boolean }` map).

## Framework Selector (Twig vs React)

Storybook includes a custom addon (`src/storybook/addons/framework-selector`) that lets stories render either the React component or its Twig counterpart from a running DXP instance. Storybook expects a DXP at `http://localhost:8000`; override with `STORYBOOK_TWIG_COMPONENTS_BASE_URL` in `.storybook/.env.local`. The current framework is read from the `framework` URL param (`src/utils/framework.ts`).

## Icons

Icons are SVGs in `packages/assets/src/img/icons`, compiled into a single `all-icons.svg` sprite + JSON list. Managed via `scripts/icons.js`:

```bash
node scripts/icons.js generate-all-icons    # rebuild sprite + JSON list
node scripts/icons.js test-icons            # check for forbidden attributes (e.g. hardcoded fill)
node scripts/icons.js generate-clean-icons
```

## Developing against Ibexa DXP

To test the dev version live in a DXP checkout, from the DXP root run:

```bash
node <ids-root>/bin/prepare_ds_symlinks.mjs
```

This symlinks DXP's `admin-ui-assets` design-system dirs to this repo and updates `ibexa.tsconfig.json` aliases.

## Releases

```bash
sh bin/prepare_release.sh -v <version> -b <branch>
```

## Notes

- React 19, TypeScript 5.8, ESM (`"type": "module"`).
- ESLint enforces `no-magic-numbers` on `.ts`/`.tsx` (ignoring `-1`, `0`); `sort-keys` is off for story files.
- Prettier config comes from `@ibexa/eslint-config/prettier`.
