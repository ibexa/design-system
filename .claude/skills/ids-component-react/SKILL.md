---
name: ids-component-react
description: Implement an Ibexa Design System React component in design-system-60 from an approved spec — 5-file component set, SCSS partial in packages/assets, Storybook stories and play tests. Use when implementing/changing React DS components, or as phase 2 of ids-new-component.
---

# React DS component implementation

Input: an approved spec at `docs/components/<name>.spec.md` (from `ids-component-spec`).
If none exists, write one first — do not implement straight from an image.

Read the repo `CLAUDE.md` first; it is authoritative for conventions. Before writing code,
read one simple exemplar (`packages/components/src/components/Badge/`) and one matching the
target's complexity (`Expander/` for stateful, `Dropdown/` for multi-part with sub-folders).

## Files (full checklist: [references/checklist.md](references/checklist.md))

1. `packages/components/src/components/<Name>/` — `<Name>.tsx`, `<Name>.types.ts`,
   `<Name>.stories.tsx`, `<Name>.test.stories.tsx` (only if interactive), `index.ts`.
2. Barrel export: add to `packages/components/src/components/index.ts`.
3. SCSS: `packages/assets/src/scss/_<name>.scss` (`inputs/` subdir for form inputs) +
   `@use '<name>';` in `packages/assets/src/scss/styles.scss`. No CSS anywhere else.
4. New icons (spec §9): SVGs into `packages/assets/src/img/icons`, then
   `node scripts/icons.js generate-all-icons && node scripts/icons.js test-icons`.

## Non-negotiables

- Class names: `ids-*` BEM exactly as spec §2, built with `createCssClassNames` from
  `@ids-core` — never string concatenation.
- Enums (in `<Name>.types.ts`), not string unions; props interface extends
  `BaseComponentAttributes` from `@ids-types/general` where applicable.
- SCSS: `@use 'variables' as *; @use 'functions' as *;` — tokens + `calculateRem(<px>)`
  only, no raw hex, no raw px.
- No translation calls inside DS components — translated strings arrive via props.
- Stories: CSF3, one per spec §4 matrix cell marked ●; tests are `play` functions in
  `*.test.stories.tsx` (the `.test.` infix is what the test-runner picks up).

## Checks (run from repo root)

```bash
yarn components:test        # prettier + eslint + tsc
yarn prettier --check packages/assets/src/scss/_<name>.scss
yarn components:build && yarn assets:build
yarn test-storybook <Name>  # needs `yarn storybook` running
```

Then hand over to `ids-component-verify` for the visual loop.
